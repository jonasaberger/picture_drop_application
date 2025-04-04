import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CouponsComponent} from './coupons/coupons.component';
import {MenuComponent} from './menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'picture-drop-frontend';
}
