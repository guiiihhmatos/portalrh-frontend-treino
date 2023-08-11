import { LicencaSemVencimentoService } from './../../../../services/solicitacoes/licenca-sem-vencimento/licenca-sem-vencimento.service';
import { LicencaSV } from './../../../../models/solicitacoes/licenca-sem-vencimento/licenca-sem-vencimento.model';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListasService } from 'src/app/services/listas/listas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TermsComponent } from '../dialogs/terms/terms.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-formulario-licenca-sem-vencimento',
  templateUrl: './formulario-licenca-sem-vencimento.component.html',
  styleUrls: ['./formulario-licenca-sem-vencimento.component.scss'],
})
export class FormularioLicencaSemVencimentoComponent {
  servidor: Servidor;
  formLSV: FormGroup;
  termsAccepted: boolean = false;
  confirmLSV: boolean = false;
  outraSolicitacao: boolean = false;
  minDateIni = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1');
  minDateEnd = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1');

  @ViewChild('confirmacao') confirmacao!: ElementRef;
  @ViewChild('iniLSV') iniLSV!: ElementRef;
  @ViewChild('endLSV') endLSV!: ElementRef;
  @ViewChild('tipo') tipo!: ElementRef;
  terms: any[] = [];
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private listasService: ListasService,
    private LSVService: LicencaSemVencimentoService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private _snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.servidor = JSON.parse(auth.getServidor());
    this.outraSolicitacao = history.state.outraSolicitacao;

    this.formLSV = fb.group({
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
      conteudo: [null],
      contribuicao: [null]
    });

  }

  ngOnInit(): void {
    this.getSolicitacoesLSV(this.servidor.matricula, this.servidor.cpf);

    this.onSetValue(this.servidor);

  }

  onSetValue(servidor: Servidor) {
    this.formLSV.patchValue({
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
        this.formLSV.controls['municipio'].setValue(municipio.nome);
      });
  }

  enviarSolicitacaoLSV(solicitacao: LicencaSV) {
    if (this.formLSV.invalid) {
      AppComponent.openSwal({message:"Preencha todos os campos"});
    } else if (!this.confirmacao.nativeElement.checked) {
      AppComponent.openSwal({message:"Confirme a declaração de ciência"});
    } else if(this.iniLSV.nativeElement.value == "" || this.endLSV.nativeElement.value == ""){
      AppComponent.openSwal({message:"Preencha o periodo completo da licença"});
    } else if(this.iniLSV.nativeElement.value > this.endLSV.nativeElement.value
      || new Date(this.iniLSV.nativeElement.value) < new Date()
      || new Date(this.endLSV.nativeElement.value) < new Date()){
        AppComponent.openSwal({message:"Datas inválidas"});
    } else {
      solicitacao.conteudo = `Licença para tratar de interesses particulares no período de ${new Date(this.iniLSV.nativeElement.value).toLocaleDateString("pt-BR", {timeZone: 'UTC'})} `
      +`até ${new Date(this.endLSV.nativeElement.value).toLocaleDateString("pt-BR", {timeZone: 'UTC'})} `
      +`${this.tipo.nativeElement.value} da previdência`;
      solicitacao.contribuicao = this.tipo.nativeElement.value == "com contribuição";

      this.LSVService.salvarSolicitacaoLSV(solicitacao).subscribe(
        (res) => {
          this._snackbar.open('Solictação de licença para tratar de interesses particulares realizada com sucesso','OK',{ duration: 3000 });
          this.rota.navigate([ '/solicitacoes/licenca-sem-vencimento/protocolo/',String(res.id).padStart(4, '0')],
          {relativeTo: this.rotaAtual, state: { data: {"solicitacao" : res, "tipo" : this.tipo.nativeElement.value, "termos": this.terms} } }
          );
        },
        (error) => {
          AppComponent.openSwal({message:"Erro ao enviar as informações", text: error.error.message});
      });
    }
  }


  openTerms() {
    this.confirmacao.nativeElement.checked = false;
    const dtAdmissao = new Date(this.servidor.dtAdmissao);
    const dtLim = new Date('2010-11-05');
    const massa = dtAdmissao <= dtLim ? '1' : '2';
    this.LSVService.getTerms().subscribe((res) => {
      res.forEach((terms) => {
        if (terms.tipo == this.tipo.nativeElement.value && terms.massa == massa) {
          this.openDialog(terms);
          this.terms = terms.declaracoes;
        }
      });
    });
  }

  openDialog(terms: any) {
    const dialogRef = this.dialog.open(TermsComponent, {
      data: { terms, accept: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.confirmacao.nativeElement.checked = true;
      }
    });
  }

  releaseForm() {
    this.confirmLSV = true;
    this.ngOnInit();
  }

  //método para redirecionar a página se solicitação realizada caso ja exista
  getSolicitacoesLSV(matricula: number, cpf: string) {
    this.LSVService.getSolicitacoesLSV(matricula, cpf).subscribe(
      (solicitacoes) => {
         if(!this.outraSolicitacao && solicitacoes.length > 0){
            this.rota.navigate(['/solicitacoes/licenca-sem-vencimento/realizada']);
        }
      }
    );
  }
}
