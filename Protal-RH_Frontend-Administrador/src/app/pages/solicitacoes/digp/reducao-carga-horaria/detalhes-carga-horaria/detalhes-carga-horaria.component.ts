import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReducaoCargaHorariaService } from 'src/app/services/solicitacoes/digp/reducao-carga-horaria/reducao-carga-horaria.service';

@Component({
  selector: 'app-detalhes-carga-horaria',
  templateUrl: './detalhes-carga-horaria.component.html',
  styleUrls: ['./detalhes-carga-horaria.component.scss']
})
export class DetalhesCargaHorariaComponent {

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

  /* lista de arquivos do servidor */
  arquivos : any[] = []

  arquivoSelecionado : any

  /* url pdf */

  url : any
  type : any

  servidorPdf : any

  constructor
  (
    private rchService : ReducaoCargaHorariaService,
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
      tipo: [null, [Validators.required]],
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

    this.rchService.getAllsSolicitacoesById(this.idServidor).subscribe(res => {

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

      this.servidorPdf = res
      this.matriculaServidor = res.matricula

      this.rchService.getAllFilesServidor(res.matricula).subscribe(value => {

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

    this.rchService.onAddAndamento(objeto).subscribe(res => {

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

    this.rchService.onCheckSolicitacao(objeto).subscribe(res => {

      this.message = 'Solicitação marcada como concluída !'
      this.onSuccess()
    },
    (error) => {
      this.message = 'Erro ao marcar solicitação como concluída !';
      this.onError();
    })
  }

  verArquivo(urlDownload : any, tipo : string)
  {

    this.rchService.getSelectedFile(urlDownload).subscribe((res) => {

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
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should

    var newBlob = new Blob([response.body], { type: this.createFileType(extension)})

    var fileURL = URL.createObjectURL(newBlob)

      window.open(fileURL)
  }

  downloadFile(response : any) {
    let header_content = response.headers.get('content-disposition');
    let file = header_content.split('=')[1];
    file = file.substring(1, file.length);
    let extension = file.split('.')[1];
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should

    var newBlob = new Blob([response.body], { type: this.createFileType(extension)})


    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.

    // const url = window.URL.createObjectURL(newBlob);
    //             window.open(url, '_blank');

                var link = document.createElement('a')
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download = file;
    link.click();
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
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

  redirectDetails(servidor : any)
  {
    this.router.navigate(['solicitacoes/digp/reducao-carga-horaria/pdf'], {state:{data: servidor}})
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
