// task-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task$: Observable<Task | undefined>; // Use an observable for asynchronous data
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {
    this.task$ = new Observable(); // Initialize as an empty observable
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const taskId = +params['taskId'];
      console.log('Task ID:', taskId);
    
      // Fetch task details using your task service
      this.task$ = this.taskService.getTaskById(taskId);
      // You might need to adjust the above line based on your service implementation
    
      // Fetch comments using your comment service
      // You need to replace 'getCommentsForTask' with the actual method from your service
      // that retrieves comments for a specific task.
      // this.comments = this.commentService.getCommentsForTask(taskId);
    });
  }
}
