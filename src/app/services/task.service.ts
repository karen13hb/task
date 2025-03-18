import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TaskResponse } from '../models/TaskResponse';
import { TaskRequest } from '../models/TaskRequest ';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private APIUrl= environment.APIUrl

  constructor(private http: HttpClient) {

  }

  getTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${this.APIUrl}/api/Task`);
  }

  createTasks(task: TaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(`${this.APIUrl}/api/Task`, task);
  }

  updateTask(task: TaskRequest, id: number): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.APIUrl}/api/Task/${id}`, task);
  }


  getTaskById(id: number): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.APIUrl}/api/Task/${id}`);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/api/Task/${id}`);
  }

}
