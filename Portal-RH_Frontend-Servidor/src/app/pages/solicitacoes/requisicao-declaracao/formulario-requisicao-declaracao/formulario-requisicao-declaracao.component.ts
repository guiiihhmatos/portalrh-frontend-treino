import { RequisicaoDeclaracaoService } from './../../../../services/solicitacoes/requisicao-declaracao/requisicao-declaracao.service';
import { RequisicaoDeclaracao } from './../../../../models/solicitacoes/requisicao-declaracao/requisicao-declaracao.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-formulario-requisicao-declaracao',
  templateUrl: './formulario-requisicao-declaracao.component.html',
  styleUrls: ['./formulario-requisicao-declaracao.component.scss'],
})
export class FormularioRequisicaoDeclaracaoComponent {
  declaracoes: string[];
  servidor: Servidor;
  formRequisicaoDeclaracao: FormGroup;
  outraSolicitacao: boolean = false;

  @ViewChild('confirmacao') confirmacao!: ElementRef;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private requisicaoDeclaracaoService: RequisicaoDeclaracaoService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private _snackbar: MatSnackBar
  ) {
    this.declaracoes = [
      'Funcional',
      'Regime Previdenciário',
      'Contagem de Tempo de Serviço',
      'Nada Consta',
      'Financiamento Habitacional',
      'Emissão de Certidão do INSS',
    ];

    this.outraSolicitacao = history.state.outraSolicitacao;

    this.servidor = JSON.parse(auth.getServidor());

    this.formRequisicaoDeclaracao = fb.group({
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      rg: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      tipo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.onSetValue(this.servidor);

    this.getSolicitacoes(this.servidor.matricula, this.servidor.cpf);
  }

  onSetValue(servidor: Servidor) {
    this.formRequisicaoDeclaracao.patchValue({
      matricula: servidor.matricula,
      cpf: servidor.cpf,
      rg: servidor.rg,
      nome: servidor.nome,
      telefone: servidor.telefone,
      email: servidor.email=="-"?null:servidor.email,
    });
  }

  enviarSolicitacao(solicitacao: RequisicaoDeclaracao) {
    if (this.formRequisicaoDeclaracao.invalid) {
      AppComponent.openSwal({message:"Preencha todos os campos"});
    } else if (this.formRequisicaoDeclaracao.controls['tipo'].value.length < 4) {
      AppComponent.openSwal({message:"Tipo muito curto"});
    } else {
      this.requisicaoDeclaracaoService
        .saveRequisicaoDeclaracao(solicitacao)
        .subscribe({
          next: (res) => {
            this.rota.navigate(['/solicitacoes/requisicao-declaracao/protocolo', String(res.id).padStart(4,"0")],
            {relativeTo: this.rotaAtual, state: {data: res}});
            this._snackbar.open("Requisição de declaracao: "+ solicitacao.tipo+", realizada", "OK", {
              duration: 3000
            })
          },
          error: (error) => {
            AppComponent.openSwal({message:"Erro ao enviar as informações", text: error.error.message});
          }
        });
    }
  }

  getSolicitacoes(matricula: number, cpf: string) {
    this.requisicaoDeclaracaoService
      .listarRequisicoesDeclaracao(matricula, cpf)
      .subscribe(
        (res) => {
          if(!this.outraSolicitacao && res.length > 0){
            this.rota.navigate(['/solicitacoes/requisicao-declaracao/realizada']);
          }
        },
      );
  }
}
