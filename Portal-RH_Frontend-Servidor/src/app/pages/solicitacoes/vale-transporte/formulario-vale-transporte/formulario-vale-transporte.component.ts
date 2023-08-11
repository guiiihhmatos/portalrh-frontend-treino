import { DadosViaCep } from '../../../../models/cep/dados-via-cep';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { DadosEmpresaVT, ValeTransporte } from 'src/app/models/solicitacoes/vale-transporte/vale-transporte.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CepService } from 'src/app/services/cep/cep.service';
import { ValeTransporteService } from 'src/app/services/solicitacoes/vale-transporte/vale-transporte.service';
import { ListasService } from 'src/app/services/listas/listas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtocoloValeTransporte } from 'src/app/models/solicitacoes/vale-transporte/vale-transporte-protoco.model';
import { EmpresaOnibus } from 'src/app/models/listas/empresaOnibus.model';
import { SweetAlertIcon } from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-formulario-vale-transporte',
  templateUrl: './formulario-vale-transporte.component.html',
  styleUrls: ['./formulario-vale-transporte.component.scss'],
})
export class FormularioValeTransporteComponent {
  formVT: FormGroup;
  formEmpresaVT: FormGroup;
  servidor: Servidor;
  divComprovante: boolean = false;
  divEmpresaVT: boolean = false;
  divCartaoTransporte: boolean = false;
  btnEmpresa: boolean = true;
  operacoes: string[];
  solicitacoesNaoAtendidas: string[] = [];
  arrayFiles: File[] = [];
  empresasVT: DadosEmpresaVT[] = [];
  empresasOnibus: EmpresaOnibus[] = [];
  @ViewChild('confirmacao') confirmacao!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private cepService: CepService,
    private vtService: ValeTransporteService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private listasService: ListasService,
    private _snackbar: MatSnackBar,
  ) {
    this.formVT = fb.group({
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      rg: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      localTrabalho: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      operacao: ['', [Validators.required]],
      cep: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      numeroEndereco: [null, [Validators.required]],
      complementoEndereco: [null],
      empresas: [null, [Validators.required]],
      cartaoTransporte: [null],
    });

    this.formEmpresaVT = fb.group({
      empresaTransportadora: ["", [Validators.required]],
      tarifa: [null, [Validators.required]],
      valorTotal: [null, [Validators.required]]
    })

    this.servidor = JSON.parse(auth.getServidor());

    this.operacoes = [
      "Utilização de vale transporte",
      "Cancelamento do vale transporte",
      "Transferência de vale transporte",
      "Complementação de vale transporte"
    ];
  }

  ngOnInit(): void {
    this.getSolicitacoes();

    this.onSetValue(this.servidor);

    this.formVT.valueChanges.subscribe(() => {
    });

    //funções caso select de operações seja alterado
    this.formVT.controls['operacao'].valueChanges.subscribe((operacao) => {
      if (operacao !== "Utilização de vale transporte"){
        this.divCartaoTransporte = true;
      } else {
        this.divCartaoTransporte = false;
      }
      if (operacao === 'Cancelamento do vale transporte') {
        this.divComprovante = false;
        this.btnEmpresa = false;

        //setar valores do servidor nos campos de endereço caso cancelamento de VT
        this.formVT.patchValue({
          cep: this.servidor.cep,
          endereco: this.servidor.endereco,
          numeroEndereco: this.servidor.numeroEndereco,
          bairro: this.servidor.bairro,
          complemento: this.servidor.complementoEndereco,
        });

        //transforma os campos setados em readonly
        const FORMVT = document.querySelector('form') as HTMLFormElement;
        FORMVT.querySelectorAll('input').forEach(input =>{
          if(input.classList.contains('infoEnd')){
            input.setAttribute('readonly','true')
          }
        })

        //seta o municipio no campo após a requisição ao codigo
        this.listasService.getMunicipioByCode(this.servidor.municipio).subscribe((municipio) => {
          this.formVT.controls['municipio'].setValue(municipio.nome);
        });

      } else {
        this.divComprovante = true;
        this.btnEmpresa = true;

        //remove readonly do campos de endereço se houver
        const FORMVT = document.querySelector('form') as HTMLFormElement;
        FORMVT.querySelectorAll('input').forEach(input =>{
          if(input.classList.contains('infoEnd')){
            input?.removeAttribute('readonly');
          }
        })
      }
    });
  }

  addFile(event: any) {
    const file: File = event.target.files[0];
    const size = file.size;
    const type = file.type;
    let renamedFile: File;
    let fileName: string = "ComprovanteEnderecoVT";

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

    renamedFile = this.renameFile(file, fileName);

    //remove o arquivo do array caso ja anexado anteriormente
    this.arrayFiles.forEach((file) => {
      if (renamedFile.name.slice(0, renamedFile.name.indexOf('.')) === fileName) {
        this.arrayFiles.splice(this.arrayFiles.indexOf(file), 1);
      }
    });

    this.arrayFiles.push(renamedFile);
  }

  renameFile(file: File, nome: String): File {
    const tipoString = String(file.type).slice(String(file.type).indexOf('/') + 1);
    const renamedFile = new File([file], `${nome}.${tipoString}`, {type: file.type, });
    return renamedFile;
  }

  enviarSolicitacaoVT(solicitacaoVT: ValeTransporte) {
    const INPUTFILE = document.getElementById('comprovante') as HTMLInputElement;
    this.formVT.controls['empresas'].setValue(this.empresasVT);
    if (this.formVT.invalid) {
      if(this.formVT.controls['empresas'].invalid){
        AppComponent.openSwal({message:"Informe a empresa de transporte"});
      } else {
        AppComponent.openSwal({message:"Preencha todos os campos"});
      }
    } else if (!this.confirmacao.nativeElement.checked) {
      AppComponent.openSwal({message:"Confirme a solicitação"});
    } else if (INPUTFILE?.value != undefined && INPUTFILE?.value == ""){
      AppComponent.openSwal({message:"Anexe o comprovante de residência"});
    }
    else {
      solicitacaoVT.empresas = this.empresasVT;
      this.salvarSolicitacaoVT(solicitacaoVT, this.arrayFiles);
      // if (
      //   this.formVT.controls['operacao'].value !=
      //   'Cancelamento do vale transporte'
      // ) {
      //   this.salvarArquivoVT(this.servidor.matricula, this.arrayFiles);
      // }
      // this.salvarSolicitacaoVT(solicitacaoVT);
    }
  }

  showHelp(){
    let message = "Operações";
    let icon: SweetAlertIcon = 'info';
    let html = "<ul class=\"list-unstyled text-start\">" +
    "<li><strong>Utilização do vale transporte</strong>: Solicitar o vale transporte caso ainda não possua</li>"+
    "<li><strong>Cancelamento do vale transporte</strong>: Caso não necessite mais do vale transporte</li>"+
    "<li><strong>Transfêrencia do vale transporte</strong>: Caso queria alterar a empresa de transporte</li>"+
    "<li><strong>Complementação do vale transporte</strong>: Caso queira adicionar mais uma empresa de transporte</li>"+
    "</ul>"
    AppComponent.openSwal({message, icon, html});
  }

  // salvarArquivoVT(matricula: number, comprovante: File[]) {
  //   this.vtService.fileUploadVT(matricula, comprovante).subscribe(
  //     () => {},
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  salvarSolicitacaoVT(solicitacaoVT: ValeTransporte, comprovante: File[]) {
    this.vtService.saveVT(solicitacaoVT, comprovante).subscribe({
      next: (res) => {
        this._snackbar.open('Solicitação de vale transporte realizada com sucesso', "OK", {duration : 3000})
        this.rota.navigate(
          [
            '/solicitacoes/vale-transporte/protocolo/',
            String(res.id).padStart(4, '0'),
          ],
          { relativeTo: this.rotaAtual, state: { data: res } }
        );
      },
      error: (error) => {
        AppComponent.openSwal(error.error.message);
      }
    });
  }

  onSetValue(servidor: Servidor) {
    this.formVT.patchValue({
      matricula: servidor.matricula,
      cpf: servidor.cpf,
      rg: servidor.rg,
      nome: servidor.nome,
      localTrabalho: servidor.localTrabalho,
      cargo: servidor.cargo,
    });
  }

  getCep(cep: string) {
    this.cepService.getCep(cep).subscribe((dadosCep: DadosViaCep) => {
      this.formVT.patchValue({
        endereco: dadosCep.logradouro.toUpperCase(),
        bairro: dadosCep.bairro.toUpperCase(),
        municipio: dadosCep.localidade.toUpperCase(),
        complementoEndereco: dadosCep.complemento.toUpperCase(),
      });
    });
  }

  getSolicitacoes() {
    this.vtService
      .getSolicitacoesVT(this.servidor.matricula, this.servidor.cpf)
      .subscribe(
        (res) => {
          res.forEach(solicitacao=>{
            if(!solicitacao.concluido){
              this.solicitacoesNaoAtendidas.push(solicitacao.operacao);
            }
          })

          //aplica ids de solicitacoes em um array
          let idsSolicitacao: number[] = [];
          res.forEach(solicitacao =>{
            idsSolicitacao.push(solicitacao.id);
          })
          //function que verifica qual o maior id do array e armazena em uma variavel
          let lastSolicitacao:any = idsSolicitacao.reduce(function(a:number,b:number){
            return Math.max(a,b);
          });

          //aplica na variavel o objeto da solicitacao
          res.forEach(solicitacao => {
            if(solicitacao.id === lastSolicitacao){
              lastSolicitacao = solicitacao as ProtocoloValeTransporte
            }
          })

          if(!lastSolicitacao.concluido){
            this.rota.navigate(['/solicitacoes/vale-transporte/solicitado'], {relativeTo: this.rotaAtual, state: {data : lastSolicitacao}})
          }

        },
        (error) => {}
      );
  }

  //OPERAÇÕES DE MANIPULAÇÃO DO ARRAY DE EMPRESAS DE ONIBUS DO VT
  getEmpresasOnibus(){
    this.listasService.getEmpresasOnibus().subscribe(empresas=>this.empresasOnibus=empresas);
  }

  openFormEmpresa(){
    this.divEmpresaVT = true;
    this.getEmpresasOnibus();
    this.formEmpresaVT.controls['tarifa'].reset();
    this.formEmpresaVT.controls['valorTotal'].reset();
  }

  calcVlTotal(valor?: number| string, passagens?: number | string){
    let pass = Number(passagens);
    let val = Number(valor);
    this.formEmpresaVT.controls['valorTotal'].setValue(val*pass);
  }

  saveEmpresaVT(empresa:DadosEmpresaVT){
    if(this.formEmpresaVT.invalid){
      AppComponent.openSwal({message:"Preencha todos os campos da empresa"});
    } else {
      this.empresasVT.push(empresa);
      this.divEmpresaVT=false;
    }
  }

  removeEmpresaVT(empresa: DadosEmpresaVT){
    this.empresasVT.splice(this.empresasVT.indexOf(empresa), 1);
  }

}

