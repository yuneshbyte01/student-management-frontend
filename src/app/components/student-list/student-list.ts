import {Component, OnInit, signal} from '@angular/core';
import { StudentService } from '../../services/student';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css'],
})
export class StudentList implements OnInit {

  students = signal<any[]>([]);
  selectedStudent = signal<any | null>(null); // simple signal for viewing

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe((response: any) => {
      this.students.set(response);
    }, error => {
      console.error(error);
      alert('Error loading students');
    });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe(() => {
      alert('Student deleted successfully!');
      this.loadStudents();
    }, error => {
      console.error(error);
      alert('Error deleting student');
    });
  }

  viewStudent(id: number) {
    this.studentService.getById(id).subscribe((student) => {
      this.selectedStudent.set(student);
    });
  }
}
