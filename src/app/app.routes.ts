import { Routes } from '@angular/router';

import { StudentList } from './components/student-list/student-list';
import { StudentForm } from './components/student-form/student-form';

import { DepartmentList } from './components/department-list/department-list';
import { DepartmentForm } from './components/department-form/department-form';
import {Dashboard} from './components/dashboard/dashboard-view';


export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },

  { path: 'students', component: StudentList },
  { path: 'add', component: StudentForm },
  { path: 'edit/:id', component: StudentForm },

  { path: 'departments', component: DepartmentList },
  { path: 'departments/add', component: DepartmentForm },
  { path: 'departments/edit/:id', component: DepartmentForm },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
