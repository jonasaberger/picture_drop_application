import { Routes } from '@angular/router';
import { CouponsComponent} from './coupons/coupons.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {LoginComponent} from './login/login.component';
import {WorkspacesComponent} from './workspaces/workspaces.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'coupons', component: CouponsComponent},
  { path: 'statistics', component: StatisticsComponent},
  { path: 'workspaces', component: WorkspacesComponent },
  { path: 'coupons', component: CouponsComponent },
  { path: '', redirectTo: 'workspaces', pathMatch: 'full' },

]
