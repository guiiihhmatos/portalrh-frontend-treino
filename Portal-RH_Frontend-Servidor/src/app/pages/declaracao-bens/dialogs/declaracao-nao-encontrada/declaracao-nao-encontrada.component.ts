import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-declaracao-nao-encontrada',
  templateUrl: './declaracao-nao-encontrada.component.html',
  styleUrls: ['./declaracao-nao-encontrada.component.scss']
})
export class DeclaracaoNaoEncontradaComponent {
  constructor( public dialogRef: MatDialogRef<DeclaracaoNaoEncontradaComponent>){

  }

  onClose(): void {
    this.dialogRef.close();
  }
}
