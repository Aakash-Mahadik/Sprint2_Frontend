// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrl: './add-user.component.css'
// })
// export class AddUserComponent {

// }

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  user: any = {}; // User object to bind to the form

  constructor(private userService: UserService,private router:Router) {}

  ngOnInit(): void {}

  // Method to handle form submission (called when the "Add User" button is clicked)
  // addUser() {
  //   this.userService.addUser(this.user).subscribe(
  //     (data: any) => {
  //       console.log('User added successfully:', data);
  //       // Optionally, navigate to the user list page or perform other actions
  //     },
  //     (error) => {
  //       console.error('Error adding user:', error);
  //     }
  //   );
  // }
  addUser() {
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log('User added successfully:', data);
        // Redirect to the UserListComponent after adding the user
        this.router.navigate(['/user-list']);
      },
      (error) => {
        console.error('Error adding user:', error);
        // Handle errors if needed
      }
    );
  }
}
