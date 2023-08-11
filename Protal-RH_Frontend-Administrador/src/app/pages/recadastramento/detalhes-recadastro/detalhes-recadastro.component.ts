import { InfoServidorService } from './../../../services/recadastramento/info-servidor/info-servidor.service';
import { ListaService } from './../../../services/recadastramento/lista/lista.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalhes-recadastro',
  templateUrl: './detalhes-recadastro.component.html',
  styleUrls: ['./detalhes-recadastro.component.scss']
})
export class DetalhesRecadastroComponent {

  valNome = false
  valNomeSocial = false
  valRacaCor = false
  valTelefone = false
  valEstadoCivil = false
  valGrauInstrucao = false
  valNomeConjuge = false
  nomeConjugeVal = false
  formacaoSuperior = false
  valEmail = false
  valCep = false
  valMunicipio = false
  valBairro = false
  valEndereco = false
  valComplementoEndereco = false
  valNumeroEndereco = false
  valFormacaoSuperior = false


  servidorPassed : any
  servidor : FormGroup
  motivo : FormGroup

  nomeServidor !: string

  alteracoes : any[] = []
  alteracoesManual : any[] = []
  alteracoesAuto : any[] = []

  grauInstrucao : any
  estadoCivil : any
  raca : any

  user : any

  messageError = false


  /* paginator */

  pagina = 1;
  containerNome = true;
  containerInfo = false;
  containerCep = false;
  containerAlteracoes = false;
  containerDependentes = false

  valArrowLeft = false;
  valArrowRight = true;

  /* variaveis do servidor */
  statusValidacao : any
  dtValidacao : any
  validador : string = ''
  motivoInvalidacao : string = ''

  teste : any

  /* messagem para erro ou não da validação */
  message : string = ''

  /* lista de arquivos do servidor */
  arquivos : any[] = []

  arquivoSelecionado : any

  /* url pdf */

  url : any
  type : any


  classNome = '' || {}
  classNomeSocial = ''
  classRacaCor = ''
  classTelefone = ''
  classEstadoCivil = ''
  classGrauInstrucao = ''
  classFormacaoSuperior = ''
  classNomeConjuge = ''
  classEmail = ''
  classCep = ''
  classMunicipio = ''
  classBairro = ''
  classEndereco = ''
  classComplementoEndereco = ''
  classNumeroEndereco = ''

  /* array de dependentes */

  dependentes : any[] = []

  dtNascimento : any

  municipio : any

  cor = '#ffff8f'
  corCinza = '#eeeeee'
  corTexto = '000000'

  xto = false

  contador = 0

  objServidor : any

  constructor
  (
    private formBuilder: FormBuilder,
    private location : Location,
    private listasService : ListaService,
    private adminService : InfoServidorService,
    private _snackBar: MatSnackBar,
    private authService : AuthService,
    private cookieService: CookieService

  )
  {
    this.servidorPassed = history.state.data;


    this.servidor = this.formBuilder.group({

      alteracoes: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      complementoEndereco: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      deficiente: [null, [Validators.required]],
      dependentes: [null, [Validators.required]],
      dependentesList: [null, [Validators.required]],
      dtAtualizacao: [null, [Validators.required]],
      email: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      estadoCivil: [this.estadoCivil, [Validators.required]],
      exercicio: [null, [Validators.required]],
      grauInstrucao: [this.grauInstrucao, [Validators.required]],
      formacaoSuperior: [this.grauInstrucao, [Validators.required]],
      localTrabalho: [null, [Validators.required]],
      matricula: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      nomeConjuge: [null, [Validators.required]],
      nomeSocial: [null, [Validators.required]],
      numeroEndereco: [null, [Validators.required]],
      observacaoDeficiencia: [null, [Validators.required]],
      racaCor: [null, [Validators.required]],
      secretaria: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      tipoLogradouro: [null, [Validators.required]],
      dtNascimento: [null, [Validators.required]],
      rg: [null, [Validators.required]],

    });

    this.motivo = this.formBuilder.group({
      motivoInvalidar: [null, [Validators.required]],
    })


    // this.nomeServidor = this.servidorPassed.nome

  }

  ngOnInit(): void {

    this.adminService.getAllServidorByID(this.servidorPassed.id).subscribe(res => {

      this.objServidor = res
      this.nomeServidor = res.nome
      this.getColor()
      this.getColorTexto()
      this.getInfos()
      this.getUser()
      this.alteracoesInput()

    })


  }

  onSetValue(estadoCivil : any, grauInstrucao : any, racaCor : any)
  {

    let date = new DatePipe('en-US')

    this.adminService.getAllServidorByID(this.servidorPassed.id).subscribe(res => {

      this.listasService.getMunicipiosByCode(res.municipio).subscribe(value => {

        this.municipio = value

        this.servidor.patchValue({
          alteracoes: res.alteracoes,
          bairro: res.bairro,
          cargo: res.cargo,
          cep: res.cep,
          complementoEndereco: res.complementoEndereco,
          cpf: res.cpf,
          deficiente: res.deficiente,
          dependentes: res.dependentes,
          dependentesList: res.dependentesList,
          dtAtualizacao: res.dtAtualizacao.slice(0, 10),
          email: res.email,
          endereco: res.tipoLogradouro + ' ' + res.endereco,
          estadoCivil: estadoCivil,
          exercicio: res.exercicio,
          grauInstrucao: grauInstrucao,
          formacaoSuperior: res.formacaoSuperior,
          localTrabalho: res.localTrabalho,
          matricula: res.matricula,
          municipio: this.municipio.nome,
          nome: res.nome,
          nomeConjuge: res.nomeConjuge,
          nomeSocial: res.nomeSocial,
          numeroEndereco: res.numeroEndereco,
          observacaoDeficiencia: res.observacaoDeficiencia,
          racaCor: racaCor,
          secretaria: res.secretaria,
          telefone: res.telefone,
          tipoLogradouro: res.tipoLogradouro,
          dtNascimento: date.transform(res.dtNascimento, 'dd/MM/yyyy'),
          rg: res.rg,
        });
      })


      if(res.nomeConjuge == null || res.nomeConjuge == '' || res.nomeConjuge == undefined)
      {
        this.nomeConjugeVal = false
      }
      else
      {
        this.nomeConjugeVal = true
      }

      if(grauInstrucao == "Educação superior completa" || grauInstrucao == "Pós-graduação completa" || grauInstrucao == "Mestrado completo" || grauInstrucao == "Doutorado completo")
      {
        this.formacaoSuperior = true
      }
      else
      {
        this.formacaoSuperior = false
      }

      this.dependentes = res.dependentes


      this.dtValidacao = res.dtValidacao
      this.statusValidacao = res.statusValidacao

      console.log(this.statusValidacao)
      this.validador = res.validador
      this.motivoInvalidacao = res.motivoInvalidacao

      this.getAllFilesServidor()

    })


  }

  backUrl()
  {
    this.location.back()
  }

  alteracoesInput()
  {

    if(this.cor != '#ffff8f')
    {
      this.cookieService.delete('cookie-cor')
      this.cookieService.set('cookie-cor', this.cor, 0.5, '/')
    }

    if(this.corTexto != '#000000')
    {
      this.cookieService.delete('cookie-corTexto')
      this.cookieService.set('cookie-corTexto', this.corTexto, 0.5, '/')
    }


    let inputNome = document.getElementById('nome')

    this.alteracoes = []
    let alteracao = this.objServidor.alteracoes.split(';')

      this.alteracoes = alteracao
      this.alteracoes.pop()

    for(const element of this.alteracoes)
    {

      if(element.toUpperCase().trim().split(':')[0] != 'DEPENDENTE NOVO' && element.toUpperCase().trim() != 'QUANTIDADE DEPENDENTES' && element.toUpperCase().trim().split(' ')[0] != 'MOTIVO')
      {
        this.alteracoesAuto.push(element)
      }
      else
      {
        this.alteracoesManual.push(element)
      }

      switch(element.trim())
      {
        case 'nome': // ----- case ----- //

          this.classNome = 'backInput'

          this.valNome = true

          break;

          case 'nome social': // ----- case ----- //

          this.classNomeSocial = 'backInput'

          this.valNomeSocial = true

          break;

          case 'raça-cor': // ----- case ----- //

          this.classRacaCor = 'backInput'

          this.valRacaCor = true

          break;

          case 'telefone': // ----- case ----- //

          this.classTelefone = 'backInput'

          this.valTelefone = true

          break;

          case 'email': // ----- case ----- //

          this.classEmail = 'backInput'

          this.valEmail = true

          break;

          case 'conjuge': // ----- case ----- //

          this.classNomeConjuge = 'backInput'

          this.valNomeConjuge = true

          break;

          case 'estado civil': // ----- case ----- //

          this.classEstadoCivil = 'backInput'

          this.valEstadoCivil = true

          break;

          case 'endereço': // ----- case ----- //

          this.classEndereco = 'backInput'

          this.valEndereco = true

          break;

          case 'número endereço': // ----- case ----- //

          this.classNumeroEndereco = 'backInput'

          this.valNumeroEndereco = true

          break;

          case 'complemento endereço': // ----- case ----- //

          this.classComplementoEndereco = 'backInput'

          this.valComplementoEndereco = true

          break;

          case 'bairro': // ----- case ----- //

          this.classBairro = 'backInput'

          this.valBairro = true

          break;

          case 'município': // ----- case ----- //

          this.classMunicipio = 'backInput'

          this.valMunicipio = true

          break;

          case 'grau instrução': // ----- case ----- //

          this.classGrauInstrucao = 'backInput'

          this.valGrauInstrucao = true

          break;

          case 'formacaoSuperior': // ----- case ----- //

          this.classFormacaoSuperior = 'backInput'

          this.valFormacaoSuperior = true

          break;

          case 'cep': // ----- case ----- //

          this.classCep = 'backInput'

          this.valCep = true

          break;
      }

    }

  }

  arrowActive(direcao : string)
  {

    if(this.pagina == 1)
    {
      this.pagina++
      this.valArrowLeft = true;
      this.containerInfo = true
      this.containerNome = false
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
            this.containerCep = false
            break;

          case 4:

            if(this.objServidor.dependentes.length == 0)
            {
              this.pagina --
              this.containerCep = true
              this.containerAlteracoes = false
              this.valArrowRight = true
            }
            else
            {
              this.pagina --
              this.containerCep = true
              this.containerDependentes = false
            }

            break;

            case 5:
            this.pagina --
            this.containerDependentes = true
            this.containerAlteracoes = false
            this.valArrowRight = true
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
            this.containerCep = true
            break;

          case 3:
            if(this.objServidor.dependentes.length == 0)
            {
              this.pagina ++
              this.containerAlteracoes = true
              this.containerCep = false
              this.valArrowRight = false
            }
            else
            {
              this.pagina ++
              this.containerDependentes = true
              this.containerCep = false
            }

            break;

            case 4:
            this.pagina ++
            this.containerAlteracoes = true
            this.containerDependentes = false
            this.valArrowRight = false
            break;

        }
      }

    }

  }

  getInfos()
  {

    this.listasService.getRacaCor().subscribe(value => {

      value.forEach(element => {

        let numero = Number(element.chave)

        if(numero == this.objServidor.racaCor)
        {
          this.raca = element.descricao
        }
      });

      this.listasService.getEstadoCivil().subscribe(value => {

        value.forEach(element => {

          let numero = Number(element.chave)



          if(numero == this.objServidor.estadoCivil)
          {
            this.estadoCivil = element.descricao

          }
        });

        this.listasService.getGrauInstrucao().subscribe(value => {

          value.forEach(element => {

            let numero = Number(element.chave)

            if(numero == this.objServidor.grauInstrucao)
            {
              this.grauInstrucao = element.descricao

            }
          });

          this.onSetValue(this.estadoCivil,this.grauInstrucao,this.raca)

        })

      })

    })

  }

  validarServidor()
  {
    this.adminService.putValidar(this.servidorPassed.id, this.user).subscribe({

      next: () => {
        this.message = 'Recadastramento validado'
        this.onSuccess()
      },
      error: () => {
        this.message = 'Erro ao validar Recadastramento';
        this.onError();
      }
    })

  }

  naoValidarServidor()
  {

    let objeto =
    {
      'validador' : this.user,
      'motivo' : this.teste
    }

    if(this.teste == '' || this.teste == undefined)
    {
      this.messageError = true

      this.message = 'Informe um motivo';
      this.onError();
    }
    else if(this.teste.length < 5)
    {
      this.messageError = true

      this.message = 'Motivo muito curto';
      this.onError();
    }
    else
    {
      this.adminService.putInvalidar(this.servidorPassed.id, objeto).subscribe({

        next : () => {
          this.message = 'Recadastramento invalidado'
          this.onSuccess()
        },
        error : () => {
          this.message = 'Erro ao invalidar Recadastramento';
          this.onError();
        }

      })
    }


  }

  getAllFilesServidor()
  {
    this.adminService.getAllFilesServidor(this.objServidor.matricula, this.objServidor.exercicio).subscribe(value => {

      this.arquivos = value

      console.log(this.arquivos)

    })
  }

  verArquivo(urlDownload : any, tipo : string)
  {

    this.adminService.getSelectedFile(urlDownload).subscribe((res) => {

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

  getUser()
  {
    this.user = this.authService.getLogin()
  }

  onBack()
  {
    this.location.back()
  }

  onSuccess()
  {
    this._snackBar.open(this.message, '', {duration: 3000});
    this.onBack();
  }

  private onError()
  {
    this._snackBar.open(this.message, '', {duration: 3000});
  }

  alterarCorInput()
  {
    this.alteracoesInput()

  }

  alterColorForDefault()
  {
    this.cor = '#ffff8f'
    this.corTexto = '#000000'

    this.cookieService.delete('cookie-cor')
    this.cookieService.set('cookie-cor', this.cor, 0.5, '/')
    this.cookieService.set('cookie-corTexto', this.corTexto, 0.5, '/')
  }

  getColor()
  {
    this.cor = this.cookieService.get('cookie-cor')

  }

  getColorTexto()
  {
    this.corTexto = this.cookieService.get('cookie-corTexto')

  }



}
