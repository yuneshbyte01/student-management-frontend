import { Routes } from '@angular/router';
import { StudentList } from './components/student-list/student-list';
import { StudentForm } from './components/student-form/student-form';

export const routes: Routes = [
  { path: 'students', component: StudentList },
  { path: 'add', component: StudentForm },
  { path: 'edit/:id', component: StudentForm },
  { path: '', redirectTo: 'students', pathMatch: 'full' }
];

