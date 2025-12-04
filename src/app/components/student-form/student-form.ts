import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.css']
})
export class StudentForm {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      course: ['']
    });

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.studentService.getById(id).subscribe((data: any) => {
        this.form.patchValue(data);
      });
    }
  }

  saveStudent() {
    const studentData = this.form.value;

    if (studentData.id) {
      this.studentService.update(studentData.id, studentData)
        .subscribe(() => this.router.navigate(['/students']));
    } else {
      this.studentService.create(studentData)
        .subscribe(() => this.router.navigate(['/students']));
    }
  }
}
