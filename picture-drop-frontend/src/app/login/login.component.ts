import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubmissionsControllerService } from '../../../libs/src/app/api/services/submissions-controller.service';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    JsonPipe,
    NgIf,
    NgForOf,
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  submissions: any[] = []; // Array to store the fetched submissions

  constructor(private submissionsService: SubmissionsControllerService) {}

  onLogin() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Call the getAll method to fetch submissions
    this.getAll();
  }

  getAll() {
    this.submissionsService.submissionsControllerFindAll().subscribe(
      (data: any[]) => {
        this.submissions = data; // Store the fetched data in the submissions array
        console.log('Submissions:', this.submissions);
      },
      (error) => {
        console.error('Error fetching submissions:', error);
      }
    );
  }
}
