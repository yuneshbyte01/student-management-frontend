import { Component, signal } from '@angular/core';
import { StudentService } from '../../services/student';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css'],
})
export class StudentList {

  students = signal<any[]>([]);

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe((data: any[]) => {
      this.students.set(data); // reactive update
    });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe(() => this.loadStudents());
  }
}
