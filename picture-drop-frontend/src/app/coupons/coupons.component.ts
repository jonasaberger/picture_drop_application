import { Component } from "@angular/core";
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import { WorkspacesControllerService } from '../../../libs/src/app/api/services/workspaces-controller.service';

interface Workspace {
  name: string;
  redeemedCoupons: number;
  unredeemedCoupons: number;
}

@Component({
  selector: 'app-coupons',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: 'coupons.component.html',
  styleUrl: './coupons.component.css',
})
export class CouponsComponent {
  selectedCompany: string = '';
  companies: string[] = ['Company A', 'Company B', 'Company C', 'Company D'];

  workspaces: Workspace[] = [
    { name: 'Workspace 1', redeemedCoupons: 3, unredeemedCoupons: 3 },
    { name: 'Workspace 2', redeemedCoupons: 3, unredeemedCoupons: 3 },
    { name: 'Workspace 3', redeemedCoupons: 3, unredeemedCoupons: 3 },
    { name: 'Workspace 4', redeemedCoupons: 3, unredeemedCoupons: 3 },
    { name: 'Workspace 5', redeemedCoupons: 3, unredeemedCoupons: 3 },
    { name: 'Workspace 6', redeemedCoupons: 3, unredeemedCoupons: 3 },
    { name: 'Workspace 7', redeemedCoupons: 3, unredeemedCoupons: 3 },
    { name: 'Workspace 8', redeemedCoupons: 3, unredeemedCoupons: 3 }
  ];

  constructor(private workspacesService: WorkspacesControllerService) {}

  get totalCoupons(): number {
    return this.workspaces.reduce((total, ws) => total + ws.redeemedCoupons + ws.unredeemedCoupons, 0);
  }

  get totalRedeemed(): number {
    return this.workspaces.reduce((total, ws) => total + ws.redeemedCoupons, 0);
  }

  get totalUnredeemed(): number {
    return this.workspaces.reduce((total, ws) => total + ws.unredeemedCoupons, 0);
  }

  getAllWorkspaces() {
    this.workspacesService.workspacesControllerFindAll().subscribe(
      (data: any[]) => {
        this.workspaces = data; // Store the fetched data in the submissions array
        console.log('Submissions:', this.workspaces);
      },
      (error) => {
        console.error('Error fetching submissions:', error);
      }
    );
  }

  handleGetWorkspaces(){
    this.getAllWorkspaces();
  }
}
