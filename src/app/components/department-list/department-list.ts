import { Component, OnInit, signal } from '@angular/core';
import { DepartmentService } from '../../services/department';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './department-list.html'
})
export class DepartmentList implements OnInit {

  departments = signal<any[]>([]);
  selectedDepartment = signal<any | null>(null);

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (data) => this.departments.set(data),
      error: () => {
        this.snackBar.open("Failed to load departments!", "Close", {
          duration: 2500,
          panelClass: ['snack-error']
        });
      }
    });
  }

  selectDepartmentForDelete(id: number) {
    this.departmentService.getById(id).subscribe({
      next: (dept) => this.selectedDepartment.set(dept),
      error: () => {
        this.snackBar.open("Error fetching department!", "Close", {
          duration: 2500,
          panelClass: ['snack-error']
        });
      }
    });
  }

  confirmDelete() {
    const dept = this.selectedDepartment();
    if (dept) this.deleteDepartment(dept.id);
  }

  deleteDepartment(id: number) {
    this.departmentService.delete(id).subscribe({
      next: () => {
        this.departments.set(this.departments().filter(d => d.id !== id));

        this.snackBar.open("Department deleted!", "Close", {
          duration: 2500,
          panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open("Error deleting department!", "Close", {
          duration: 3000,
          panelClass: ['snack-error']
        });
      }
    });
  }
}
