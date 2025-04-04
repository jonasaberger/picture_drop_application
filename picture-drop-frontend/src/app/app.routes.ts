import { Routes } from '@angular/router';
import { CouponsComponent} from './coupons/coupons.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  { path: 'coupons', component: CouponsComponent },
  { path: 'login', component: LoginComponent },
];
