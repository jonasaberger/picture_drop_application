import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgClass } from "@angular/common";
import { ChangeDetectorRef } from "@angular/core";

// Interfaces
interface Workspace {
  Id: number;
  Name: string;
  CompanyName: string;
  SubscriptionStatus: string;
  isActive?: boolean;
  pictures?: number;
  videos?: number;
}

interface Submission {
  Id: number;
  WorkspaceId: number;
}

interface SubmissionItem {
  Id: number;
  SubmissionId: number;
  ContentType: string;
  CreatedOn: Date;
}

@Component({
  selector: "app-workspaces",
  standalone: true,
  imports: [FormsModule, NgForOf, NgClass],
  templateUrl: "./workspaces.component.html",
  styleUrl: "./workspaces.component.css",
})
export class WorkspacesComponent implements OnInit {
  selectedCompany: string = "SPS";
  companies: string[] = [];
  workspaces: Workspace[] = [];
  filteredWorkspaces: Workspace[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData(); // Initiales Laden der Daten
  }

  async loadData(): Promise<void> {
    try {
      this.isLoading = true;

      // 🔄 1. Alle Daten gleichzeitig laden
      const [workspaces, submissions, submissionItems] = await Promise.all([
        this.http.get<Workspace[]>("http://localhost:3000/workspaces").toPromise(),
        this.http.get<Submission[]>("http://localhost:3000/submissions").toPromise(),
        this.http.get<SubmissionItem[]>("http://localhost:3000/submission-items").toPromise(),
      ]);

      // Überprüfen, ob die Daten erfolgreich geladen wurden
      if (!workspaces || !submissions || !submissionItems) {
        throw new Error("Einige Daten konnten nicht geladen werden.");
      }

      this.workspaces = workspaces;
      this.companies = ["all", ...new Set(workspaces.map(ws => ws.CompanyName))];

      // 🔄 2. Aggregation im Frontend
      this.aggregateStats(submissions, submissionItems);

      // 🔄 3. Workspaces filtern
      this.filterWorkspaces();

      this.isLoading = false;
      this.cdRef.detectChanges();
    } catch (err) {
      console.error("Fehler beim Laden der Daten:", err);
      this.isLoading = false;
    }
  }

  aggregateStats(submissions: Submission[], submissionItems: SubmissionItem[]): void {
    // 2a. SubmissionId → WorkspaceId
    const submissionToWorkspace = new Map<number, number>();
    submissions.forEach(s => submissionToWorkspace.set(s.Id, s.WorkspaceId));

    // 2b. WorkspaceId → Statistik
    const workspaceStats = new Map<number, { pictures: number; videos: number }>();

    submissionItems.forEach(item => {
      const workspaceId = submissionToWorkspace.get(item.SubmissionId);
      if (!workspaceId) return;

      if (!workspaceStats.has(workspaceId)) {
        workspaceStats.set(workspaceId, { pictures: 0, videos: 0 });
      }

      const stats = workspaceStats.get(workspaceId)!;
      if (item.ContentType.startsWith("image/")) {
        stats.pictures++;
      } else if (item.ContentType.startsWith("video/")) {
        stats.videos++;
      }
    });

    // 2c. Workspace-Objekte anreichern
    this.workspaces.forEach(ws => {
      const stats = workspaceStats.get(ws.Id) ?? { pictures: 0, videos: 0 };
      ws.isActive = ws.SubscriptionStatus === "Active";
      ws.pictures = stats.pictures;
      ws.videos = stats.videos;
    });
  }

  // 3. Filter nach Firma
  filterWorkspaces(): void {

    if (this.selectedCompany === "all") {
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
