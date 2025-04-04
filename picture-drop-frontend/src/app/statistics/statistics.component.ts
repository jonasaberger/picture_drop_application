import { Component } from "@angular/core";
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

interface Workspace {
  name: string;
  redeemedCoupons: number;
  unredeemedCoupons: number;
}

@Component({
  selector: 'app-coupons',
  imports: [
    FormsModule,
    NgForOf,
  ],
  templateUrl: 'statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
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




}
