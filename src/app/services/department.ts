import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = "http://localhost:8080/departments";

  constructor(private http: HttpClient) {}

  // Get all departments
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Get department by ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create a new department
  create(department: any): Observable<any> {
    return this.http.post(this.baseUrl, department);
  }

  // Update department
  update(id: number, department: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, department);
  }

  // Delete department
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
