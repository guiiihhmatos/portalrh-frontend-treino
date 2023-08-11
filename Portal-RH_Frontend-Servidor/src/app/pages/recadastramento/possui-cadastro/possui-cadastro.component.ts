import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ServidorService } from './../../../services/recadastramento/servidor/servidor.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-possui-cadastro',
  templateUrl: './possui-cadastro.component.html',
  styleUrls: ['./possui-cadastro.component.scss']
})
export class PossuiCadastroComponent {

  matricula : string = ''
  cpf : string = ''

  servidor : string = ''
  protocolo : string = ''
  nome : string = ''
  dataEnvio : any

  statusValidacao = ''
  motivoInvalidacao = ''

  constructor
  (
    private sevidorService : ServidorService,
    private authService : AuthService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private CookieService : CookieService
  )
  {

  }

  ngOnInit(): void {

    this.getOneServidor()
  }

  getOneServidor()
  {

    this.matricula = this.authService.getMatricula()
    this.cpf = this.authService.getCpf()
    let exercicio = new Date().getFullYear()

    this.sevidorService.getProtocolo(Number(this.matricula), this.cpf, exercicio).subscribe(value => {

      this.servidor = value

      this.statusValidacao = value.statusValidacao
      this.motivoInvalidacao = value.motivoInvalidacao

      if(this.statusValidacao == 'Inválido')
      {
        var div = document.getElementsByTagName('div')[7]
        div.classList.remove('card-header-green')
        div.classList.add('card-header-red')
      }

      this.protocolo = String(value.id + '2023').padStart(8,"0");

      this.dataEnvio = value.dtAtualizacao
      this.nome = value.nome

    })
  }

  redirectToForm()
  {
    this.rota.navigate(['/recadastramento/formulario'], {relativeTo: this.rotaAtual, state: {data: true}})
  }

  redirectToPDF(protocolo : any, nome : any, matricula : any, dataEnvio : any){

    let objeto = [

      {
      'nome' : nome,
      'matricula' : matricula
      },
      dataEnvio,
      protocolo
    ]

    this.rota.navigate(['/recadastramento/imprimir-protocolo', this.protocolo ], {relativeTo: this.rotaAtual, state:{data: objeto}})
  }

}
