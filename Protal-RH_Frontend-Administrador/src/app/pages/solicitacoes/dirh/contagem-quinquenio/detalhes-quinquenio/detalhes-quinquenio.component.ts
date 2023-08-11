import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ContagemQuinquenioService } from 'src/app/services/solicitacoes/dirh/contagem-quinquenio/contagem-quinquenio.service';

@Component({
  selector: 'app-detalhes-quinquenio',
  templateUrl: './detalhes-quinquenio.component.html',
  styleUrls: ['./detalhes-quinquenio.component.scss']
})
export class DetalhesQuinquenioComponent {

  id : any
  nomeServidor !: string
  matriculaServidor !: number
  concluido !: boolean
  andamentos : any[] = []

  servidor : FormGroup
  motivo : FormGroup

  motivoInput : any
  message : string = ''

  containerNome = true;
  containerInfo = false;
  containerAndamento = false

  valArrowLeft = false;
  valArrowRight = true;

  constructor
  (
    private formBuilder : FormBuilder,
    private location : Location,
    private authService : AuthService,
    private contagemService : ContagemQuinquenioService,
    private _snackBar: MatSnackBar,
  )
  {
    this.id = history.state.data

    this.servidor = this.formBuilder.group({

      id: [null, [Validators.required]],
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      secretaria: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      dtPedido: [null, [Validators.required]],
      periodo: [null, [Validators.required]],
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

    this.contagemService.getSolicitacaoByID(this.id).subscribe(res => {
      this.servidor.patchValue({

        id: res.id,
        matricula: res.matricula,
        cpf: res.cpf,
        nome: res.nome,
        endereco: res.endereco,
        bairro: res.bairro,
        municipio: res.municipio,
        cargo: res.cargo,
        secretaria: res.secretaria,
        telefone: res.telefone,
        dtPedido: date.transform(res.dtPedido, 'dd/MM/yyyy HH:mm'),
        periodo: res.periodo,
        concluido: res.concluido? "Conluído" : "Em aberto",
        andamento: res.andamento,

      })

      this.nomeServidor = res.nome
      this.concluido = res.concluido
      this.andamentos = res.andamento
      this.matriculaServidor = res.matricula



    })

  }

  arrowActive(direcao : string)
  {
    if(direcao == 'right')
    {
      this.valArrowLeft = true;
      this.valArrowRight = false
      this.containerInfo = true
      this.containerNome = false
    }
    else
    {
      this.valArrowLeft = false;
      this.valArrowRight = true
      this.containerInfo = false
      this.containerNome = true
    }
  }

  adicionarAndamento()
  {
    let objeto = {"idSolicitacao" : 0, "observacao": "","atendente" : '', "servidor": 0}

    objeto.idSolicitacao = this.id
    objeto.observacao = this.motivoInput
    objeto.atendente = this.authService.getLogin()
    objeto.servidor = this.matriculaServidor

    this.contagemService.onAddAndamento(objeto).subscribe({

      next: (res) => {
        this.message = 'Andamento adicionado com sucesso !'
        this.onSetValue()
        this._snackBar.open(this.message, '', {duration: 3000});

      },
      error: () => {
        this.message = 'Erro ao adicionar andamento !';
        this.onError();
      }
    })

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
