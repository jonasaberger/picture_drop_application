import { Routes } from '@angular/router';
import { CouponsComponent} from './coupons/coupons.component';
import { WorkspacesComponent} from './workspaces/workspaces.component';

export const routes: Routes = [
 { path: 'workspaces', component: WorkspacesComponent },
  { path: 'coupons', component: CouponsComponent },
 // { path: 'statistics', component: StatisticsComponent },
  { path: '', redirectTo: 'workspaces', pathMatch: 'full' }, // Default-Route
];
