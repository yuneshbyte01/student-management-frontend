import { Component, OnInit, signal } from '@angular/core';
import { StudentService } from '../../services/student';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './student-list.html'
})
export class StudentList implements OnInit {
  students = signal<any[]>([]);
  selectedStudent = signal<any | null>(null);
  searchText = signal('');

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (response: any) => this.students.set(response),
      error: (error) => {
        console.error(error);
        alert('Error loading students');
      },
    });
  }

  selectStudentForDelete(id: number) {
    this.studentService.getById(id).subscribe(student => {
      this.selectedStudent.set(student);
    });
  }

  confirmDelete() {
    const student = this.selectedStudent();
    if (student) {
      this.deleteStudent(student.id);
    }
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe({
      next: () => {
        this.students.set(this.students().filter(s => s.id !== id));
        this.snackBar.open('Student deleted successfully!', 'Close', {
          duration: 2500,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['snack-success'],
        });
      },
      error: () => {
        this.snackBar.open('Error deleting student', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
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
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['snack-error'],
        }),
    });
  }

  onSearchChange(event: any) {
    const keyword = event.target.value.trim();
    this.searchText.set(keyword);

    if (!keyword) {
      this.loadStudents(); // reset to a normal list
      return;
    }

    this.studentService.search(keyword).subscribe(res => {
      this.students.set(res);
    });
  }

}
