import { Routes } from '@angular/router';
import { CouponsComponent} from './coupons/coupons.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {WorkspacesComponent} from './workspaces/workspaces.component';
import {canActivate} from './guard/customGuard';

export const routes: Routes = [
  { path: 'coupons', component: CouponsComponent, canActivate: [canActivate]},
  { path: 'statistics', component: StatisticsComponent, canActivate: [canActivate]},
  { path: 'workspaces', component: WorkspacesComponent, canActivate: [canActivate]},
  { path: 'coupons', component: CouponsComponent, canActivate: [canActivate] },
  { path: '', redirectTo: 'workspaces', pathMatch: 'full' },
]
