import { Component, OnInit, signal } from '@angular/core';
import { StudentService } from '../../services/student';
import { RouterModule } from '@angular/router';
import {DatePipe, NgFor} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor, RouterModule, DatePipe],
  templateUrl: './student-list.html'
})

export class StudentList implements OnInit {

  students = signal<any[]>([]);
  selectedStudent = signal<any | null>(null);
  searchText = signal('');

  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  pages: number[] = [];

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPage(0);
  }

  loadStudents() {
    this.studentService.getPage(this.page, this.size).subscribe({
      next: (res: any) => {
        this.students.set(res.content);
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;

        // Generate page numbers: [0,1,2,...]
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (error) => {
        console.error(error);
        alert('Error loading students');
      }
    });
  }

  loadPage(pageIndex: number) {
    this.page = pageIndex;
    this.loadStudents();
  }

  onSearchChange(event: any) {
    const keyword = event.target.value.trim();
    this.searchText.set(keyword);

    if (!keyword) {
      this.page = 0;   // RESET PAGE
      this.loadStudents();
      return;
    }

    this.studentService.search(keyword).subscribe(res => {
      this.students.set(res);
      this.totalElements = res.length;
      this.totalPages = 1;
      this.pages = [0];
    });
  }

  selectStudentForDelete(id: number) {
    this.studentService.getById(id).subscribe(student => {
      this.selectedStudent.set(student);
    });
  }

  confirmDelete() {
    const student = this.selectedStudent();
    if (student) this.deleteStudent(student.id);
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe({
      next: () => {
        this.students.set(this.students().filter(s => s.id !== id));
        this.snackBar.open('Student deleted successfully!', 'Close', {
          duration: 2500,
          panelClass: ['snack-success'],
        });
      },
      error: () => {
        this.snackBar.open('Error deleting student', 'Close', {
          duration: 3000,
          panelClass: ['snack-error'],
        });
      },
    });
  }

  viewStudent(id: number) {
    this.studentService.getById(id).subscribe({
      next: (student) => this.selectedStudent.set(student),
      error: () =>
        this.snackBar.open('Error Viewing Student', 'Close', {
          duration: 3000,
          panelClass: ['snack-error'],
        }),
    });
  }
}
