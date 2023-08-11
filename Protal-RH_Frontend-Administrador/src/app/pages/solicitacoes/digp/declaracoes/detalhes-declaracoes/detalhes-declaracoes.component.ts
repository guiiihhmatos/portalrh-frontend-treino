import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeclaracoesGeralService } from 'src/app/services/solicitacoes/digp/declaracoes-geral/declaracoes-geral.service';

@Component({
  selector: 'app-detalhes-declaracoes',
  templateUrl: './detalhes-declaracoes.component.html',
  styleUrls: ['./detalhes-declaracoes.component.scss']
})
export class DetalhesDeclaracoesComponent {

  idServidor : number
  concluido !: boolean
  nomeServidor !: string
  dtConcluido : any
  message = ''
  matriculaServidor !: number


  servidor : FormGroup
  motivo : FormGroup
  motivoCancelar : FormGroup

  motivoInput !: any
  motivoInputCancelamento !: any

  andamentos : any[] = []

  containerNome = true;
  containerInfo = false;

  valArrowLeft = false;
  valArrowRight = true;

  arrayFiles: File[] = [];

  constructor
  (
    private declaracoesService : DeclaracoesGeralService,
    private formBuilder : FormBuilder,
    private location : Location,
    private authService : AuthService,
    private _snackBar: MatSnackBar
  )
  {
    this.idServidor = history.state.data

    this.servidor = this.formBuilder.group({

      id: [null, [Validators.required]],
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      rg: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      dtPedido: [null, [Validators.required]],
      dtConcluido: [null, [Validators.required]],
      concluido: [null, [Validators.required]],
      andamento: [null, [Validators.required]],

    })

    this.motivo = this.formBuilder.group({

      motivoAndamento : [null, [Validators.required]],

    })

    this.motivoCancelar = this.formBuilder.group({

      motivoCancelamento : [null, [Validators.required]],

    })


  }

  ngOnInit()
  {
    this.onSetValue()
  }

  onSetValue()
  {

    let date = new DatePipe('en-US')

    this.declaracoesService.getAllsSolicitacoesById(this.idServidor).subscribe(res => {

      this.servidor.patchValue({

        id: res.id,
        matricula: res.matricula,
        cpf: res.cpf,
        rg: res.rg,
        nome: res.nome,
        telefone: res.telefone,
        email: res.email,
        tipo: res.tipo,
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

  addFile(event: any) {
    const file: File = event.target.files[0];
    const size = file.size;
    const type = file.type;

    if (size > 2516582.4) {
      let enviado = (size / 1000000).toFixed(2).toString().replace(".",",") + "MB";
      AppComponent.openSwal({message:"Arquivo não anexado", text: "tamanho de "+enviado+" maior do que o permitido"});
      event.target.value = ''
      return
    } else if (type != "application/pdf" && type!= "image/jpeg" && type != "image/png"){
      AppComponent.openSwal({message:"Arquivo não anexado", text: "tipo \"."+type.slice(type.indexOf("/")+1) +"\" inválido"});
      event.target.value = ''
      return
    }

    //remove o arquivo do array caso ja anexado anteriormente
    this.arrayFiles.forEach((file) => {
      if (file.name.slice(0, file.name.indexOf('.')) === file.name) {
        this.arrayFiles.splice(this.arrayFiles.indexOf(file), 1);
      }
    });

    this.arrayFiles.push(file);
  }

  adicionarAndamento()
  {
    let objeto = {"idSolicitacao" : 0, "observacao": "","atendente" : '', "servidor": 0}

    objeto.idSolicitacao = this.idServidor
    objeto.observacao = this.motivoInput
    objeto.atendente = this.authService.getLogin()
    objeto.servidor = this.matriculaServidor

    this.declaracoesService.onAddAndamento(objeto, this.arrayFiles).subscribe(res => {

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

    this.declaracoesService.onCheckSolicitacao(objeto).subscribe(res => {

      this.message = 'Solicitação marcada como concluída !'
      this.onSuccess()
    },
    (error) => {
      this.message = 'Erro ao marcar solicitação como concluída !';
      this.onError();
    })
  }

  cancelarSolicitacao()
  {
    let objeto = {"id": 0, "login": "", "motivo" : ""}

    objeto.id = this.idServidor
    objeto.login = this.authService.getLogin()
    objeto.motivo = this.motivoInputCancelamento

    this.declaracoesService.onCancelar(objeto).subscribe({
      next: () => {
        this.message = "Solicitação Cancelada"
        this.onSuccess()
      },
      error: () => {
        this.message = "Erro ao cancelar solicitação"
        this.onError()
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
