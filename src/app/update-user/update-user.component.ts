// update-user.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  userId!: number;
  user: any = {}; // Initialize with an empty user object

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      // Fetch the user details using the ID
      this.userService.getUserById(this.userId).subscribe(
        (userData) => {
          this.user = userData;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    });
  }

  // Update user details
  updateUser() {
    this.userService.updateUser(this.userId, this.user).subscribe(
      (updatedUser) => {
        console.log('User updated successfully:', updatedUser);
        // Redirect to the user list or another appropriate route
        this.router.navigate(['/user-list']);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
