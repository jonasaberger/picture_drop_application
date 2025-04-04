import { Routes } from '@angular/router';
import { CouponsComponent} from './coupons/coupons.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'coupons', component: CouponsComponent},
  { path: 'statistics', component: StatisticsComponent},
];
