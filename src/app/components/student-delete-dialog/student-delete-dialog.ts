import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-student-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './student-delete-dialog.html',
  styleUrls: ['./student-delete-dialog.css']
})
export class StudentDeleteDialog {

  constructor(
    private dialogRef: MatDialogRef<StudentDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string }
  ) {}

  confirmDelete() {
    this.dialogRef.close(true); // send back a result = true
  }
}
