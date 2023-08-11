import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AndamentoServidor } from 'src/app/models/servidor/andamento.model';

@Component({
  selector: 'app-andamento-servidor',
  templateUrl: './andamento-servidor.component.html',
  styleUrls: ['./andamento-servidor.component.scss']
})
export class AndamentoServidorComponent {
  constructor(
    dialogRef: MatDialogRef<AndamentoServidorComponent>,
    @Inject(MAT_DIALOG_DATA) public andamento: AndamentoServidor
  ){
  }
}
