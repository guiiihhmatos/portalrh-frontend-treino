import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LicencaSemVencimentoService } from 'src/app/services/solicitacoes/digp/licenca-sem-vencimento/licenca-sem-vencimento.service';

@Component({
  selector: 'app-detalhes-licenca-sem-vencimento',
  templateUrl: './detalhes-licenca-sem-vencimento.component.html',
  styleUrls: ['./detalhes-licenca-sem-vencimento.component.scss']
})
export class DetalhesLicencaSemVencimentoComponent {

  idServidor : number
  concluido !: boolean
  nomeServidor !: string
  dtConcluido : any
  message = ''
  matriculaServidor !: number


  servidor : FormGroup
  motivo : FormGroup

  motivoInput !: any

  andamentos : any[] = []

  containerNome = true;
  containerInfo = false;
  containerAndamento = false
  pagina = 1

  valArrowLeft = false;
  valArrowRight = true;

  servidorInfo : any

  constructor
  (
    private lsvService : LicencaSemVencimentoService,
    private formBuilder : FormBuilder,
    private location : Location,
    private authService : AuthService,
    private _snackBar: MatSnackBar,
    private router : Router
  )
  {
    this.idServidor = history.state.data

    this.servidor = this.formBuilder.group({

      id: [null, [Validators.required]],
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      rg: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      secretaria: [null, [Validators.required]],
      localTrabalho: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      conteudo: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      numeroEndereco: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      complementoEndereco: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      dtPedido: [null, [Validators.required]],
      dtConcluido: [null, [Validators.required]],
      concluido: [null, [Validators.required]],
      andamento: [null, [Validators.required]],

    })

    this.motivo = this.formBuilder.group({

      motivoAndamento : [null, [Validators.required]],

    })

  }

  ngOnInit()
  {
    this.onSetValue()
  }

  onSetValue()
  {

    let date = new DatePipe('en-US')

    this.lsvService.getAllsSolicitacoesById(this.idServidor).subscribe(res => {

      this.servidor.patchValue({

        id: res.id,
        matricula: res.matricula,
        cpf: res.cpf,
        rg: res.rg,
        nome: res.nome,
        secretaria: res.secretaria,
        localTrabalho: res.localTrabalho,
        cargo: res.cargo,
        cep: res.cep,
        endereco: res.endereco,
        bairro: res.bairro,
        municipio: res.municipio,
        numeroEndereco: res.numeroEndereco,
        complementoEndereco: res.complementoEndereco,
        conteudo: res.conteudo,
        dtPedido: date.transform(res.dtPedido, 'dd/MM/yyyy HH:mm'),
        dtConcluido: date.transform(res.dtConcluido, 'dd/MM/yyyy HH:mm'),
        concluido: res.concluido? "Conluído" : "Em aberto",
        andamento: res.andamento,

      })

      this.nomeServidor = res.nome
      this.concluido = res.concluido
      this.andamentos = res.andamento
      this.dtConcluido = res.dtConcluido
      this.matriculaServidor = res.matricula

      this.servidorInfo = res

    })

  }

  arrowActive(direcao : string)
  {
    if(this.pagina == 1)
    {
      this.pagina++
      this.valArrowLeft = true;
      this.containerInfo = true
      this.containerNome = false
      this.containerAndamento = false
    }
    else
    {
      if(direcao == 'left')
      {
        switch(this.pagina)
        {
          case 2:
            this.pagina --
            this.valArrowLeft = false
            this.containerInfo = false
            this.containerNome = true
            break;

          case 3:
            this.pagina --
            this.containerInfo = true
            this.containerAndamento = false
            this.valArrowRight = true;
            break;

        }
      }
      else
      {
        if(this.pagina == 2)
        {
          this.pagina ++
          this.containerInfo = false
          this.containerAndamento = true
          this.valArrowRight = false;
        }
      }

    }

  }

  adicionarAndamento()
  {
    let objeto = {"idSolicitacao" : 0, "observacao": "","atendente" : '', "servidor": 0}

    objeto.idSolicitacao = this.idServidor
    objeto.observacao = this.motivoInput
    objeto.atendente = this.authService.getLogin()
    objeto.servidor = this.matriculaServidor

    this.lsvService.onAddAndamento(objeto).subscribe(res => {

      this.message = 'Andamento adicionado com sucesso !'
      this.onSetValue()
      this._snackBar.open(this.message, '', {duration: 3000});
    },
    (error) => {
      this.message = 'Erro ao adicionar andamento !';
      this.onError();
    })
  }

  marcarComoconcluido()
  {
    let objeto = {"id" : 0, "nome": ""}

    objeto.id = this.idServidor
    objeto.nome = this.authService.getLogin()

    this.lsvService.onCheckSolicitacao(objeto).subscribe(res => {

      this.message = 'Solicitação marcada como concluída !'
      this.onSuccess()
    },
    (error) => {
      this.message = 'Erro ao marcar solicitação como concluída !';
      this.onError();
    })
  }

  redirectDetails(servidor : any)
  {
    this.router.navigate(['solicitacoes/digp/licenca-sem-vencimento/pdf'], {state:{data: servidor}})
  }

  backUrl()
  {
    this.location.back()
  }

  onSuccess()
  {
    this._snackBar.open(this.message, '', {duration: 3000});
    this.backUrl();
  }

  private onError()
  {
    this._snackBar.open(this.message, '', {duration: 3000});
  }


}
