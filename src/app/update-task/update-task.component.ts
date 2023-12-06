
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  taskId!: number;
  task: any = {};
  userList: any[] = []; // Assuming you fetch the user list from the backend

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
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

    // Extract task ID from the route parameters
    this.route.params.subscribe((params) => {
      this.taskId = +params['id']; // '+' converts the parameter to a number
      this.fetchTaskDetails();
    });
  }

  fetchTaskDetails() {
    // Fetch task details by ID
    this.taskService.getTaskById(this.taskId).subscribe(
      (task) => {
        this.task = task;
      },
      (error) => {
        console.error('Error fetching task details:', error);
      }
    );
  }

  updateTask() {
    // Update the task using the updateTask method in the service
    this.task.updatedAt = new Date();
    this.taskService.updateTask(this.task).subscribe(
      () => {
        // Redirect to the task list after updating
        this.router.navigate(['/task-list']);
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }
}

