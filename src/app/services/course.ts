import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = "http://localhost:8080/courses";

  constructor(private http: HttpClient) {}

  // Get all courses
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get course by ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create new course
  create(course: any): Observable<any> {
    return this.http.post(this.baseUrl, course);
  }

  // Update course
  update(id: number, course: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, course);
  }

  // Delete course
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
