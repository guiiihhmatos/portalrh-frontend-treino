import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Aviso } from 'src/app/models/servidor/aviso.model';

@Component({
  selector: 'app-aviso-servidor',
  templateUrl: './aviso-servidor.component.html',
  styleUrls: ['./aviso-servidor.component.scss']
})
export class AvisoServidorComponent {
  constructor(
    dialogRef: MatDialogRef<AvisoServidorComponent>,
    @Inject(MAT_DIALOG_DATA) public aviso: Aviso
  ){
  }
}
