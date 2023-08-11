import { DeclaracaoBens } from '../../../models/declaracao-bens/declaracao-bens.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeclaracaoService } from './../../../services/declaracao-bens/declaracao/declaracao.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Secretaria } from './../../../models/listas/secretaria.model';
import { Servidor } from './../../../models/servidor/servidor.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ListasService } from 'src/app/services/listas/listas.service';
import { Validacoes } from 'src/app/models/validacoes/validacoes.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-exoneracao',
  templateUrl: './exoneracao.component.html',
  styleUrls: ['./exoneracao.component.scss']
})
export class ExoneracaoComponent {
  exercicio: number;
  formExoneracao: FormGroup;
  servidor: Servidor;
  secretaria: Secretaria;
  dsDeclaracao: boolean = true;
  confirmExoneracao: boolean = false;

  constructor(
    private rotaAtual: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private listasService: ListasService,
    private route: Router,
    private declaracaoService: DeclaracaoService,
    private _snackBar: MatSnackBar,
  ) {
    /*--- Constroi o objeto de secretaria ---*/
    this.secretaria = {
      codigo: "",
      sigla: "",
      descricao: ""
    }

    /*--- aplica na varia os dados do servidor de acordo com o login---*/
    this.servidor = JSON.parse(this.auth.getServidor());

    /*--- Verifica se o ano passado na URL está dentro do prazo permitodo ---*/
    this.exercicio = new Date().getFullYear();

    /*--- Constroi o objeto do formulario de declaração ---*/
    this.formExoneracao = fb.group({
      id: [null],
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validacoes.Email]],
      secretaria: [null, [Validators.required]],
      localTrabalho: [null, [Validators.required]],
      exercicio: [null, [Validators.required]],
      dtAtualizacao: [new Date(), [Validators.required]],
      declaracao: [null, [Validators.required]],
      tipo: ['', [Validators.required]],
      motivoRetificacao: [null],
      reciboIr: [null]
    });
  }

  /*--- Realiza funções ao iniciar a página---*/
  ngOnInit(): void {

      this.onSetValue(this.servidor);

      let negativa = "Declaro, sob as penas previstas em lei, que não possuo bens passíveis de declaração a Receita Federal do Brasil,"+
       "relativamente ao ano-base preenchido acima.";
      let anual = "Declaro que..."

      this.formExoneracao.get('tipo')?.valueChanges.subscribe(value => {
        if(value == "Declaração Negativa de Bens"){
          this.dsDeclaracao = true;
          this.formExoneracao.controls['declaracao'].setValue(negativa);
        } else if(value == "Declaração Anual de Bens") {
          this.dsDeclaracao = false;
          this.formExoneracao.controls['declaracao'].setValue(anual);
        }
      })
  }

  releaseForm(){
    this.getProtocolo();
    this.confirmExoneracao = true;
    this.ngOnInit();
  }

  /*--- Insere os valores do servidor no campos do formulario ---*/
  onSetValue(servidor: Servidor) {
    //Requisição que altera o nome da secretaria direto no control do formulario(campo)
    this.listasService.getSecretarias().subscribe((res) => {
      res.forEach((e) => {
        if (e.sigla == servidor.secretaria) {
          this.formExoneracao.controls['secretaria'].setValue(e.descricao);
        }
      });
    });
    this.formExoneracao.patchValue({
      matricula: servidor.matricula,
      cpf: servidor.cpf,
      nome: String(servidor.nome).toUpperCase(),
      email: servidor.email,
      localTrabalho: servidor.localTrabalho,
      exercicio: this.exercicio,
    });
  }

  /*--- Metodo com as validações de campo e envia os dados para o banco de dados---*/
  enviarDeclaracao(declaracao:DeclaracaoBens){
    const confirmacao = document.getElementById('confirmacao') as HTMLInputElement
    if(!confirmacao.checked){
      AppComponent.openSwal({message:"Confirme que as informações são verdadeiras"});
      confirmacao.focus();
    } else if (this.formExoneracao.invalid){
      AppComponent.openSwal({message:"Preencha todos os campos"});
    } else if (this.formExoneracao.controls['declaracao'].value == 'Declaro que...'){
      AppComponent.openSwal({message:"Informe a declaração"});
    } else {
      declaracao.tipo = "Declaração de Ex-Servidor";
      this.declaracaoService.saveDeclaracao(declaracao).subscribe(
        (res) => {
          this.route.navigate(['/declaracao-bens/protocolo/', this.exercicio], {relativeTo: this.rotaAtual, state:{data: res}})
          this._snackBar.open(`Declaração de ${this.exercicio} enviada com sucesso!`,"OK",{duration: 2000,});
        },
        (error)=> {
          AppComponent.openSwal({message:"Erro ao enviar informações", text: error.error.message});
        })
    }
  }

  /*--- Verifica se existe protocolo do exercicio passado para redirecionar à página de declaração enviada---*/
  getProtocolo(){
    const matricula = this.servidor.matricula;
    const cpf = this.servidor.cpf;
    const exercicio = this.exercicio;
    this.declaracaoService.getProtocolo(matricula, cpf, exercicio).subscribe(
      () => {
        this.route.navigate([`/declaracao-bens/${exercicio}/declarada`]);
      },
      (error)=>{}
    )
  }
}
