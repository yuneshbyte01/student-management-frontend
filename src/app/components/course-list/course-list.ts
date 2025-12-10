import { Component, OnInit, signal } from '@angular/core';
import { CourseService } from '../../services/course';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './course-list.html'
})
export class CourseList implements OnInit {

  courses = signal<any[]>([]);
  selectedCourse = signal<any | null>(null);

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAll().subscribe({
      next: (data) => this.courses.set(data),
      error: () => {
        this.snackBar.open("Failed to load courses!", "Close", {
          duration: 2500,
          panelClass: ['snack-error']
        });
      }
    });
  }

  selectCourseForDelete(id: number) {
    this.courseService.getById(id).subscribe({
      next: (course) => this.selectedCourse.set(course),
      error: () => {
        this.snackBar.open("Error fetching course!", "Close", {
          duration: 2500,
          panelClass: ['snack-error']
        });
      }
    });
  }

  confirmDelete() {
    const course = this.selectedCourse();
    if (course) this.deleteCourse(course.id);
  }

  deleteCourse(id: number) {
    this.courseService.delete(id).subscribe({
      next: () => {
        this.courses.set(this.courses().filter(c => c.id !== id));

        this.snackBar.open("Course deleted successfully!", "Close", {
          duration: 2500,
          panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open("Error deleting course!", "Close", {
          duration: 3000,
          panelClass: ['snack-error']
        });
      }
    });
  }
}
