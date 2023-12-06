
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private httpClient: HttpClient) {}

  // Add a method to get user by ID
  getUserById(userId: number): Observable<any> {
    const userUrl = `http://localhost:8080/api/users/${userId}`;
    return this.httpClient.get<any>(userUrl);
  }

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}`);
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/${taskId}`);
  }

  getTasksByUserId(userId: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/user/${userId}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}`, task);
  }

  // updateTask(taskId: number, task: Task): Observable<Task> {
  //   return this.httpClient.put<Task>(`${this.apiUrl}/${taskId}`, task);
  // }

  updateTask(task: any): Observable<void> {
    const url = `${this.apiUrl}/${task.taskId}`;
    return this.httpClient.put<void>(url, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${taskId}`);
  }

  getTaskComments(taskId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.apiUrl}/${taskId}/comments`);
  }

  addCommentToTask(taskId: number, comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.apiUrl}/${taskId}/comments`, comment);
  }

  // assignTaskToUser(taskId: number, userId: number): Observable<Task> {
  //   return this.httpClient.post<Task>(`${this.apiUrl}/${taskId}/assign/${userId}`, null);
  // }

  getTasksWithUserDetails(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/withUserDetails`);
  }
  
  assignTaskToUser(taskId: number, userId: number): Observable<Task> {
    const requestData = {
      taskId: taskId,
      userId: userId
    };

    return this.httpClient.post<Task>(`${this.apiUrl}/${taskId}/assign/${userId}`, requestData);
  }

}
