import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {NgForOf, NgClass} from '@angular/common';
import { WorkspacesControllerService } from '../../../libs/src/app/api/services/workspaces-controller.service';
import { VouchersControllerService } from '../../../libs/src/app/api/services/vouchers-controller.service';
import {Submission} from '../../../libs/src/app/api/models/submission';
import {SubmissionItem} from '../../../libs/src/app/api/models/submission-item';
import {Workspace} from '../../../libs/src/app/api/models/workspace';
import {Vouchers} from '../../../libs/src/app/api/models/vouchers';
import {aggregateStats} from '../../../libs/src/app/api/services/aggregation.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-coupons',
  imports: [
    FormsModule,
    NgForOf,
  ],
  templateUrl: 'coupons.component.html',
  styleUrl: './coupons.component.css',
})
export class CouponsComponent implements OnInit {
  selectedCompany: string = 'All';
  companies: string[] = [];
  isLoading: boolean = true;
  workspaces: Workspace[] = [];
  filteredWorkspaces: Array<Workspace & { redeemedVouchers: Vouchers[] } & { unredeemedVouchers: Vouchers[ ]}> = [];
  vouchers: Vouchers[] = [];
  redeemedVouchers: Vouchers[] = [];
  unredeemedVouchers: Vouchers[] = [];
  enrichedWorkspaces: Array<Workspace & { redeemedVouchers: Vouchers[] } & { unredeemedVouchers: Vouchers[ ]}> = []; // New array for enriched workspaces

  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private vouchersService: VouchersControllerService
  ) {}

  ngOnInit(): void {
    this.loadData(); // Initial data loading
  }

  async loadData(): Promise<void> {
    try {
      this.isLoading = true;

      // Fetch workspaces, submissions, submission items, and vouchers
      const [workspaces, submissions, submissionItems, vouchers] = await Promise.all([
        this.http.get<Workspace[]>("http://localhost:3000/api/workspaces").toPromise(),
        this.http.get<Submission[]>("http://localhost:3000/api/submissions").toPromise(),
        this.http.get<SubmissionItem[]>("http://localhost:3000/api/submission-items").toPromise(),
        this.vouchersService.vouchersControllerFindAll().toPromise(),
      ]);

      if (!workspaces || !submissions || !submissionItems || !vouchers) {
        throw new Error("Some data could not be loaded.");
      }

      this.workspaces = workspaces;
      this.vouchers = vouchers;
      this.redeemedVouchers = this.vouchers.filter(voucher => voucher.ValidatedOn != null)
      this.unredeemedVouchers = this.vouchers.filter(voucher => voucher.ValidatedOn == null)
      this.companies = ["All", ...new Set(workspaces.map(ws => ws.CompanyName))];

      // Aggregate stats and associate vouchers with workspaces
      aggregateStats(workspaces, submissions, submissionItems);
      this.enrichWorkspacesWithVouchers();

      // Filter workspaces
      this.filterWorkspaces();

      this.isLoading = false;
      this.cdRef.detectChanges();
    } catch (err) {
      console.error("Error loading data:", err);
      this.isLoading = false;
    }
  }

  enrichWorkspacesWithVouchers(): void {
    this.enrichedWorkspaces = this.workspaces.map(workspace => {
      const redeemedVouchers= this.redeemedVouchers.filter(voucher => voucher.WorkspaceId === workspace.Id)
      const unredeemedVouchers = this.unredeemedVouchers.filter(voucher => voucher.WorkspaceId === workspace.Id);
      return {
        ...workspace,
        redeemedVouchers: redeemedVouchers,
        unredeemedVouchers: unredeemedVouchers,
      };
    });
  }

  filterWorkspaces(): void {
    if (this.selectedCompany === "All") {
      this.filteredWorkspaces = [...this.enrichedWorkspaces];
    } else {
      this.filteredWorkspaces = [...this.enrichedWorkspaces.filter(ws => ws.CompanyName === this.selectedCompany)];
    }
  }

  onCompanyChange(): void {
    this.filterWorkspaces();
  }
}
