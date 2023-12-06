// user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    // Fetch the list of users from the service
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching user list:', error);
      }
    );
  }

  editUser(userId: number) {
    this.router.navigate(['/update-user', userId]);
  }


  deleteUser(user: any) {
    // Implement the logic for deleting the user
    console.log('Delete user:', user);

    // Assuming you have a deleteUser method in your UserService
    this.userService.deleteUser(user.userId).subscribe(
      () => {
        // If deletion is successful, remove the user from the local array
        this.users = this.users.filter(u => u.userId !== user.userId);
        console.log('User deleted successfully.');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  
  
}
