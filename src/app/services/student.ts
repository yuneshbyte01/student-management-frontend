import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = "http://localhost:8080/students";

  constructor(private http: HttpClient) {}

  // Get all students
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Get student by ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create new student
  create(student: any, deptId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}?deptId=${deptId}`, student);
  }

  // Update student
  update(id: number, student: any, deptId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}?deptId=${deptId}`, student);
  }

  // Delete student
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Search students
  search(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }

  // Get a paginated student list
  getPage(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/page?page=${page}&size=${size}`);
  }
}
