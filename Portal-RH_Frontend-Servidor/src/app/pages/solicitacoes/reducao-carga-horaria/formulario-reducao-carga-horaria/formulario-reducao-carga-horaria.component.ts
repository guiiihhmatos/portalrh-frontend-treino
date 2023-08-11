import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { ReducaoCH } from 'src/app/models/solicitacoes/reducao-carga-horaria/reducao-carga-horaria.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListasService } from 'src/app/services/listas/listas.service';
import { ReducaoCargaHorariaService } from 'src/app/services/solicitacoes/reducao-carga-horaria/reducao-carga-horaria.service';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-formulario-reducao-carga-horaria',
  templateUrl: './formulario-reducao-carga-horaria.component.html',
  styleUrls: ['./formulario-reducao-carga-horaria.component.scss'],
})
export class FormularioReducaoCargaHorariaComponent {
  servidor: Servidor;
  formRCH: FormGroup;
  arrayFiles: File[] = [];
  outraSolicitacao: boolean = false;
  protocoloSolicitacao!: number;
  @ViewChild('confirmacao') confirmacao!: ElementRef;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private listasService: ListasService,
    private rchService: ReducaoCargaHorariaService,
    private _snackbar: MatSnackBar,
    private rota: Router,
    private rotaAtual: ActivatedRoute
  ) {
    this.servidor = JSON.parse(auth.getServidor());

    this.formRCH = fb.group({
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      rg: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      secretaria: [null, [Validators.required]],
      localTrabalho: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      numeroEndereco: [null, [Validators.required]],
      complementoEndereco: [null],
      tipo: ['', [Validators.required]],
      conteudo: [null, [Validators.required]],
    });

    this.outraSolicitacao = history.state.outraSolicitacao;
  }

  ngOnInit(): void {
    this.getSolicitacoes(this.servidor.matricula, this.servidor.cpf);
    this.onSetValue(this.servidor);
    this.formRCH.controls['tipo'].valueChanges.subscribe((tipo) => {
      if (tipo === 'Lei 4177-A') {
        this.formRCH.controls['conteudo'].setValue(tipo);
      } else {
        this.formRCH.controls['conteudo'].setValue('');
      }
    });
  }

  onSetValue(servidor: Servidor) {
    this.formRCH.patchValue({
      matricula: servidor.matricula,
      cpf: servidor.cpf,
      rg: servidor.rg,
      nome: servidor.nome,
      secretaria: servidor.secretaria,
      localTrabalho: servidor.localTrabalho,
      cargo: servidor.cargo,
      cep: servidor.cep,
      endereco: servidor.endereco,
      bairro: servidor.bairro,
      numeroEndereco: servidor.numeroEndereco,
      complementoEndereco: servidor.complementoEndereco,
    });

    this.listasService
      .getMunicipioByCode(servidor.municipio)
      .subscribe((municipio) => {
        this.formRCH.controls['municipio'].setValue(municipio.nome);
      });
  }

  addFile(event: any) {
    const inputId: string = event.srcElement.id;
    const file: File = event.target.files[0];
    const size = file.size;
    const type = file.type;
    let renamedFile: File;
    let fileName: string;

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

    //renomeia de acordo com o input que recebe o arquivo
    if (inputId === 'laudo') {
      fileName = 'LaudoMedicoRCH';
      renamedFile = this.renameFile(file, fileName);
    } else {
      fileName = 'ComprovanteParentescoRCH';
      renamedFile = this.renameFile(file, fileName);
    }

    //remove o arquivo do array caso ja anexado anteriormente
    this.arrayFiles.forEach((file) => {
      if (file.name.slice(0, file.name.indexOf('.')) === fileName) {
        this.arrayFiles.splice(this.arrayFiles.indexOf(file), 1);
      }
    });

    this.arrayFiles.push(renamedFile);
  }

  renameFile(file: File, nome: String): File {
    const tipoString = String(file.type).slice(
      String(file.type).indexOf('/') + 1
    );
    const renamedFile = new File([file], `${nome}.${tipoString}`, {
      type: file.type,
    });
    return renamedFile;
  }

  enviarSolicitacaoRCH(solicitacao: ReducaoCH) {
    const INPTFILEPARENTESCO = document.querySelector('#parentesco') as HTMLInputElement;
    const INPTFILELAUDO = document.querySelector('#laudo') as HTMLInputElement;
    if (this.formRCH.invalid) {
      AppComponent.openSwal({message:"Preencha todos os campos"});
    } else if (!this.confirmacao.nativeElement.checked) {

      if(this.formRCH.controls['tipo'].value == 'Lei 4177-A')
      {
        AppComponent.openSwal({message:"Confirme a declaração de ciência"});
      } else if (
        INPTFILEPARENTESCO?.value != undefined &&
        INPTFILEPARENTESCO?.value == ''
      ) {
        AppComponent.openSwal({message:"Comprovante de parentesco não anexado"});
      } else if (
        INPTFILELAUDO?.value != undefined &&
        INPTFILELAUDO?.value == ''
      ) {
        AppComponent.openSwal({message:"Laudo médico não anexado"});
      } else {
        this.salvarSolicitacaoRCH(solicitacao, this.arrayFiles);
      }

    } else if (
      INPTFILEPARENTESCO?.value != undefined &&
      INPTFILEPARENTESCO?.value == ''
    ) {
      AppComponent.openSwal({message:"Comprovante de parentesco não anexado"});
    } else if (
      INPTFILELAUDO?.value != undefined &&
      INPTFILELAUDO?.value == ''
    ) {
      AppComponent.openSwal({message:"Laudo médico não anexado"});
    } else {
      this.salvarSolicitacaoRCH(solicitacao, this.arrayFiles);
    }
  }

  salvarSolicitacaoRCH(solicitacao: ReducaoCH, arquivos: File[]){
    this.rchService.salvalSolicitacaoRCH(solicitacao, arquivos).subscribe({
      next: (res) => {
        this._snackbar.open('Solicitação realizada com sucesso', 'OK', { duration: 3000,});
        this.rota.navigate(['/solicitacoes/reducao-carga-horaria/protocolo', String(res.id).padStart(4,"0")], {relativeTo: this.rotaAtual, state: {data: res}});
      },
      error: (error) => {
        AppComponent.openSwal({message:"Falha ao enviar solicitação", text: error.error.message});
      }
    });
  }

  showHelp(){
    const message: string = "Redução de Carga Horária";
    const icon: SweetAlertIcon = "info";
    const html: string = "<strong>Lei 4177-A</strong>"
    +"<p>Projeto de Lei nº 57/21de autoria do Vereador Jabá. Dispõe sobre a redução da "
    +"carga horária do servidor público municipal que seja pai ou mãe, tutor, curador ou "
    +"responsável por pessoa com necessidades especiais e dá outras providências. </p>"
    +"<p><strong>Mais informações acesse:</strong> "
    +"<a href=\"http://sintramem-sv.org.br/sintramem/wp-content/uploads/2023/05/LEI-No-4177-A.pdf\">LEI Nº 4177-A</a> </p>";
    AppComponent.openSwal({message, html, icon});
  }

  getSolicitacoes(matricula: number, cpf: string | number){
    this.rchService.getSolicitacoes(matricula, cpf).subscribe({
      next: (solicitacoes) =>{
        if(!this.outraSolicitacao && solicitacoes.length > 0){
          this.rota.navigate(['/solicitacoes/reducao-carga-horaria/realizada']);
        }
      }
    })
  }
}
