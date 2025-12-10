import { Component, OnInit, signal } from '@angular/core';
import { StudentService } from '../../services/student';
import { RouterModule } from '@angular/router';
import {DatePipe, NgFor, NgIf} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, DatePipe, MatPaginatorModule],
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
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getPage(this.page, this.size).subscribe({
      next: (res: any) => {
        this.students.set(res.content);
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      }
    });
  }

  onPageChange(event: any) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.loadStudents();
  }

  onSearchChange(event: any) {
    const keyword = event.target.value.trim();
    this.searchText.set(keyword);

    if (!keyword) {
      this.page = 0;
      this.loadStudents();
      return;
    }

    this.studentService.search(keyword).subscribe({
      next: (res) => {
        this.students.set(res);
        this.totalElements = res.length;
      },
      error: () => {
        this.snackBar.open("Search failed!", "Close", {
          duration: 2000,
          panelClass: ['snack-error']
        });
      }
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
