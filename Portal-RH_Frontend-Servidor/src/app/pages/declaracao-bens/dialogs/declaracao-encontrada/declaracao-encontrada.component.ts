import { ActivatedRoute, Router } from '@angular/router';
import { ProtocoloDeclaracaoBens } from '../../../../models/declaracao-bens/protocolo-declaracao-bens.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-declaracao-encontrada',
  templateUrl: './declaracao-encontrada.component.html',
  styleUrls: ['./declaracao-encontrada.component.scss'],
})
export class DeclaracaoEncontradaComponent {
  constructor(
    public dialogRef: MatDialogRef<DeclaracaoEncontradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProtocoloDeclaracaoBens,
    private rotaAtual: ActivatedRoute,
    private rota: Router
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  redirectToPDF() {
    this.onClose();
    this.rota.navigate(
      ['/declaracao-bens/imprimir-protocolo', this.data.id],
      { relativeTo: this.rotaAtual, state: { data: this.data } }
    );
  }

  redirectToRetificacao() {
    this.onClose();
    if (this.data.exercicio == new Date().getFullYear()) {
      this.rota.navigate(['/declaracao-bens/retificacao/exoneracao'], {
        relativeTo: this.rotaAtual,
        state: { data: this.data },
      });
    } else {
      this.rota.navigate(
        ['/declaracao-bens/retificacao/', this.data.exercicio],
        { relativeTo: this.rotaAtual, state: { data: this.data } }
      );
    }
  }
}
