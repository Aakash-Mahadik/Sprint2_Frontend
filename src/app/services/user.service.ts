// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}`);
  }

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}`, user);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${userId}`, user);
  }
  // updateUser(user: any): Observable<any> {
  //   const url = `${this.apiUrl}/${user.userId}`;
  //   return this.http.put(url, user);
  // }

  addUser(user: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${userId}`);
  }

  getUserTasks(userId: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/${userId}/tasks`);
  }

  getUserTask(userId: number, taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/${userId}/tasks/${taskId}`);
  }

  getUserTasksWithDetails(userId: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/${userId}/tasks/withDetails`);
  }
  
}
