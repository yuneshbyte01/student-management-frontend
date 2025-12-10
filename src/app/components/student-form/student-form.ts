import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { DepartmentService } from '../../services/department';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './student-form.html'
})
export class StudentForm implements OnInit {

  form!: FormGroup;
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDepartments();
    this.buildForm();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (res) => this.departments = res,
      error: () => console.error("Failed to load departments")
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      course: ['', Validators.required],
      department: ['', Validators.required]
    });

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.studentService.getById(id).subscribe((data: any) => {
        const formattedDob = data.dob ? data.dob.substring(0, 10) : '';

        this.form.patchValue({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
          dob: formattedDob,
          address: data.address,
          course: data.course,
          department: data.department?.id
        });
      });
    }
  }

  saveStudent() {
    let studentData = this.form.value;
    const deptId = studentData.department;

    if (!deptId) {
      this.snackBar.open("Please select a department", "Close", { duration: 2500 });
      return;
    }

    delete studentData.department;

    // UPDATE
    if (studentData.id) {
      this.studentService.update(studentData.id, studentData, deptId)
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

    // CREATE
    else {
      delete studentData.id;

      this.studentService.create(studentData, deptId)
        .subscribe({
          next: () => {
            this.snackBar.open('Student created successfully!', 'Close', {
              duration: 2500,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snack-success'],
            });

            this.router.navigate(['/students']);
          },
          error: () => {
            this.snackBar.open('Error creating student!', 'Close', {
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
