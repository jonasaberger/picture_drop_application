import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgClass } from "@angular/common"; // NgClass importieren

interface Workspace {
  name: string;
  isActive: boolean;
  videos: number;
  pictures: number;
}

@Component({
  selector: "app-workspaces",
  standalone: true,
  imports: [FormsModule, NgForOf, NgClass],
  templateUrl: "./workspaces.component.html",
  styleUrl: "./workspaces.component.css",
})
export class WorkspacesComponent {
  selectedCompany: string = "";
  companies: string[] = ["Company A", "Company B", "Company C", "Company D"];

  workspaces: Workspace[] = [
    { name: "Workspace 1", isActive: true, videos: 10, pictures: 15 },
    { name: "Workspace 2", isActive: false, videos: 8, pictures: 12 },
    { name: "Workspace 3", isActive: true, videos: 5, pictures: 7 },
    { name: "Workspace 4", isActive: true, videos: 12, pictures: 20 },
    { name: "Workspace 5", isActive: false, videos: 3, pictures: 5 },
    { name: "Workspace 6", isActive: false, videos: 3, pictures: 5 },
  ];

  get totalActive(): number {
    return this.workspaces.filter((ws) => ws.isActive).length;
  }

  get totalInactive(): number {
    return this.workspaces.filter((ws) => !ws.isActive).length;
  }
}
