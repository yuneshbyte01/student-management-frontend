import { Component, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './dashboard-view.html'
})
export class Dashboard implements OnInit {

  totalStudents = signal(0);
  totalDepartments = signal(0);
  studentsPerDept = signal<any[]>([]);

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadStats();
    this.loadStudentsPerDept();
  }

  loadStats() {
    this.dashboardService.getStats().subscribe({
      next: (res) => {
        this.totalStudents.set(res.totalStudents);
        this.totalDepartments.set(res.totalDepartments);
      }
    });
  }

  loadStudentsPerDept() {
    this.dashboardService.getStudentsPerDepartment().subscribe({
      next: (res) => this.studentsPerDept.set(res)
    });
  }
}
