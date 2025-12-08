import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-student-view-dialog',
  standalone: true,
  imports: [MatDialogModule, NgIf],
  templateUrl: './student-view-dialog.html',
  styleUrls: ['./student-view-dialog.css'],
})
export class StudentViewDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
