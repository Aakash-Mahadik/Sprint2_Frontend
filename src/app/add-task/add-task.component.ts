
// add-task.component.ts

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  task: any = {};
  userList: any[] = []; // Assuming you fetch the user list from the backend

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the user list from the backend
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.userList = users;
      },
      (error) => {
        console.error('Error fetching user list:', error);
      }
    );
  }

  addTask() {
    this.task.createdAt = new Date();
    this.task.status = 'Initiated';
  
    this.taskService.createTask(this.task).subscribe(
      (createdTask: any) => {
        console.log('Task added successfully');

        // Assign the task to a user (if user ID is available)
        if (this.task.user && this.task.user.userId) {
          this.assignTaskToUser(createdTask.taskId, this.task.user.userId);
        }
  
        // Redirect to the TaskListComponent after adding the task
        this.router.navigate(['/task-list']);
      },
      (error) => {
        console.error('Error adding task:', error);
        // Handle errors if needed
      }
    );
  }
  

  assignTaskToUser(taskId: number, userId: number) {
    this.taskService.assignTaskToUser(taskId, userId).subscribe(
      (data) => {
        console.log('Task assigned to user successfully:', data);
        // You can update the UI to reflect the assignment if needed
      },
      (error) => {
        console.error('Error assigning task to user:', error);
        // Handle errors if needed
      }
    );
  }
}
