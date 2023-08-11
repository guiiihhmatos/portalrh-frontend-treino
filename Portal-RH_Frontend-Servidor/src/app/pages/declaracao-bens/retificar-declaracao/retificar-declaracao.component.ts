import { DeclaracaoBens } from '../../../models/declaracao-bens/declaracao-bens.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeclaracaoService } from './../../../services/declaracao-bens/declaracao/declaracao.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ListasService } from 'src/app/services/listas/listas.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-retificar-declaracao',
  templateUrl: './retificar-declaracao.component.html',
  styleUrls: ['./retificar-declaracao.component.scss']
})
export class RetificarDeclaracaoComponent {

  exercicio: number;
  formRetificacao: FormGroup;
  dsDeclaracao: boolean = true;
  retificacao: DeclaracaoBens;

  constructor(
    private rotaAtual: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private listasService: ListasService,
    private route: Router,
    private declaracaoService: DeclaracaoService,
    private _snackBar: MatSnackBar,
  ) {

    /*--- aplica na variavel valor passado no historico da página ---*/
    this.retificacao = history.state.data;

    /*--- aplica na variavel o exercicio do formulario passado na URL---*/
      this.exercicio = this.retificacao.exercicio;

    /*--- Verifica se o ano passado na URL está dentro do prazo permitodo ---*/
    const ano = new Date().getFullYear();
    if(this.exercicio != (ano-1) && this.exercicio != (ano-2) && this.retificacao.tipo != "Declaração de Ex-Servidor"){
      this.route.navigate(['/declaracao-bens/declaracoes']);
    }
    /*--- Constroi o objeto do formulario de retificação ---*/
    this.formRetificacao = fb.group({
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
      motivoRetificacao: [null, [Validators.required]],
      reciboIr: [null]
    });
  }

  /*--- Realiza funções ao iniciar a página---*/
  ngOnInit(): void {
    this.onSetValue(this.retificacao);

    /*--- controla o campo de declaração de acordo com o select de tipo ---*/
    let negativa = "Declaro, sob as penas previstas em lei, que não possuo bens passíveis de declaração a Receita Federal do Brasil,"+
     "relativamente ao ano-base preenchido acima.";
    let anual = "Declaro que..."
    this.formRetificacao.get('tipo')?.valueChanges.subscribe(value => {
      if(value == "Declaração Negativa de Bens"){
        this.dsDeclaracao = true;
        this.formRetificacao.controls['declaracao'].setValue(negativa);
      } else if(value == "Declaração Anual de Bens") {
        this.dsDeclaracao = false;
        this.formRetificacao.controls['declaracao'].setValue(anual);
      }
    })
  }

  /*--- Insere os valores da retificacao no formulario ---*/
  onSetValue(retificacao: DeclaracaoBens) {
    this.formRetificacao.patchValue({
      id: retificacao.id,
      matricula: retificacao.matricula,
      cpf: retificacao.cpf,
      nome: String(retificacao.nome).toUpperCase(),
      secretaria: retificacao.secretaria,
      email: retificacao.email,
      localTrabalho: retificacao.localTrabalho,
      exercicio: this.exercicio,
      declaracao: retificacao.declaracao
    });
  }

  /*--- Metodo com as validações de campo e envia os dados para o banco de dados---*/
  enviarRetificacao(retificacao:DeclaracaoBens){
    const confirmacao = document.getElementById('confirmacao') as HTMLInputElement
    if(!confirmacao.checked){
      AppComponent.openSwal({message:"Confirme que as informações são verdadeiras"});
      confirmacao.focus();
    } else if (this.formRetificacao.invalid){
      AppComponent.openSwal({message:"Preencha todos os campos"});
    } else if (this.formRetificacao.controls['declaracao'].value == 'Declaro que...'){
      AppComponent.openSwal({message:"Informe a declaração"});
    } else if(String(this.formRetificacao.controls['motivoRetificacao'].value).length < 4){
      AppComponent.openSwal({message:"Motivo de retificação muito curto"});
    }else {
      const ano = new Date().getFullYear();
      if(this.exercicio != (ano-1) && this.exercicio != (ano-2)){
        retificacao.tipo = "Declaração de Ex-Servidor"
      }
      this.declaracaoService.saveDeclaracao(retificacao).subscribe(
        (res) => {
          this.route.navigate(['/declaracao-bens/protocolo/', this.exercicio], {relativeTo: this.rotaAtual, state:{data: res}})
          this._snackBar.open(`Retificação de ${this.exercicio} enviada com sucesso!`,"OK",{duration: 2000,});
        },
        (error)=> {
          AppComponent.openSwal({message:"Erro ao enviar informações", text: error.error.message});
        })
    }
  }


}
