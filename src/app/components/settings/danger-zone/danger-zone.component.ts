import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "../../posts/posts.component";
import { UserService } from 'src/app/http/services/user.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-danger-zone',
  templateUrl: './danger-zone.component.html',
  styleUrls: ['./danger-zone.component.scss']
})
export class DangerZoneComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openFlagDialog() {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
    });
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delUser() {
    return this.userService.delUser();
  }
}
