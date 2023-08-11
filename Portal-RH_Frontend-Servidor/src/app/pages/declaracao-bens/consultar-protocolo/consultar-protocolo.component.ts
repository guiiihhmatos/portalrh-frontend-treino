import { DeclaracaoNaoEncontradaComponent } from './../../../pages/declaracao-bens/dialogs/declaracao-nao-encontrada/declaracao-nao-encontrada.component';
import { DeclaracaoEncontradaComponent } from './../dialogs/declaracao-encontrada/declaracao-encontrada.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeclaracaoService } from './../../../services/declaracao-bens/declaracao/declaracao.service';
import { Servidor } from './../../../models/servidor/servidor.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { HtmlTagDefinition } from '@angular/compiler';

@Component({
  selector: 'app-consultar-protocolo',
  templateUrl: './consultar-protocolo.component.html',
  styleUrls: ['./consultar-protocolo.component.scss'],
})
export class ConsultarProtocoloComponent {
  anoAtual: number;
  formConsulta: FormGroup;
  servidor: Servidor;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private declaracaoService: DeclaracaoService,
    private dialog: MatDialog,
  ) {
    this.anoAtual = new Date().getFullYear();
    this.servidor = JSON.parse(auth.getServidor());

    this.formConsulta = fb.group({
      exercicio: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  consultarProtocolo(consulta: any) {
    const matricula = this.servidor.matricula;
    const cpf = this.servidor.cpf;
    const exercicio = Number(consulta.exercicio);
    const container = document.getElementsByTagName('body')[0] as HTMLBodyElement;
    this.declaracaoService.getProtocolo(matricula, cpf, exercicio).subscribe(
      (res) => {
        if(container.clientWidth > 1400){
          const dialogRef = this.dialog.open(DeclaracaoEncontradaComponent,{ position: { top: '30vh', left: '45vw'}, data: res});
        } else {
          const dialogRef = this.dialog.open(DeclaracaoEncontradaComponent,{ position: { top: '30vh'}, data: res });
        }
      },
      (error) => {
        if(error.status == 404){
          if(container.clientWidth > 1400){
            const dialogRef = this.dialog.open(DeclaracaoNaoEncontradaComponent,{ position: { top: '30vh', left: '45vw'}});
          } else {
            const dialogRef = this.dialog.open(DeclaracaoNaoEncontradaComponent,{ position: { top: '30vh'}});
          }
      }
      }
    );
  }
}
