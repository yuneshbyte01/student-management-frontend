import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgIf} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.css']
})
export class StudentForm implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required]
    });

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.studentService.getById(id).subscribe((data: any) => {
        this.form.patchValue(data);
      });
    }
  }

  saveStudent() {
    let studentData = this.form.value;

    // UPDATE
    if (studentData.id) {
      this.studentService.update(studentData.id, studentData)
        .subscribe({
          next: () => {
            this.snackBar.open('Student updated successfully!', 'Close', {
              duration: 2500,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snack-success'],
            });
            this.router.navigate(['/students']);
          },
          error: () => {
            this.snackBar.open('Error updating student!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snack-error'],
            });
          }
        });

      // CREATE
    } else {
      delete studentData.id;
      this.studentService.create(studentData)
        .subscribe({
          next: () => {
            this.snackBar.open('Student updated successfully!', 'Close', {
              duration: 2500,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snack-success'],
            });

            this.router.navigate(['/students']);
          },
          error: () => {
            this.snackBar.open('Error updating student!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snack-error'],
            });

          }
        });
    }
  }

  cancel() {
    this.router.navigate(['/students']);
  }
}
