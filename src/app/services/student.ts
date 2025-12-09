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

  // Get a single student
  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Add a new student
  create(student: any): Observable<any> {
    return this.http.post(this.baseUrl, student);
  }

  // Update student
  update(id: number, student: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, student);
  }

  // Delete student
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Search student
  search(keyword: string) {
    return this.http.get<any[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }
}
