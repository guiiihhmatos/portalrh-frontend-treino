import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor/servidor.model';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {

  constructor(
    public dialogRef: MatDialogRef<TermsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
  }

}
