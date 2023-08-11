import { ProtocoloDeclaracaoBens } from '../../../models/declaracao-bens/protocolo-declaracao-bens.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from './../../../models/servidor/servidor.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeclaracaoService } from './../../../services/declaracao-bens/declaracao/declaracao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-declarada',
  templateUrl: './declarada.component.html',
  styleUrls: ['./declarada.component.scss']
})
export class DeclaradaComponent implements OnInit{

  protocolo: any
  servidor: Servidor
  exercicio: number;
  constructor(
    private declaracaoService: DeclaracaoService,
    private auth: AuthService,
    private rotaAtual: ActivatedRoute,
    private rota: Router,
    ){
    /*--- aplica na variavel os dados do servidor do cookie de acordo com o login ---*/
    this.servidor = JSON.parse(auth.getServidor());
    /*--- aplica na variavel o exercicio do formulario passado na URL---*/
    this.exercicio = Number(this.rotaAtual.snapshot.paramMap.get('exercicio'));
  }

  /*--- Realiza funções ao iniciar a página ---*/
  ngOnInit(): void {
    const matricula = this.servidor.matricula;
    const cpf = this.servidor.cpf;

    this.getProtocolo(matricula, cpf, this.exercicio)
  }


  /*--- Busca o protocolo de acordo com o exercício ---*/
  getProtocolo(matricula: number, cpf:string, exercicio: number){
    this.declaracaoService.getProtocolo(matricula, cpf, exercicio).subscribe((res) =>{
      this.protocolo = res;
      this.protocolo as ProtocoloDeclaracaoBens;
    })
  }

  /*--- Redireciona para página de retificação ---*/
  redirectToRetificacao(protocolo: ProtocoloDeclaracaoBens){
    if(this.exercicio == new Date().getFullYear()){
      this.rota.navigate(['/declaracao-bens/retificacao/exoneracao'],{relativeTo: this.rotaAtual, state:{data: protocolo}})
    } else {
      this.rota.navigate(['/declaracao-bens/retificacao/', this.exercicio], {relativeTo: this.rotaAtual, state:{data: protocolo}})
    }
  }

  redirectToPDF(){
    this.rota.navigate(['/declaracao-bens/imprimir-protocolo/', this.protocolo.id ], {relativeTo: this.rotaAtual, state:{data: this.protocolo}})
  }


}
