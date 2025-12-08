import { Component, OnInit, signal } from '@angular/core';
import { StudentService } from '../../services/student';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { StudentViewDialog } from '../student-view-dialog/student-view-dialog';
import {StudentDeleteDialog} from '../student-delete-dialog/student-delete-dialog';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css'],
})
export class StudentList implements OnInit {
  students = signal<any[]>([]);
  title = 'Student List';

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
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

  confirmDeleteStudent(student: any) {
    const dialogRef = this.dialog.open(StudentDeleteDialog, {
      width: '350px',
      data: { id: student.id, name: student.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStudent(student.id);
      }
    });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe({
      next: () => {
        alert('Student deleted successfully!');
        this.loadStudents();
      },
      error: (error) => {
        console.error(error);
        alert('Error deleting student');
      },
    });
  }

  viewStudent(id: number) {
    this.studentService.getById(id).subscribe({
      next: (student) => {
        this.dialog.open(StudentViewDialog, {
          width: '400px',
          data: student,
        });
      },
      error: (error) => {
        console.error(error);
        alert('Error fetching student details');
      },
    });
  }
}
