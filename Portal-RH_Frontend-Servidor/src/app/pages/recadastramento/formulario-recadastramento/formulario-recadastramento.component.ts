import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { Validacoes } from 'src/app/models/validacoes/validacoes.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CepService } from 'src/app/services/cep/cep.service';
import { ListasService } from 'src/app/services/listas/listas.service';
import { FileUploadService } from 'src/app/services/recadastramento/file-upload/file-upload.service';
import { ServidorService } from 'src/app/services/recadastramento/servidor/servidor.service';

@Component({
  selector: 'app-formulario-recadastramento',
  templateUrl: './formulario-recadastramento.component.html',
  styleUrls: ['./formulario-recadastramento.component.scss']
})
export class FormularioRecadastramentoComponent {
  recadastramento: FormGroup;
  dependentesForm: FormGroup;
  checkboxes: FormGroup;

  editDependenteBool = false
  dependentes: any[] = [];
  motivoRmDepArray: string[] = [];
  motivoRmDep: string = '';

  arrayAuxDependentes : any[] = []

  dtHoje = new Date();

  classes = 'form__desabilitado';

  validacao = true;

  cep: any;

  validacaoDependentes = false;

  dependentesTrue: boolean = false;

  addDependentes = false;

  protocolo: any;
  dtAtualizacao: any;

  casado: boolean = false;
  solteiro: boolean = false;

  valCep: boolean = false
  valNome: boolean = false
  valGrauInstrucao: boolean = false
  valGrauInstrucaoBotao: boolean = false
  valEstadoCivil: boolean = false
  valCurso: boolean = false
  valCasado: boolean = false
  valCursoGraduacao : boolean = false
  valFormacaoBotao : boolean = false
  nomeConjugeBotao : boolean = false
  valEstadocivilBotao: boolean = false


  idGrauInst:any;
  idInitialGrauInst:any;
  idEstadoCivil: any;
  idInitialEstadoCivil: any;

  matricula: any

  selectedFiles: any

  loading: boolean = false; // Flag variable

  fileNome!: File
  fileGrauInstrucao!: File
  fileEstadoCivil!: File
  fileCep!: File
  fileDependente!: File
  nullFile!: File
  arrayFiles: any[] = [];
  arrayFileDependentes: any[] = [];


  valEnviado = true

  auxDependente: any
  nomeDep: string = '';


  inputInitialValueNome: any;
  inputInitialValueCargo: any;
  inputInitialValueGrauInst: any;
  inputInitialValueLocalTrabalho: any;
  inputInitialValueformSuperior: any;
  inputInitialValueSecretaria: any;
  inputInitialValueEstadoCivil: any;
  inputInitialValueNomeConjuge: any;
  inputInitialValueCep: any;
  inputInitialValueEnd: any;
  inputInitialValueNEnd: any;
  inputInitialValueCompEnd: any;
  inputInitialValueMun: any;
  inputInitialValueBairro: any;
  inputInitialValueTipoLogradouro: any;

  secretarias: any[] = [];
  estado_civil: any[] = [];
  raca_cor: any[] = [];
  grau_instrucao: any[] = [];
  cursos: any[] = [];
  cidades: any[] = [];
  tiposLogradouros: any[] = [];
  servidor: any;
  refazer: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private servidorService: ServidorService,
    private cepService: CepService,
    private auth: AuthService,
    private roteador: Router,
    public rotaAtual: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private listaService: ListasService,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService,
  ) {
    this.recadastramento = this.formBuilder.group({
      matricula: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      nomeSocial: [null, [Validators.required]],
      rg: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      racaCor: [null, [Validators.required]],
      dtNascimento: [null, [Validators.required]],
      email: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      tipoLogradouro: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      numeroEndereco: [null, [Validators.required]],
      complementoEndereco: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      estadoCivil: [null, [Validators.required]],
      nomeConjuge: [null, [Validators.required]],
      grauInstrucao: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      secretaria: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      localTrabalho: [null, [Validators.required]],
      deficiente: [null, [Validators.required]],
      dependentesList: [null, [Validators.required]],
      formacaoSuperior: [null, [Validators.required]],
      motivoRmDep: [null]
    });

    this.dependentesForm = this.formBuilder.group({
      idFb: [0],
      id: [0],
      nome: [null, [Validators.required]],
      sexo: ["", [Validators.required]],
      cpf: [null, [Validators.required, Validacoes.ValidaCpf]],
      dtNascimento: [null, [Validators.required]],
    });

    this.checkboxes = this.formBuilder.group({
      termo: [false, [Validators.required]],
      autorizacao: [false, [Validators.required]]
    });

    this.refazer = history.state.data!=null?history.state.data!=null:false;
  }

  ngOnInit(): void {
    //--- Get nas Listas ----
    this.getServidorByLogin();
    this.getSecretarias();
    this.getEstadoCivil();
    this.getRacaCor();
    this.getGrauInstrucao();
    this.getCursos();
    this.getMunicipios();
    this.getTiposLogradouros();
    this.getProtocolo();
    //------------------------

    this.inputInitialValueNomeConjuge = this.servidor.nomeConjuge
    this.inputInitialValueformSuperior = this.servidor.formacaoSuperior

    // --- Altera as variaveis de validação de acordo com a alteração do select de estado civil ---
    this.recadastramento.get('estadoCivil')?.valueChanges.subscribe((value) => {
      this.idEstadoCivil = value
      if(value == 2){
        this.valCasado = true;
      } else if(value == 1){
        this.valEstadoCivil = false
      }
      else {
        this.recadastramento.controls['nomeConjuge'].setValue("")
      }
    })

     // --- Altera as variaveis de validação de acordo com a alteração do select de grau de instrução ---
    this.servidor.formacaoSuperior ? this.valCurso = true : null
    this.recadastramento.get('grauInstrucao')?.valueChanges.subscribe((value) => {
      this.idGrauInst = value
      if(value == 1){
        this.valGrauInstrucao = false
      } else {
        this.valGrauInstrucao = true
      }

      if(value >=8 && value <=12){
        this.valCurso = true
      } else {
        this.valCurso = false
        this.recadastramento.controls['formacaoSuperior'].setValue("")
      }
    })

  }

  //--------- Médoto que verifica se o formulario ja foi enviado --------- //

  getProtocolo(){
    let matricula = this.auth.getMatricula();
    let cpf = this.auth.getCpf();
    let ano = new Date().getFullYear();
      this.servidorService.getProtocolo(Number(matricula), cpf, ano).subscribe(
        ()=> {
          if(this.refazer){
            this.valEnviado = false
          } else {
            this.valEnviado = true;
            this.roteador.navigate(['/recadastramento/possui-cadastro'])
          }
        },
        (error) => {
          if(error.status === 404){
            this.valEnviado = false
          } else if(error.status === 500){
            AppComponent.openSwal({message: "Tratar com a SUTIC", text: error.error.message, redirectHome: true});
          } else if (error.status === 401){
            AppComponent.openSwal({message: "Sessão expirada", text: "Encerre a sessão com logout e realize o login novamente", redirectHome: true});
          }
        }
      )
  }

  //-------- Método que aplica os valores da requisição no formulário --------------
  onSetValue(value: any) {
    this.servidor = value;
    this.idGrauInst = this.servidor.grauInstrucao
    this.idEstadoCivil = this.servidor.estadoCivil
    this.idInitialEstadoCivil = this.servidor.estadoCivil
    this.idInitialGrauInst = this.servidor.grauInstrucao

    this.recadastramento.patchValue({
      matricula: value.matricula,
      nome: value.nome,
      rg: value.rg,
      cpf: value.cpf,
      racaCor: value.racaCor,
      dtNascimento: value.dtNascimento.slice(0, 10),
      email: value.email,
      cep: value.cep,
      endereco: value.endereco,
      numeroEndereco: value.numeroEndereco,
      complementoEndereco: value.complementoEndereco,
      bairro: value.bairro,
      nomeConjuge: value.nomeConjuge,
      telefone: value.telefone,
      localTrabalho: value.localTrabalho,
      tipoLogradouro: value.tipoLogradouro,
      municipio: value.municipio,
      estadoCivil: value.estadoCivil,
      grauInstrucao: value.grauInstrucao,
      cargo: value.cargo,
      secretaria: value.secretaria,
      nomeSocial: value.nomeSocial,
      deficiente: value.deficiente,
      formacaoSuperior: value.formacaoSuperior
    });

    if (value.estadoCivil == 1 /*solteiro*/) {
      this.validacao = false;
    }

    value.dependentes.forEach((dep:any)=>{
      if(dep.ativo == "S"){
        this.dependentes.push(dep);
        this.arrayAuxDependentes.push(dep);
      }
    });

    if (this.dependentes.length > 0) {
      this.dependentesTrue = true;
    } else {
      this.dependentesTrue = false;
    }

    this.cep = value.cep

    this.matricula = value.matricula
  }


  // ------------ Envia os dados do formulário para o servidor ---------------------------
  PostServidor(valueServidor: any) {
    let id, contcpf = 0;

    this.dependentes.forEach((e: any)=> {
      if(!e.idFb) e.idFb = e.id
      if(e.id == null) e.id = 0
      if(e.idFb! == null) e.idFb = 0
      if(!e.cpf) contcpf++
    })

    if (this.valNome && this.fileNome == null) {
       AppComponent.openSwal({message: 'Comprovante de nome não anexado'});
      return;
    } if (this.valEstadoCivil && this.fileEstadoCivil == null) {
      AppComponent.openSwal({message: 'Comprovante de Estado Civil não anexado'});
      return;
    } if (this.valCep && this.fileCep == null) {
      AppComponent.openSwal({message: 'Comprovante de Endereço não anexado'});
      return;
    }

    if(contcpf > 0){
      AppComponent.openSwal({message:"Informe o CPF de todos dependentes"});
    }
    else if (this.arrayFileDependentes.length < this.dependentes.length || this.arrayFileDependentes.length != this.dependentes.length){
      AppComponent.openSwal({message:"Você deve adicionar o documento de todos os dependentes"});
    }
    else if (this.checkboxes.valid) {

      valueServidor.dependentesList = this.dependentes;
      valueServidor.motivoRmDep = this.motivoRmDepArray;

      // ----- Reúne anexos armazenados em variaveis globais no array de arquivos - arrayFiles ------------
      this.fileNome != null || this.fileNome != undefined ? this.arrayFiles.push(this.fileNome): null;
      this.fileGrauInstrucao != null || this.fileGrauInstrucao != undefined ? this.arrayFiles.push(this.fileGrauInstrucao): null;
      this.fileEstadoCivil != null || this.fileEstadoCivil != undefined ? this.arrayFiles.push(this.fileEstadoCivil): null;
      this.fileCep != null || this.fileCep != undefined ? this.arrayFiles.push(this.fileCep): null;
      // ---------------------------------------------------------------------------------------------------

      this.servidorService.PostServidor(valueServidor, this.arrayFiles).subscribe({
        next: (res) =>{
          this.dtAtualizacao = res.dtAtualizacao;
          this.protocolo = String(res.id + this.dtAtualizacao.slice(0, 4)).padStart(8, "0");
          this.routeProtocolo(valueServidor);
        },
        error: (err) => {
          if (err.status == 401) {
            AppComponent.openSwal({message: "Sessão expirada!"});
            this.auth.logout();
          }
          else {
            AppComponent.openSwal({message: "Erro ao enviar as informações"});
          }
        }
      })
    }
    else {
      AppComponent.openSwal({message:'Aceite os termos para continuar'})
    }


  }

  //------------- Método de busca de CEP e liberação de campos sem dados ----------------------
  getCep(cep: number) {
    let inputEndereco = document.getElementById('endereco') as HTMLInputElement
    let inputBairro = document.getElementById('bairro') as HTMLInputElement
    let inputNumero = document.getElementById('numeroEndereco') as HTMLInputElement
    let inputTipoLogradouro = document.getElementById('tipoLogradouro') as HTMLInputElement

    this.cepService.getCep(this.cep).subscribe((value) => {
      this.recadastramento.patchValue({
        cep: this.cep,
        endereco: value.logradouro.slice(value.logradouro.indexOf(' ')).trim(),
        bairro: value.bairro,
        tipoLogradouro: value.logradouro.slice(
          0,
          value.logradouro.indexOf(' ')
        ),
        municipio: (value.ibge.slice(0,6)),
        numeroEndereco: '',
        complementoEndereco: '',
      });

      this.getTipoLogradouroByDescricao(value.logradouro.slice(0,value.logradouro.indexOf(' ')))

      inputNumero?.classList.remove('form__desabilitado')


      if (value.bairro == null || value.bairro == '' || value.bairro == undefined) {
        inputBairro?.classList.remove('form__desabilitado');
      } else {
        inputBairro?.classList.add('form__desabilitado');
      }

      if (value.logradouro == null || value.logradouro == '' || value.logradouro == undefined ) {
        inputEndereco?.classList.remove('form__desabilitado');
        inputTipoLogradouro.classList.remove('form__desabilitado');
        inputTipoLogradouro.value = ""
      } else {
        inputEndereco?.classList.add('form__desabilitado');
        inputTipoLogradouro.classList.add('form__desabilitado');
      }


    });
  }

  //-------------------- Redireciona Para a página de protocolo ----------------------
  routeProtocolo(dadosServidor: any) {
    let envioServidor = [dadosServidor, this.dtAtualizacao, this.protocolo]
    this.roteador.navigate(['/recadastramento/protocolo', this.protocolo], { relativeTo: this.rotaAtual, state: { data: envioServidor } });
  }

  //===========================================\\
  //  ADIÇÃO, EDIÇÃO E REMOÇÃO DE DEPENDENTES  \\
  //===========================================\\
  removeDependente(dependente: any, valueMotivo?: any){
    let nome = String(dependente.nome)
    if((valueMotivo != undefined || valueMotivo != '')  && dependente.id != null){
      if(String(valueMotivo).length < 5){
        AppComponent.openSwal({message:"motivo muito curto"});
      } else {
        let motivo = valueMotivo;
        this.motivoRmDepArray.push(`Motivo de remoção de  ${dependente.nome}: ` + motivo)
        this.dependentes.splice(this.dependentes.indexOf(dependente), 1)

        this.arrayFiles.forEach(e => {
          if(e.name.slice(0, e.name.indexOf('.')) == `ComprovanteDeDependente${nome.replaceAll(" ", "_")}`){
            this.arrayFiles.splice(this.arrayFiles.indexOf(e), 1)
            this.arrayFileDependentes.splice(this.arrayFiles.indexOf(e), 1)
          }
        })

      }
    } else {
      this.dependentes.splice(this.dependentes.indexOf(dependente), 1)

      this.arrayFiles.forEach(e => {
        if(e.name.slice(0, e.name.indexOf('.')) == `ComprovanteDeDependente${nome.replaceAll(" ", "_")}`){
          this.arrayFiles.splice(this.arrayFiles.indexOf(e), 1)
          this.arrayFileDependentes.splice(this.arrayFiles.indexOf(e), 1)
        }
      })
    }

  }

  enableFormEditDependente(dependente: any){
    this.addDependentes = true
    this.editDependenteBool = true
    this.auxDependente = dependente
    this.nomeDep = dependente.nome
    this.onSetValueDependente(dependente)
  }

  editarDependente(formDependentes: any)
  {
    let file = this.fileDependente
    let nome = String(this.dependentesForm.controls['nome'].value)

    if (formDependentes.invalid) {
      AppComponent.openSwal({message:'Preencha todos os campos do dependente'})
    } else if (this.fileDependente == null) {
      AppComponent.openSwal({message:`Comprovante do dependente ${nome} não anexado`})
    }
    else if (formDependentes.value.cpf == this.servidor.cpf){
      AppComponent.openSwal({message:`O CPF do dependente não pode ser igual ao do servidor`})
    }
    else{
      let index = this.dependentes.indexOf(this.auxDependente)
      this.dependentes[index] = formDependentes.value

      this.addDependentes = false;

      this.arrayFiles.forEach(e => {
        if(e.name.slice(0, e.name.indexOf('.')) == `ComprovanteDeDependente${this.nomeDep.replaceAll(" ", "_")}`){
          this.arrayFiles.splice(this.arrayFiles.indexOf(e), 1)
          this.arrayFileDependentes.splice(this.arrayFiles.indexOf(e), 1)
        }
      })


      this.arrayFiles.push(file)
      this.arrayFileDependentes.push(file)
      this.fileDependente = this.nullFile
    }
  }


  enableFormAddDependente() {
    this.addDependentes = true;
    this.editDependenteBool = false
    this.dependentesForm.reset()
  }

  disableformDependente() {
    this.addDependentes = false;
  }

  adicionarDependente(formDependentes: any) {

    let file = this.fileDependente
    let nome = this.dependentesForm.controls['nome'].value?.replaceAll(" ","_")
    if(file?.name.slice(0,file?.name.indexOf(".")) != `ComprovanteDeDependente${nome}`){
      AppComponent.openSwal({message:"Anexe o comprovante do dependente"})
    }
    else if (formDependentes.invalid) {
      AppComponent.openSwal({message:'Preencha todos os campos do dependente'})
    }
    else if (formDependentes.value.cpf == this.servidor.cpf){
      AppComponent.openSwal({message:`O CPF do dependente não pode ser igual ao do servidor`})
    }
    else {
      this.dependentes.push(formDependentes.value);
      formDependentes.reset();
      this.addDependentes = false;
      this.dependentesTrue = true;
      this.arrayFiles.push(file);
      this.arrayFileDependentes.push(file);
      this.fileDependente = this.nullFile
    }

  }

  onSetValueDependente(dependente:any){
    this.addDependentes = true;
    this.dependentesForm.patchValue({
      idFb: dependente.id,
      id: dependente.id,
      nome: dependente.nome,
      sexo: dependente.sexo,
      cpf: dependente.cpf,
      dtNascimento: dependente.dtNascimento,
    })
  }

  //=========================================\\
  //       Métodos para renomear Files       \\
  //=========================================\\
  onChangeNome(event: any) {
    this.fileNome = event.target.files[0];

    let size = event.target.files[0].size

    if (size > 2516582.4) {

      AppComponent.openSwal({message:"Arquivo maior do que o permitido"})
      event.target.value = ''
    }
    if (this.valNome && this.fileNome != null) {
      let pdf = 'application/pdf'
      let png = 'image/png'
      let jpeg = 'image/jpeg'

      switch (this.fileNome.type) {
        case pdf:
          let blob = this.fileNome.slice(0, this.fileNome.size, pdf)
          this.fileNome = new File([blob], `ComprovanteNomeCompleto.pdf`, { type: pdf })
          break;

        case png:
          let blob1 = this.fileNome.slice(0, this.fileNome.size, png)
          this.fileNome = new File([blob1], `ComprovanteNomeCompleto.png`, { type: png })
          break;

        case jpeg:
          let blob2 = this.fileNome.slice(0, this.fileNome.size, jpeg)
          this.fileNome = new File([blob2], `ComprovanteNomeCompleto.jpeg`, { type: jpeg })
          break;
      }
    }
  }

  onChangeGrauInstrucao(event: any) {
    this.fileGrauInstrucao = event.target.files[0];

    let size = event.target.files[0].size

    if (size > 2516582.4) {
      AppComponent.openSwal({message:"Arquivo maior do que o permitido"})
      event.target.value = '';
      this.fileGrauInstrucao = this.nullFile;
    }
    if (this.valGrauInstrucao && this.fileGrauInstrucao != null) {

      let pdf = 'application/pdf'
      let png = 'image/png'
      let jpeg = 'image/jpeg'

      switch (this.fileGrauInstrucao.type) {
        case pdf:
          let blob = this.fileGrauInstrucao.slice(0, this.fileGrauInstrucao.size, pdf)
          this.fileGrauInstrucao = new File([blob], `ComprovanteGrauDeInstrucao.pdf`, { type: pdf })
          break;

        case png:
          let blob1 = this.fileGrauInstrucao.slice(0, this.fileGrauInstrucao.size, png)
          this.fileGrauInstrucao = new File([blob1], `ComprovanteGrauDeInstrucao.png`, { type: png })
          break;

        case jpeg:
          let blob2 = this.fileGrauInstrucao.slice(0, this.fileGrauInstrucao.size, jpeg)
          this.fileGrauInstrucao = new File([blob2], `ComprovanteGrauDeInstrucao.jpeg`, { type: jpeg })
          break;
      }
    }
  }

  onChangeEstadoCivil(event: any) {
    this.fileEstadoCivil = event.target.files[0];

    let size = event.target.files[0].size

    if (size > 2516582.4) {
      AppComponent.openSwal({message:"Arquivo maior do que o permitido"})
      event.target.value = ''
      this.fileEstadoCivil = this.nullFile;
    }

    if (this.valEstadoCivil && this.fileEstadoCivil != null) {

      let pdf = 'application/pdf'
      let png = 'image/png'
      let jpeg = 'image/jpeg'

      switch (this.fileEstadoCivil.type) {
        case pdf:
          let blob = this.fileEstadoCivil.slice(0, this.fileEstadoCivil.size, pdf)
          this.fileEstadoCivil = new File([blob], `ComprovanteEstadoCivil.pdf`, { type: pdf })
          break;

        case png:
          let blob1 = this.fileEstadoCivil.slice(0, this.fileEstadoCivil.size, png)
          this.fileEstadoCivil = new File([blob1], `ComprovanteEstadoCivil.png`, { type: png })
          break;

        case jpeg:
          let blob2 = this.fileEstadoCivil.slice(0, this.fileEstadoCivil.size, jpeg)
          this.fileEstadoCivil = new File([blob2], `ComprovanteEstadoCivil.jpeg`, { type: jpeg })
          break;
      }
    }
  }

  onChangeCep(event: any) {
    this.fileCep = event.target.files[0];

    let size = event.target.files[0].size

    if (size > 2516582.4) {
      AppComponent.openSwal({message:"Arquivo maior do que o permitido"})
      event.target.value = ''
      this.fileCep = this.nullFile;
    }
    if (this.valCep && this.fileCep != null) {

      let pdf = 'application/pdf'
      let png = 'image/png'
      let jpeg = 'image/jpeg'

      switch (this.fileCep.type) {
        case pdf:
          let blob = this.fileCep.slice(0, this.fileCep.size, pdf)
          this.fileCep = new File([blob], `ComprovanteDeEndereco.pdf`, { type: pdf })
          break;

        case png:
          let blob1 = this.fileCep.slice(0, this.fileCep.size, png)
          this.fileCep = new File([blob1], `ComprovanteDeEndereco.png`, { type: png })
          break;

        case jpeg:
          let blob2 = this.fileCep.slice(0, this.fileCep.size, jpeg)
          this.fileCep = new File([blob2], `ComprovanteDeEndereco.jpeg`, { type: jpeg })
          break;
      }
    }
  }
  onChangeDependente(event: any){
    this.fileDependente = event.target.files[0];

    let size = event.target.files[0].size

    if (size > 2516582.4) {
      AppComponent.openSwal({message:"Arquivo maior do que o permitido"})
      event.target.value = ''
      this.fileDependente = this.nullFile
    }

    if (this.fileDependente != null) {
      let pdf = 'application/pdf'
      let png = 'image/png'
      let jpeg = 'image/jpeg'
      let nome = this.dependentesForm.controls['nome'].value?.replaceAll(" ", "_");

      switch (this.fileDependente.type) {
        case pdf:
          let blob = this.fileDependente.slice(0, this.fileDependente.size, pdf)
          this.fileDependente = new File([blob], `ComprovanteDeDependente${nome}.pdf`, { type: pdf })
          break;

        case png:
          let blob1 = this.fileDependente.slice(0, this.fileDependente.size, png)
          this.fileDependente = new File([blob1], `ComprovanteDeDependente${nome}.png`, { type: png })
          break;

        case jpeg:
          let blob2 = this.fileDependente.slice(0, this.fileDependente.size, jpeg)
          this.fileDependente = new File([blob2], `ComprovanteDeDependente${nome}.jpeg`, { type: jpeg })
          break;
      }
    }
  }

  //=========================================\\
  //       REQUISIÇÕES ÀS LISTAS             \\
  //=========================================\\

  getServidorByLogin() {
    let servidor = this.auth.getServidor();
    this.onSetValue(JSON.parse(servidor))
  }

  getSecretarias(){
    this.listaService.getSecretarias().subscribe(
      (res) => {
        this.secretarias = res;
      },
      (error) => {
        console.error(error)
      }
    )
  }

  getEstadoCivil(){
    this.listaService.getEstadoCivil().subscribe(
      (res) => {
        this.estado_civil = res;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getRacaCor(){
    this.listaService.getRacaCor().subscribe(
      (res) => {
        this.raca_cor = res;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getGrauInstrucao(){
    this.listaService.getGrauInstrucao().subscribe(
      (res) => {
        this.grau_instrucao = res
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getCursos(){
    this.listaService.getCursos().subscribe(
      (res) => {
        this.cursos = res
      },
      (error) => {
        console.error(error)
      }
    )
  }

  getMunicipios(){
    this.listaService.getMunicipios().subscribe(
      (res) => {
        this.cidades = res
      },
      (error) => {
        console.error(error)
      }
    )
  }

  getTiposLogradouros(){
    this.listaService.getTiposLogradouros().subscribe(
      (res) => {
        this.tiposLogradouros = res
      },
      (error) => {
        console.error(error)
      }
    )
  }

  getTipoLogradouroByDescricao(descricao: String): String | void {
    this.listaService.getTipoLogradouroByDescricao(descricao).subscribe(
      (res: any) => {
        this.recadastramento.controls['tipoLogradouro'].setValue(res.chave)
      }
    )
  }


  //=========================================\\
  //     ATIVAR E DESATIVAR INPUTS           \\
  //=========================================\\

  ativarInput(idInput: string) {
    let input = document.getElementById(idInput) as HTMLInputElement
    let inputGrauInstrucao = document.getElementById('grauInstrucao') as HTMLInputElement
    let inputFormSuperior = document.getElementById('formacaoSuperior') as HTMLInputElement
    let inputFormSuperiorEdit = document.getElementById('formacaoSuperiorEdit') as HTMLInputElement
    switch(idInput){

      case "nome":
        this.valNome? this.valNome = false : this.valNome = true;
        if(input.classList.contains('form__desabilitado')){
          this.inputInitialValueNome = input.value;
        } else {
          this.recadastramento.controls['nome'].setValue(this.inputInitialValueNome);
          this.fileNome = this.nullFile
        }
      break;

      case "cep":
        this.valCep? this.valCep = false : this.valCep = true;
        let inputNumero = document.getElementById('numeroEndereco') as HTMLInputElement;
        let inputLogradouro = document.getElementById('endereco') as HTMLInputElement;
        let inputComplemento = document.getElementById('complementoEndereco') as HTMLInputElement;
        let inputMunicipio = document.getElementById('municipio') as HTMLInputElement;
        let inputBairro = document.getElementById('bairro') as HTMLInputElement;
        let inputTipoLogradouro = document.getElementById('tipoLogradouro') as HTMLInputElement

        inputNumero.classList.remove('form__desabilitado')
        inputComplemento.classList.remove('form__desabilitado')
        if(input.classList.contains('form__desabilitado')){
          this.inputInitialValueCep = input.value
          this.inputInitialValueNEnd = inputNumero.value
          this.inputInitialValueEnd = inputLogradouro.value
          this.inputInitialValueCompEnd = inputComplemento.value
          this.inputInitialValueMun = inputMunicipio.value
          this.inputInitialValueBairro = inputBairro.value
          this.inputInitialValueTipoLogradouro = inputTipoLogradouro.value
        } else {
          this.recadastramento.controls['cep'].setValue(this.inputInitialValueCep.replace("-",""));
          this.recadastramento.controls['numeroEndereco'].setValue(this.inputInitialValueNEnd);
          this.recadastramento.controls['endereco'].setValue(this.inputInitialValueEnd);
          this.inputInitialValueCompEnd?this.recadastramento.controls['complementoEndereco'].setValue(this.inputInitialValueCompEnd):null;
          this.recadastramento.controls['municipio'].setValue(this.inputInitialValueMun);
          this.recadastramento.controls['bairro'].setValue(this.inputInitialValueBairro);
          this.recadastramento.controls['tipoLogradouro'].setValue(this.inputInitialValueTipoLogradouro);

          inputLogradouro.classList.contains('form__desabilitado')? null:inputLogradouro.classList.add('form__desabilitado')
          inputNumero.classList.contains('form__desabilitado')? null:inputNumero.classList.add('form__desabilitado')
          inputComplemento.classList.contains('form__desabilitado')? null:inputComplemento.classList.add('form__desabilitado')
          inputBairro.classList.contains('form__desabilitado')? null:inputBairro.classList.add('form__desabilitado')
          inputTipoLogradouro.classList.contains('form__desabilitado')? null:inputTipoLogradouro.classList.add('form__desabilitado')
          this.fileCep = this.nullFile
        }
      break;

      case "grauInstrucao":
        if(input.classList.contains('form__desabilitado')){
          this.inputInitialValueGrauInst = input.value;
          this.valGrauInstrucao = true;
          this.valGrauInstrucaoBotao = true
        } else {
          this.recadastramento.controls['grauInstrucao'].setValue(this.inputInitialValueGrauInst);
          // input.value = this.inputInitialValueGrauInst;
          inputFormSuperior? this.recadastramento.controls['formacaoSuperior'].setValue(null): null;
          this.recadastramento.controls['formacaoSuperior'].setValue(this.servidor.formacaoSuperior);
          this.idGrauInst = this.idInitialGrauInst
          this.valGrauInstrucaoBotao = false
          if(inputFormSuperiorEdit?.classList?.contains('form__desabilitado')){
            this.valGrauInstrucao = false;
            this.fileGrauInstrucao = this.nullFile;
          } else if (inputFormSuperiorEdit == null){
            this.valGrauInstrucao = false;
            this.valGrauInstrucaoBotao = false;
            this.valCurso = false;
            this.fileGrauInstrucao = this.nullFile;
          }
        }
      break;

      case "formacaoSuperiorEdit":
        if(input.classList.contains('form__desabilitado')){
          this.inputInitialValueformSuperior = input.value;
          this.valGrauInstrucao = true;
          this.valCursoGraduacao = true
          this.valFormacaoBotao = true
        } else {
          this.recadastramento.controls['formacaoSuperior'].setValue(this.inputInitialValueformSuperior);
          // input.value = this.inputInitialValueformSuperior;
          this.valFormacaoBotao = false
          if(inputGrauInstrucao.classList.contains('form__desabilitado')){
            this.valGrauInstrucao = false;
            this.valCursoGraduacao = false
            this.fileGrauInstrucao = this.nullFile;
          }
        }
      break;

      // case "localTrabalho":
      //   if(input.classList.contains('form__desabilitado')){
      //     this.inputInitialValueLocalTrabalho = input.value;
      //   } else {
      //     this.recadastramento.controls['localTrabalho'].setValue(this.inputInitialValueLocalTrabalho);
      //   }
      // break;

      // case "secretaria":
      //   if(input.classList.contains('form__desabilitado')){
      //     this.inputInitialValueSecretaria = input.value;
      //   } else {
      //     this.recadastramento.controls['secretaria'].setValue(this.inputInitialValueSecretaria);
      //   }
      // break;

      // case "cargo":
      //   if(input.classList.contains('form__desabilitado')){
      //     this.inputInitialValueCargo = input.value;
      //   } else {
      //     this.recadastramento.controls['cargo'].setValue(this.inputInitialValueCargo);
      //   }
      // break;

      case "estadoCivil":
        if(input.classList.contains('form__desabilitado')){
          this.inputInitialValueEstadoCivil = input.value
          this.valEstadoCivil = true;
          this.valEstadocivilBotao = true;
        } else {
          // input.value = this.inputInitialValueEstadoCivil;
          this.recadastramento.controls['estadoCivil'].setValue(this.inputInitialValueEstadoCivil);
          this.valEstadoCivil = false;
          this.valCasado = false;
          this.idEstadoCivil = this.idInitialEstadoCivil
          this.recadastramento.controls['nomeConjuge'].setValue(this.inputInitialValueNomeConjuge)
          this.fileEstadoCivil = this.nullFile
          this.valEstadocivilBotao = false
        }
      break;

      case "nomeConjugeEdit":
        if(input.classList.contains('form__desabilitado')){
          this.inputInitialValueNomeConjuge = input.value
          this.nomeConjugeBotao = true
          this.valEstadoCivil = true
        } else {
          let inputEstadoCivil = document.getElementById('estadoCivil') as HTMLInputElement
          // input.value = this.inputInitialValueNomeConjuge
          this.recadastramento.controls['nomeConjuge'].setValue(this.inputInitialValueNomeConjuge);
          this.nomeConjugeBotao = false
          if(inputEstadoCivil.classList.contains('form__desabilitado')) this.valEstadoCivil = false;

        }
      break;

    }
    input.classList.toggle('form__desabilitado')
  }

}
