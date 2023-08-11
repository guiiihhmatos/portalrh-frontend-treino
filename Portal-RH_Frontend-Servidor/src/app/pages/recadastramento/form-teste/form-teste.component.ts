import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Curso } from 'src/app/models/listas/curso.model';
import { EstadoCivil } from 'src/app/models/listas/estadoCivil.model';
import { GrauInstrucao } from 'src/app/models/listas/grauInstrucao.model';
import { Municipio } from 'src/app/models/listas/municipio.model';
import { RacaCor } from 'src/app/models/listas/racaCor.model';
import { Secretaria } from 'src/app/models/listas/secretaria.model';
import { TipoLogradouro } from 'src/app/models/listas/tipoLogradouro.model';
import { BoolFiles } from 'src/app/models/recadastramento/boolFiles.model';
import { InitialValues } from 'src/app/models/recadastramento/initialValues.model';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { Validacoes } from 'src/app/models/validacoes/validacoes.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListasService } from 'src/app/services/listas/listas.service';

@Component({
  selector: 'app-form-teste',
  templateUrl: './form-teste.component.html',
  styleUrls: ['./form-teste.component.scss'],
})
export class FormTesteComponent {
  //forms
  formRecadastramento: FormGroup;
  formChecks: FormGroup;
  formDependentes: FormGroup;

  servidor: Servidor;
  inpt!: HTMLInputElement | HTMLSelectElement;

  //variaveis de interação condicional html
  boolAreaFormacao: boolean = false;
  editAreaFormacao: boolean;
  boolNomeConjuge: boolean = false;
  editNomeConjuge: boolean;
  boolFile: BoolFiles = {
    nome: false,
    cep: false,
    estadoCivil: false,
    grauInstrucao: false
  };

  //arrays das listas
  grausInstrucao: GrauInstrucao[] = [];
  estadosCivis: EstadoCivil[] = [];
  tiposLogradouro: TipoLogradouro[] = [];
  municipios: Municipio[] = [];
  cursos: Curso[] = [];
  racas: RacaCor[] = [];

  //valores iniciais dos inputs editaveis em objeto
  initialsValue!: InitialValues;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private listasService: ListasService
  ) {
    this.servidor = JSON.parse(auth.getServidor());

    if (this.servidor.formacaoSuperior) this.editAreaFormacao = true;
    else this.editAreaFormacao = false;

    if(this.servidor.nomeConjuge) this.editNomeConjuge = true;
    else this.editNomeConjuge = false;

    this.formRecadastramento = this.fb.group({
      matricula: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      nomeSocial: [null, [Validators.required]],
      rg: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      racaCor: ["", [Validators.required]],
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
      grauInstrucao: ['', [Validators.required]],
      cargo: [null, [Validators.required]],
      secretaria: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      localTrabalho: [null, [Validators.required]],
      deficiente: [null, [Validators.required]],
      dependentesList: [null, [Validators.required]],
      formacaoSuperior: [null, [Validators.required]],
      motivoRmDep: [null],
    });

    this.formChecks = fb.group({
      termo: [false, [Validators.required]],
      autorizacao: [false, [Validators.required]],
    });

    this.formDependentes = fb.group({
      idFb: [0],
      id: [0],
      nome: [null, [Validators.required]],
      sexo: ['', [Validators.required]],
      cpf: [null, [Validators.required, Validacoes.ValidaCpf]],
      dtNascimento: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.servidor)
    //Iniciando os métodos de lista----
    this.getGrauInstrucao();
    this.getEstadoCivil();
    this.getTiposLogradouro();
    this.getMunicipios();
    this.getCursos();
    this.getRacasCores();
    this.getSecretarias();
    //---------------------------------

    this.onSetRecadastramento(this.servidor);

    // alterações no formulário ao alterar select de grau de instrução
    this.formRecadastramento.controls['grauInstrucao'].valueChanges.subscribe({
      next: (value) => {
       this.editAreaFormacao = false;
       this.formRecadastramento.controls['formacaoSuperior'].setValue(null);
       if (Number(value) >=8) this.boolAreaFormacao = true;
       else this.boolAreaFormacao = false;

      },
    })
    // alterações no formulário ao alterar select de estado civil
    this.formRecadastramento.controls['estadoCivil'].valueChanges.subscribe({
      next: (value) => {
        this.editNomeConjuge = false;
        this.formRecadastramento.controls['nomeConjuge'].setValue(null);

        if (Number(value) == 2) this.boolNomeConjuge = true;
        else this.boolNomeConjuge = false;

      },
    })
  }

  onSetRecadastramento(servidor: Servidor) {
    this.formRecadastramento.patchValue({
      matricula: servidor.matricula,
      nomeSocial: servidor.nomeSocial,
      nome: servidor.nome,
      grauInstrucao: servidor.grauInstrucao,
      dtNascimento: servidor.dtNascimento,
      rg: servidor.rg,
      cpf: servidor.cpf,
      racaCor: servidor.racaCor,
      localTrabalho: servidor.localTrabalho,
      secretaria: servidor.secretaria,
      cargo: servidor.cargo,
      telefone: servidor.telefone,
      estadoCivil: servidor.estadoCivil,
      nomeConjuge: servidor.nomeConjuge,
      email: servidor.email,
      cep: servidor.cep,
      tipoLogradouro: servidor.tipoLogradouro,
      endereco: servidor.endereco,
      numeroEndereco: servidor.numeroEndereco,
      complementoEndereco: servidor.complementoEndereco,
      bairro: servidor.bairro,
      formacaoSuperior: servidor.formacaoSuperior
    });

    this.getMunicipioByCode(servidor.municipio);

    //preencher valores iniciais
    this.initialsValue = {
      nome: servidor.nome,
      grauInstrucao: servidor.grauInstrucao,
      formacaoSuperior: servidor.formacaoSuperior,
      estadoCivil: servidor.estadoCivil,
      nomeConjuge: servidor.nomeConjuge,
      cep: {
        cep: servidor.cep,
        bairro: servidor.bairro,
        complemento: servidor.complementoEndereco,
        endereco: servidor.endereco,
        municipio: servidor.municipio,
        numero: servidor.numeroEndereco,
        tipoLogradouro: servidor.tipoLogradouro,
      },
    };
  }

  //ativar e desativar inputs junto com o id/formControlName, campos relacionados e a logica de negocio
  activeInput(formControlName: string, idButtonEdit: string) {
    this.inpt = document.getElementById(formControlName) as HTMLInputElement| HTMLSelectElement;
    let spanEdit = document.getElementById(String(idButtonEdit)) as HTMLSpanElement;
    let btnEdit = spanEdit.parentNode as HTMLButtonElement;

    //altear botões ao clicar em editar ou fechar
    if(this.inpt.hasAttribute('readonly')){
      spanEdit.textContent = 'close';
      btnEdit.classList.remove('btn-edit');
      btnEdit.classList.add('btn-edit-close');
    } else {
      spanEdit.textContent  ='edit';
      btnEdit.classList.add('btn-edit');
      btnEdit.classList.remove('btn-edit-close');
    }
    switch (formControlName) {
      case 'nome':
        if (!this.inpt.hasAttribute('readonly')) {
          this.formRecadastramento.controls[formControlName]
          .setValue(this.initialsValue.nome);
        }
        break;
      case 'grauInstrucao':
        if (!this.inpt.hasAttribute('readonly')) {
          this.formRecadastramento.controls[formControlName]
          .setValue(this.initialsValue.grauInstrucao);

          this.formRecadastramento.controls['formacaoSuperior']
          .setValue(this.initialsValue.formacaoSuperior);

          //devolve as variaveis relacionadas a formacao superior ao valor inicial do servidor
          if (this.servidor.formacaoSuperior) this.editAreaFormacao = true;
          else this.editAreaFormacao = false;

          this.boolAreaFormacao = false;
        }
        break;
      case 'formacaoSuperior':
        if (!this.inpt.hasAttribute('readonly')) {
          this.formRecadastramento.controls[formControlName]
          .setValue(this.initialsValue.formacaoSuperior);
        }
        break;
      case 'estadoCivil':
        if (!this.inpt.hasAttribute('readonly')) {
          this.formRecadastramento.controls[formControlName]
          .setValue(this.initialsValue.estadoCivil);

          this.formRecadastramento.controls['nomeConjuge']
          .setValue(this.initialsValue.nomeConjuge);

          //devolve as variaveis relacionadas ao nome do conjuge ao valor inicial do servidor
          if(this.servidor.nomeConjuge) this.editNomeConjuge = true;
          else this.editNomeConjuge = false;

          this.boolNomeConjuge = false;
        }
        break;
      case 'nomeConjuge':
        if (!this.inpt.hasAttribute('readonly')) {
          this.formRecadastramento.controls[formControlName]
          .setValue(this.initialsValue.nomeConjuge);
        }
        break;
      case 'cep':
        if (this.inpt.hasAttribute('readonly')) {
          //remove readonly de outros campos relacionados ao cep
          document.getElementById('numeroEndereco')?.removeAttribute('readonly');
          document.getElementById('complementoEndereco')?.removeAttribute('readonly');

        } else {
          this.formRecadastramento.controls[formControlName]
          .setValue(this.initialsValue.cep.cep);

          //aplica valores iniciais de volta nos campos relacionados ao cep
          this.formRecadastramento.controls['tipoLogradouro']
          .setValue(this.initialsValue.cep.tipoLogradouro);

          this.formRecadastramento.controls['endereco']
          .setValue(this.initialsValue.cep.endereco);

          this.formRecadastramento.controls['numeroEndereco']
          .setValue(this.initialsValue.cep.numero);

          this.formRecadastramento.controls['complementoEndereco']
          .setValue(this.initialsValue.cep.complemento);

          this.formRecadastramento.controls['municipio']
          .setValue(this.initialsValue.cep.municipio);

          this.formRecadastramento.controls['bairro']
          .setValue(this.initialsValue.cep.bairro);

          //aplica readonly de outros campos relacionados ao cep
          document.getElementById('endereco')?.setAttribute('readonly','');
          document.getElementById('numeroEndereco')?.setAttribute('readonly','');
          document.getElementById('complementoEndereco')?.setAttribute('readonly','');
          document.getElementById('bairro')?.setAttribute('readonly','');

        }
    }
    this.inpt.toggleAttribute('readonly');
  }

  //==================================================\\
  //   Armazenando conteúdo das listas em varivaies    \\
  //====================================================\\
  getGrauInstrucao() {
    this.listasService.getGrauInstrucao().subscribe({
      next: (res) => {
        this.grausInstrucao = res;
      },
    });
  }

  getEstadoCivil() {
    this.listasService.getEstadoCivil().subscribe({
      next: (res) => {
        this.estadosCivis = res;
      },
    });
  }

  getSecretarias(){
    this.listasService.getSecretarias().subscribe({
      next: (res) => {
        res.forEach((secretaria) => {
          if(secretaria.sigla === this.servidor.secretaria)
          this.formRecadastramento.patchValue({ secretaria: secretaria.descricao })
        })
      }
    })
  }

  getMunicipioByCode(codMunicipio: number) {
    this.listasService.getMunicipioByCode(codMunicipio).subscribe({
      next: (res) => {
        this.formRecadastramento.patchValue({ municipio: res.codigo });
      },
    });
  }

  getTipoLogradouroByDescricao(descricaoLogradouro: string) {
    this.listasService.getTipoLogradouroByDescricao(descricaoLogradouro).subscribe({
      next: (res) => {
        this.formRecadastramento.patchValue({ tipoLogradouro: res.chave})
      }
    })
  }

  getTiposLogradouro(){
    this.listasService.getTiposLogradouros().subscribe({
      next: (res)=>{
        this.tiposLogradouro = res;
      }
    })
  }

  getMunicipios(){
    this.listasService.getMunicipios().subscribe({
      next: (res) => {
        this.municipios = res;
      }
    })
  }

  getCursos(){
    this.listasService.getCursos().subscribe({
      next: (res) => {
        this.cursos = res
        this.cursos.push({id: 271, descricao: "Informática superior (ADS)"});
      }
    })
  }

  getRacasCores(){
    this.listasService.getRacaCor().subscribe({
      next: (res) => {
        this.racas = res;
      }
    })
  }

  getCep(cepString: string){
    let cep = cepString.replaceAll(".", "").replaceAll("-","");
    this.listasService.getCep(cep).subscribe({
      next: (res) => {
        if(res.erro){
          AppComponent.openSwal({message: 'CEP não encontrado!', text: cepString});
        } else {
          //aplicar dados nos controls do form
          this.getTipoLogradouroByDescricao(res.logradouro.slice(0,res.logradouro.indexOf(' ')));
          this.formRecadastramento.patchValue({
            endereco: res.logradouro.slice(res.logradouro.indexOf(' ')).trim().toUpperCase(),
            numeroEndereco: null,
            complementoEndereco: res.complemento.toUpperCase(),
            municipio: res.ibge.slice(0,6),
            bairro: res.bairro.toUpperCase(),
          })
          if(!res.logradouro){
            document.getElementById('tipoLogradouro')?.removeAttribute('readonly');
            document.getElementById('endereco')?.removeAttribute('readonly');
          } else {
            document.getElementById('tipoLogradouro')?.setAttribute('readonly','');
            document.getElementById('endereco')?.setAttribute('readonly','');
          }
          if(!res.complemento){
            document.getElementById('complementoEndereco')?.removeAttribute('readonly');
          } else {
            document.getElementById('complementoEndereco')?.setAttribute('readonly','');
          }
          if(!res.bairro){
            document.getElementById('bairro')?.removeAttribute('readonly');
          } else {
            document.getElementById('bairro')?.setAttribute('readonly','');
          }
        }
      },
      error: (err) => {
        AppComponent.openSwal({message: 'Erro ao encontrar CEP', text: cepString})
      }
    })
  }
}
