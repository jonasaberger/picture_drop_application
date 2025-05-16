import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgClass } from "@angular/common";
import { ChangeDetectorRef } from "@angular/core";

import {Workspace} from '../../../libs/src/app/api/models/workspace';
import {Submission} from '../../../libs/src/app/api/models/submission';
import {SubmissionItem} from '../../../libs/src/app/api/models/submission-item';

import {aggregateStats} from '../../../libs/src/app/api/services/aggregation.service';

@Component({
  selector: "app-workspaces",
  standalone: true,
  imports: [FormsModule, NgForOf, NgClass],
  templateUrl: "./workspaces.component.html",
  styleUrl: "./workspaces.component.css",
})
export class WorkspacesComponent implements OnInit {
  selectedCompany: string = "All";
  companies: string[] = [];
  workspaces: Workspace[] = [];
  filteredWorkspaces: Workspace[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('test')
    this.loadData(); // Initiales Laden der Daten
  }

  async loadData(): Promise<void> {
    try {
      this.isLoading = true;

      // Initiales Laden aller Daten
      const [workspaces, submissions, submissionItems] = await Promise.all([
        this.http.get<Workspace[]>("http://localhost:3000/api/workspaces").toPromise(),
        this.http.get<Submission[]>("http://localhost:3000/api/submissions").toPromise(),
        this.http.get<SubmissionItem[]>("http://localhost:3000/api/submission-items").toPromise(),
      ]);

      // Überprüfen ob die Daten erfolgreich geladen wurden
      if (!workspaces || !submissions || !submissionItems) {
        throw new Error("Einige Daten konnten nicht geladen werden.");
      }

      this.workspaces = workspaces;
      this.companies = ["All", ...new Set(workspaces.map(ws => ws.CompanyName))];

      // Aggregation-Funktion aus dem Frontend
      aggregateStats(workspaces,submissions,submissionItems);

      // Filtern der Workspaces
      this.filterWorkspaces();

      this.isLoading = false;
      this.cdRef.detectChanges();
    } catch (err) {
      console.error("Fehler beim Laden der Daten:", err);
      this.isLoading = false;
    }
  }

  // Filter nach Firma
  filterWorkspaces(): void {
    if (this.selectedCompany === "All") {
      this.filteredWorkspaces = [...this.workspaces];
    } else {
      console.log("apply filter")
      this.filteredWorkspaces = this.workspaces.filter(ws => ws.CompanyName === this.selectedCompany);
    }
  }

  //4. Gesamtsummen berechnen
  get totalActive(): number {
    return this.filteredWorkspaces.filter(ws => ws.isActive).length;
  }

  get totalInactive(): number {
    return this.filteredWorkspaces.filter(ws => !ws.isActive).length;
  }

  get totalPictures(): number {
    return this.filteredWorkspaces.reduce((sum, ws) => sum + (ws.pictures || 0), 0);
  }

  get totalVideos(): number {
    return this.filteredWorkspaces.reduce((sum, ws) => sum + (ws.videos || 0), 0);
  }

  //5. Wenn eine Firma ausgewählt wird, werden die Daten neu geladen
  onCompanyChange(): void {
    this.filterWorkspaces(); // Workspaces filtern, wenn die Firma geändert wird
  }
}
