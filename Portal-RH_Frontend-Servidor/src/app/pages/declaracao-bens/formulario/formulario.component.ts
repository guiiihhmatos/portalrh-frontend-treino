import { Secretaria } from './../../../models/listas/secretaria.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeclaracaoService } from './../../../services/declaracao-bens/declaracao/declaracao.service';
import { DeclaracaoBens } from '../../../models/declaracao-bens/declaracao-bens.model';
import { Servidor } from './../../../models/servidor/servidor.model';
import { ListasService } from './../../../services/listas/listas.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  exercicio: number;
  formDeclaracao: FormGroup;
  servidor: Servidor;
  secretaria: Secretaria;
  dsDeclaracao: boolean = true;

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

    /*--- aplica na variavel o exercicio do formulario passado na URL---*/
    this.exercicio = Number(rotaAtual.snapshot.paramMap.get('exercicio'));
    /*--- Verifica se o ano passado na URL está dentro do prazo permitodo ---*/
    const ano = new Date().getFullYear();
    if(this.exercicio != (ano-1) && this.exercicio != (ano-2)){
      this.route.navigate(['/declaracao-bens/declaracoes']);
    }

    /*--- Constroi o objeto do formulario de declaração ---*/
    this.formDeclaracao = fb.group({
      id: [null],
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
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

    this.getProtocolo();

    this.onSetValue(this.servidor);

    let negativa = "Declaro, sob as penas previstas em lei, que não possuo bens passíveis de declaração a Receita Federal do Brasil,"+
     "relativamente ao ano-base preenchido acima.";
    let anual = "Declaro que..."

    this.formDeclaracao.get('tipo')?.valueChanges.subscribe(value => {
      if(value == "Declaração Negativa de Bens"){
        this.dsDeclaracao = true;
        this.formDeclaracao.controls['declaracao'].setValue(negativa);
      } else if(value == "Declaração Anual de Bens") {
        this.dsDeclaracao = false;
        this.formDeclaracao.controls['declaracao'].setValue(anual);
      }
    })
  }

  /*--- Insere os valores do servidor no campos do formulario ---*/
  onSetValue(servidor: Servidor) {
    //Requisição que altera o nome da secretaria direto no control do formulario(campo)
    this.listasService.getSecretarias().subscribe((res) => {
      res.forEach((e) => {
        if (e.sigla == servidor.secretaria) {
          this.formDeclaracao.controls['secretaria'].setValue(e.descricao);
        }
      });
    });
    this.formDeclaracao.patchValue({
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
    } else if (this.formDeclaracao.invalid){
      AppComponent.openSwal({message:"Preencha todos os campos"});
    } else if (this.formDeclaracao.controls['declaracao'].value == 'Declaro que...'){
      AppComponent.openSwal({message:"Informe a declaração"})
    } else {
      this.declaracaoService.saveDeclaracao(declaracao).subscribe(
        (res) => {
          this.route.navigate(['/declaracao-bens/protocolo/', this.exercicio], {relativeTo: this.rotaAtual, state:{data: res}})
          this._snackBar.open(`Declaração de ${this.exercicio} enviada com sucesso!`,"OK",{duration: 2000,});
        },
        (error)=> {
          AppComponent.openSwal({message:"Erro ao enviar as informações", text: error.error.message});
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
