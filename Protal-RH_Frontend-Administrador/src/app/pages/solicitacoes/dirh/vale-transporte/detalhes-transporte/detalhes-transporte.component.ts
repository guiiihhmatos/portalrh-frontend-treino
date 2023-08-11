import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ValeTransporteService } from 'src/app/services/solicitacoes/dirh/vale-transporte/vale-transporte.service';

@Component({
  selector: 'app-detalhes-transporte',
  templateUrl: './detalhes-transporte.component.html',
  styleUrls: ['./detalhes-transporte.component.scss']
})
export class DetalhesTransporteComponent {

  idServidor : number
  concluido !: boolean
  nomeServidor !: string
  matricula !: string
  dtConcluido : any
  message = ''
  matriculaServidor !: number


  servidor : FormGroup
  motivo : FormGroup
  motivoCancelar : FormGroup

  motivoInput !: any
  motivoInputCancelamento !: any

  andamentos : any[] = []
  empresas : any[] = []

  containerNome = true;
  containerInfo = false;
  containerAndamento = false
  containerEmpresas = false
  pagina = 1

  valArrowLeft = false;
  valArrowRight = true;

  /* lista de arquivos do servidor */
  arquivos : any[] = []

  arquivoSelecionado : any

  /* url pdf */

  url : any
  type : any

  constructor
  (
    private valeService : ValeTransporteService,
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
      localTrabalho: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      operacao: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      numeroEndereco: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      complementoEndereco: [null, [Validators.required]],
      cartaoTransporte: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
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

    this.valeService.getSolicitacaoById(this.idServidor).subscribe(res => {
      this.servidor.patchValue({

        id: res.id,
        matricula: res.matricula,
        cpf: res.cpf,
        rg: res.rg,
        nome: res.nome,
        localTrabalho: res.localTrabalho,
        cargo: res.cargo,
        operacao: res.operacao,
        cep: res.cep,
        endereco: res.endereco,
        bairro: res.bairro,
        municipio: res.municipio,
        numeroEndereco: res.numeroEndereco,
        complementoEndereco: res.complementoEndereco,
        cartaoTransporte: res.cartaoTransporte,
        dtPedido: date.transform(res.dtPedido, 'dd/MM/yyyy HH:mm'),
        dtConcluido: date.transform(res.dtConcluido, 'dd/MM/yyyy HH:mm'),
        concluido: res.concluido? "Conluído" : "Em aberto",
        andamento: res.andamento,

      })

      this.nomeServidor = res.nome
      this.concluido = res.concluido
      this.matricula = res.matricula
      this.matriculaServidor = res.matricula
      this.andamentos = res.andamento
      this.empresas = res.empresas
      this.dtConcluido = res.dtConcluido


        this.valeService.getAllFilesServidor(res.matricula).subscribe(value => {

          this.arquivos = value

        })

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
            this.containerEmpresas = false
            break;

          case 4:
            this.pagina --
            this.containerEmpresas = true
            this.containerAndamento = false
            this.valArrowRight = true;
            break;

        }
      }
      else
      {
        switch(this.pagina)
        {
          case 2:
            this.pagina ++
            this.containerInfo = false
            this.containerEmpresas = true
            break;

          case 3:
            this.pagina ++
            this.containerEmpresas = false
            this.containerAndamento = true
            this.valArrowRight = false;
            break;
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

    this.valeService.onAddAndamento(objeto).subscribe(res => {

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

    this.valeService.onconcluido(objeto).subscribe(res => {

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

    this.valeService.onCancelar(objeto).subscribe({
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


  verArquivo(urlDownload : any, tipo : string)
  {

    this.valeService.getSelectedFile(urlDownload).subscribe((res) => {

      var contentDisposition = res.headers.get('content-disposition')

      this.type = res.body.type

      if(contentDisposition != null)
      {
        var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
      }

      if(tipo == 'visualizar')
      {
        this.viewFile(res)
      }
      else
      {
        this.downloadFile(res)
      }




    })
  }

  viewFile(response : any) {
    let header_content = response.headers.get('content-disposition');
    let file = header_content.split('=')[1];
    file = file.substring(1, file.length);
    let extension = file.split('.')[1];

    var newBlob = new Blob([response.body], { type: this.createFileType(extension)})

    var fileURL = URL.createObjectURL(newBlob)

      window.open(fileURL)
  }

  downloadFile(response : any) {
    let header_content = response.headers.get('content-disposition');
    let file = header_content.split('=')[1];
    file = file.substring(1, file.length);
    let extension = file.split('.')[1];

    var newBlob = new Blob([response.body], { type: this.createFileType(extension)})

    var link = document.createElement('a')
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download = file;
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 400)
  }

  createFileType(e : any): string {
    let fileType: string = "";
    if (e == 'pdf' || e == 'csv') {
      fileType = `application/${e};base64`;
    }
    else if (e == 'jpeg' || e == 'jpg' || e == 'png') {
      fileType = `image/${e};base64`;
    }

    return fileType;
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
