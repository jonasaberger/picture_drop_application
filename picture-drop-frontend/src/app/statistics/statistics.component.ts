import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Submission } from '../../../libs/src/app/api/models/submission';
import { SubmissionItem } from '../../../libs/src/app/api/models/submission-item';
import { aggregateStats } from '../../../libs/src/app/api/services/aggregation.service';
import { Workspace } from '../../../libs/src/app/api/models/workspace';
import { ChartService } from '../../../libs/src/app/api/services/chart.service';
import { FilterOptions } from '../../../libs/src/app/api/models/filter-options';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart!: Chart;

  allSubmissions: Submission[] = [];
  allSubmissionItems: SubmissionItem[] = [];
  workspaces: Workspace[] = [];

  filteredSubmissionItems: SubmissionItem[] = [];

  availableCompanies: string[] = [];
  availableWorkspaces: Workspace[] = [];
  availableYears: string[] = [];
  availableUploadTypes: string[] = ['Images', 'Videos'];

  selectedCompany = '';
  selectedWorkspace = '';
  selectedUploadType = '';
  selectedYear = '';

  isLoading = true;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      this.isLoading = true;

      const [workspaces, submissions, submissionItems] = await Promise.all([
        this.http.get<Workspace[]>('http://localhost:3000/api/workspaces').toPromise(),
        this.http.get<Submission[]>('http://localhost:3000/api/submissions').toPromise(),
        this.http.get<SubmissionItem[]>('http://localhost:3000/api/submission-items').toPromise()
      ]);

      if (!workspaces || !submissions || !submissionItems) {
        throw new Error('Some data could not be loaded.');
      }

      this.workspaces = workspaces;
      this.allSubmissions = submissions;
      this.allSubmissionItems = submissionItems;

      this.availableCompanies = [...new Set(this.workspaces.map(ws => ws.CompanyName))];
      this.availableWorkspaces = this.workspaces;
      this.availableYears = [...new Set(
        this.allSubmissionItems.map(item => new Date(item.CreatedOn).getFullYear().toString())
      )].sort((a, b) => b.localeCompare(a));

      aggregateStats(workspaces, submissions, submissionItems);

      // Initialize with all submission items on first load
      this.filteredSubmissionItems = [...this.allSubmissionItems];

      // Create chart immediately after data is loaded
      this.createChart();
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }
  }

  onCompanyChange(): void {
    this.selectedWorkspace = '';
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredSubmissionItems = this.allSubmissionItems.filter(item => {
      const submission = this.getSubmission(item.SubmissionId);
      const workspace = submission && this.getWorkspace(submission.WorkspaceId);

      if (!submission || !workspace) return false;

      const matchesCompany = !this.selectedCompany || workspace.CompanyName === this.selectedCompany;
      const matchesWorkspace = !this.selectedWorkspace || workspace.Name === this.selectedWorkspace;
      const matchesType = !this.selectedUploadType ||
        (this.selectedUploadType === 'Images' && item.ContentType.startsWith('image/')) ||
        (this.selectedUploadType === 'Videos' && item.ContentType.startsWith('video/'));
      const matchesYear = !this.selectedYear || new Date(item.CreatedOn).getFullYear().toString() === this.selectedYear;

      return matchesCompany && matchesWorkspace && matchesType && matchesYear;
    });

    this.createChart();
    this.cdRef.detectChanges();
  }

  private createChart(): void {
    if (!this.chartCanvas?.nativeElement) return;

    // Destroy previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    // Only create chart if we have data
    if (this.filteredSubmissionItems.length > 0) {
      this.chart = ChartService.createChart(
        this.chartCanvas.nativeElement,
        this.filteredSubmissionItems,
        this.availableWorkspaces,
        this.allSubmissions,
        this.selectedWorkspace,
        this.availableWorkspaces
      );
    }
  }

  shouldDisableOption(type: keyof FilterOptions, value: string): boolean {
    const filters: FilterOptions = {
      company: type === 'company' ? value : this.selectedCompany,
      workspace: type === 'workspace' ? value : this.selectedWorkspace,
      uploadType: type === 'uploadType' ? value : this.selectedUploadType,
      year: type === 'year' ? value : this.selectedYear
    };

    return this.countMatchingItems(filters) === 0;
  }

  private countMatchingItems(filters: FilterOptions): number {
    return this.allSubmissionItems.filter(item => {
      const submission = this.getSubmission(item.SubmissionId);
      const workspace = submission && this.getWorkspace(submission.WorkspaceId);

      if (!submission || !workspace) return false;

      const matchesCompany = !filters.company || workspace.CompanyName === filters.company;
      const matchesWorkspace = !filters.workspace || workspace.Name === filters.workspace;
      const matchesType = !filters.uploadType ||
        (filters.uploadType === 'Images' && item.ContentType.startsWith('image/')) ||
        (filters.uploadType === 'Videos' && item.ContentType.startsWith('video/'));
      const matchesYear = !filters.year || new Date(item.CreatedOn).getFullYear().toString() === filters.year;

      return matchesCompany && matchesWorkspace && matchesType && matchesYear;
    }).length;
  }

  private getSubmission(id: number): Submission | undefined {
    return this.allSubmissions.find(sub => sub.Id === id);
  }

  private getWorkspace(id: number): Workspace | undefined {
    return this.workspaces.find(ws => ws.Id === id);
  }
}
