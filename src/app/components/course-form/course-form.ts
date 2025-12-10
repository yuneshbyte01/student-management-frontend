import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course';
import { DepartmentService } from '../../services/department';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './course-form.html'
})
export class CourseForm implements OnInit {

  form!: FormGroup;
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.buildForm();
  }

  private loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (res) => this.departments = res,
      error: () => console.error("Failed to load departments")
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      fees: ['', [Validators.required, Validators.min(1000)]],
      duration: ['', Validators.required],
      departmentId: ['', Validators.required]
    });

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.courseService.getById(id).subscribe((data: any) => {
        this.form.patchValue({
          id: data.id,
          name: data.name,
          description: data.description,
          fees: data.fees,
          duration: data.duration,
          departmentId: data.department?.id
        });
      });
    }
  }

  saveCourse() {
    let courseData = this.form.value;

    // Convert dept value to proper structure
    const payload = {
      id: courseData.id,
      name: courseData.name,
      description: courseData.description,
      fees: courseData.fees,
      duration: courseData.duration,
      department: { id: courseData.departmentId }
    };

    // UPDATE
    if (courseData.id) {
      this.courseService.update(courseData.id, payload)
        .subscribe({
          next: () => {
            this.snackBar.open('Course updated successfully!', 'Close', {
              duration: 2500,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snack-success'],
            });
            this.router.navigate(['/courses']);
          },
          error: () => {
            this.snackBar.open('Error updating course!', 'Close', {
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
      delete payload.id;
      this.courseService.create(payload)
        .subscribe({
          next: () => {
            this.snackBar.open('Course created successfully!', 'Close', {
              duration: 2500,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snack-success'],
            });
            this.router.navigate(['/courses']);
          },
          error: () => {
            this.snackBar.open('Error creating course!', 'Close', {
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
    this.router.navigate(['/courses']);
  }
}
