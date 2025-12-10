import { Routes } from '@angular/router';

import { StudentList } from './components/student-list/student-list';
import { StudentForm } from './components/student-form/student-form';

import { DepartmentList } from './components/department-list/department-list';
import { DepartmentForm } from './components/department-form/department-form';

export const routes: Routes = [

  // Student Routes
  { path: 'students', component: StudentList },
  { path: 'add', component: StudentForm },
  { path: 'edit/:id', component: StudentForm },

  // Department Routes
  { path: 'departments', component: DepartmentList },
  { path: 'departments/add', component: DepartmentForm },
  { path: 'departments/edit/:id', component: DepartmentForm },

  // Default
  { path: '', redirectTo: 'students', pathMatch: 'full' }
];
