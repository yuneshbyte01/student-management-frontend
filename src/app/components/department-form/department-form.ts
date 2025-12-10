import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../services/department';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './department-form.html'
})
export class DepartmentForm implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required]
    });

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.departmentService.getById(id).subscribe((data: any) => {
        this.form.patchValue({
          id: data.id,
          name: data.name
        });
      });
    }
  }

  saveDepartment() {
    let departmentData = this.form.value;

    // UPDATE
    if (departmentData.id) {
      this.departmentService.update(departmentData.id, departmentData)
        .subscribe({
          next: () => {
            this.snackBar.open('Department updated successfully!', 'Close', {
              duration: 2500,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snack-success'],
            });
            this.router.navigate(['/departments']);
          },
          error: () => {
            this.snackBar.open('Error updating department!', 'Close', {
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
      delete departmentData.id;
      this.departmentService.create(departmentData)
        .subscribe({
          next: () => {
            this.snackBar.open('Department created successfully!', 'Close', {
              duration: 2500,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snack-success'],
            });
            this.router.navigate(['/departments']);
          },
          error: () => {
            this.snackBar.open('Error creating department!', 'Close', {
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
    this.router.navigate(['/departments']);
  }
}
