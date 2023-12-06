// import { Component, OnInit } from '@angular/core';
// import { TaskService } from '../services/task.service';
// import { UserService } from '../services/user.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-task-list',
//   templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.css']
// })
// export class TaskListComponent implements OnInit {
//   tasks: any[] = [];

//   constructor(private taskService: TaskService, private userService: UserService, private router: Router) { }

//   ngOnInit(): void {
//     this.fetchTasks();
//   }

//   fetchTasks(): void {
//     this.taskService.getAllTasks().subscribe(
//       (data: any) => {
//         this.tasks = data;
//         this.tasks.forEach(task => {
//           this.fetchUserDetails(task);
//         });
//       },
//       (error) => {
//         console.error('Error fetching tasks:', error);
//       }
//     );
//   }

//   fetchUserDetails(task: any): void {
//     if (task.userId != null) {
//       this.userService.getUserById(task.userId).subscribe(
//         (userData: any) => {
//           task.userName = userData.username || 'Unknown User';
//         },
//         (error) => {
//           console.error('Error fetching user:', error);
//           task.userName = 'Unknown User';
//         }
//       );
//     } else {
//       task.userName = 'Unassigned';
//     }
//   }

//   assignTaskToUser(taskId: number, userId: number): void {
//     this.taskService.assignTaskToUser(taskId, userId).subscribe(
//       (assignedTask: any) => {
//         // Refresh the task list after assigning
//         this.fetchTasks();
//       },
//       (error) => {
//         console.error('Error assigning task to user:', error);
//       }
//     );
//   }


//   editTask(task: any): void {
//     this.router.navigate(['/update-task', task.taskId]);
//   }

//   deleteTask(task: any): void {
//     this.taskService.deleteTask(task.taskId).subscribe(
//       () => {
//         this.fetchTasks(); // Fetch updated tasks after deletion
//       },
//       (error) => {
//         console.error('Error deleting task:', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  users: any[] = [];

  constructor(private taskService: TaskService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchTasks();
    this.fetchUsers(); // Add this line to fetch users for assignment dropdown
  }

  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (data: any) => {
        this.tasks = data;
        this.tasks.forEach(task => {
          this.fetchUserDetails(task);
        });
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchUserDetails(task: any): void {
    if (task.userId != null) {
      this.userService.getUserById(task.userId).subscribe(
        (userData: any) => {
          task.userName = userData.username || 'Unknown User';
        },
        (error) => {
          console.error('Error fetching user:', error);
          task.userName = 'Unknown User';
        }
      );
    } else {
      task.userName = 'Unassigned';
    }
  }

  assignTaskToUser(taskId: number, userId: number): void {
    this.taskService.assignTaskToUser(taskId, userId).subscribe(
      (assignedTask: any) => {
        // Refresh the task list after assigning
        this.fetchTasks();
      },
      (error) => {
        console.error('Error assigning task to user:', error);
      }
    );
  }

  editTask(task: any): void {
    this.router.navigate(['/update-task', task.taskId]);
  }

  deleteTask(task: any): void {
    this.taskService.deleteTask(task.taskId).subscribe(
      () => {
        this.fetchTasks(); // Fetch updated tasks after deletion
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  // viewDetails(taskId: number) {
  //   this.router.navigate(['/task-details', taskId]);
  // }

  viewDetails(taskId: number) {
    console.log('Task ID:', taskId);

    if (taskId !== undefined && taskId !== null) {
      // Assuming your route for task-details is '/task-details/:taskId'
      this.router.navigate(['/task-details', taskId]);
    }
  }
}
