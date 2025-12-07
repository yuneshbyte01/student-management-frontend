import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgIf} from '@angular/common';

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
    private studentService: StudentService
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

    if (studentData.id) {
      this.studentService.update(studentData.id, studentData)
        .subscribe(() => this.router.navigate(['/students']));
    } else {
      delete studentData.id;
      this.studentService.create(studentData)
        .subscribe(() => this.router.navigate(['/students']));
    }
  }

  cancel() {
    this.router.navigate(['/students']);
  }
}
