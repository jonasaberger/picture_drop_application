import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CouponsComponent} from './coupons/coupons.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'picture-drop-frontend';
}
