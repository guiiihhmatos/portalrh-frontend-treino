import { ContagemQuinquenio } from './../../../../models/solicitacoes/contagem-quinquenio/contagem-quinquenio.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Servidor } from './../../../../models/servidor/servidor.model';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ContagemQuinquenioService } from 'src/app/services/solicitacoes/contagem-quinquenio/contagem-quinquenio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ListasService } from 'src/app/services/listas/listas.service';
import { Municipio } from 'src/app/models/listas/municipio.model';
import { ProtocoloContagemQuinquenio } from 'src/app/models/solicitacoes/contagem-quinquenio/protocolo-contagem-quinquenio.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-formulario-contagem-quinquenio',
  templateUrl: './formulario-contagem-quinquenio.component.html',
  styleUrls: ['./formulario-contagem-quinquenio.component.scss'],
})
export class FormularioContagemQuinquenioComponent {
  servidor: Servidor;
  formQuinquenio: FormGroup;
  @ViewChild('confirmacao') confirmacao!: ElementRef;

  constructor(
    private auth: AuthService,
    public fb: FormBuilder,
    private listasService: ListasService,
    private CQServcice: ContagemQuinquenioService,
    private _snackbar: MatSnackBar,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
  ) {
    this.servidor = JSON.parse(auth.getServidor());

    this.formQuinquenio = fb.group({
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      secretaria: [null, [Validators.required]],
      telefone: [null],
      periodo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.onSetValue(this.servidor);
    this.getSolicitacoes(this.servidor);
  }

  onSetValue(servidor: Servidor) {
    this.formQuinquenio.patchValue({
      matricula: servidor.matricula,
      cpf: servidor.cpf,
      nome: servidor.nome,
      endereco: servidor.tipoLogradouro+". "+servidor.endereco,
      bairro: servidor.bairro,
      cargo: servidor.cargo,
      telefone: servidor.telefone,
      secretaria: servidor.secretaria,
    });

    // Aplica nome da cidade de acordo com os dados disponibilizados na API
    this.listasService.getMunicipioByCode(servidor.municipio).subscribe(
      (municipio) => {
        this.formQuinquenio.controls['municipio'].setValue(municipio.nome);
      }
    )
  }

  salvarSolicitacao(quinquenio: ContagemQuinquenio) {
    if (this.formQuinquenio.invalid) {
      AppComponent.openSwal({message:"Preencha todos os campos"});
    } else if(!this.confirmacao.nativeElement.checked){
      AppComponent.openSwal({message:"Confirme a a declaração de ciência"});
    } else {
      this.CQServcice.saveCQ(quinquenio).subscribe(
        (res) => {
          this._snackbar.open("Solicitação de "+quinquenio.periodo+" realizada", "OK", {
            duration: 3000
          });
          this.rota.navigate(['/solicitacoes/contagem-quinquenio/protocolo/', String(res.id).padStart(4, "0")], {relativeTo: this.rotaAtual, state: {data: res}});
        },
        (error)=>{
          AppComponent.openSwal({message:"Erro ao enviar solicitação", text: error.error.message});
        });
    }
  }

  getSolicitacoes(servidor: Servidor){
    this.CQServcice.getSolicitacoesCQByCpf(servidor.cpf).subscribe(
      (solicitacoes)=>{

        //aplica ids de solicitacoes em um array
        let idsSolicitacao: number[] = [];
        solicitacoes.forEach(solicitacao =>{
          idsSolicitacao.push(solicitacao.id);
        })
        //function que verifica qual o maior id do array e armazena em uma variavel
        let lastSolicitacao: any = idsSolicitacao.reduce(function(a:number,b:number){
          return Math.max(a,b);
        });

        //aplica na variavel o objeto da solicitacao
        solicitacoes.forEach(solicitacao => {
          if(solicitacao.id === lastSolicitacao){
            lastSolicitacao = solicitacao as ProtocoloContagemQuinquenio
          }
        })

        // redireciona a pagina de declarada se a solicitação naõ for atendida
        if(!lastSolicitacao.concluido){
          this.rota.navigate(['/solicitacoes/contagem-quinquenio/realizada'], {relativeTo: this.rotaAtual, state: {data : lastSolicitacao}})
        }
      },
      ()=>{}
    )
  }
}
