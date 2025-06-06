import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router) {
  }

  logout() {
    // Hier deine Logout-Logik z.B. Session löschen
    console.log('Ausgeloggt!');
    this.router.navigate(['/']); // Optional: Zurück zur Startseite
  }
}
