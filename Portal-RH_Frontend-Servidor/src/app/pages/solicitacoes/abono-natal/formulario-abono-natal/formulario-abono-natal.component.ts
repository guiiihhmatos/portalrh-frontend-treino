import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AbonoNatalService } from './../../../../services/solicitacoes/abono-natal/abono-natal.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Servidor } from './../../../../models/servidor/servidor.model';
import { AbonoNatal } from './../../../../models/solicitacoes/abono-natal/abono-natal.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SweetAlertIcon } from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-formulario-abono-natal',
  templateUrl: './formulario-abono-natal.component.html',
  styleUrls: ['./formulario-abono-natal.component.scss'],
})
export class FormularioAbonoNatalComponent {
  formAbono: FormGroup;
  servidor: Servidor;
  solicitar: boolean = false;
  @ViewChild('confirmacao') confirmacao!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private abonoService: AbonoNatalService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.formAbono = this.fb.group({
      id: [null],
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      dtAniversario: [null, [Validators.required]],
    });

    this.servidor = JSON.parse(auth.getServidor());
    this.onSetValue(this.servidor);
  }

  ngOnInit(): void {
    const matricula = Number(this.servidor.matricula);
    const cpf = this.servidor.cpf;
    const exercicio = new Date().getFullYear();
    this.getProtocolo(matricula, cpf, exercicio);
  }

  salvarSolicitacaoAbonoNatal(solicitacao: AbonoNatal) {
    if (!this.confirmacao.nativeElement.checked) {
      AppComponent.openSwal({message:'Confirme a declaração de ciência'});
    } else {
      this.abonoService.saveSolicitacao(solicitacao).subscribe(
        (res) => {
          this.rota.navigate(['../protocolo', res.id], {
            relativeTo: this.rotaAtual,
            state: { data: res },
          });
        },
        (error) => {
          if(error.status == 400){
            let prazoMaximo = new Date(
              this.servidor.dtNascimento
            ).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            prazoMaximo =
              String(
                Number(prazoMaximo.slice(prazoMaximo.indexOf('/') + 1,prazoMaximo.lastIndexOf('/')))-1
              ).padStart(2, '0') + '/' +
              new Date().getFullYear();
            AppComponent.openSwal({message:error.error.message,text:'Prazo maximo do exercicio atual: ' + prazoMaximo});
          } else {
            AppComponent.openSwal({message: "Erro ao enviar a solicitação",text: error.error.message})
          }
        }
      );
    }
  }

  onSetValue(servidor: Servidor) {
    this.formAbono.patchValue({
      matricula: servidor.matricula,
      cpf: servidor.cpf,
      nome: servidor.nome,
      dtAniversario: servidor.dtNascimento,
    });
  }

  getProtocolo(matricula: number, cpf: string, exercicio: number) {
    this.abonoService.getProtocolo(matricula, cpf, exercicio).subscribe(
      (res) => {
        this.rota.navigate(
          ['../solicitacao-realizada/', String(res.id).padStart(4, '0')],
          { relativeTo: this.rotaAtual, state: { data: res } }
        );
      },
      () => {}
    );
  }

  enableSubmit(){
    if(this.confirmacao.nativeElement.checked){
      this.solicitar = true;
    } else {
      this.solicitar = false;
    }
  }

  showHelp() {
    const message: string = "Abono de natal";
    const icon: SweetAlertIcon = "info";
    const text: string = "A solicitação do não recebimento do abono de natal referente ao ano atual "
    + "deve ser realizada com o prazo máximo ao mês anterior do seu aniversário";
    AppComponent.openSwal({message: message, text: text, icon: icon});
  }
}
