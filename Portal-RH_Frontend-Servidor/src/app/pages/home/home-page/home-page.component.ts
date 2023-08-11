import { Component, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AndamentoServidor } from 'src/app/models/servidor/andamento.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AndamentoServidorComponent } from '../dialogs/andamento-servidor/andamento-servidor.component';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { ServidorService } from 'src/app/services/recadastramento/servidor/servidor.service';
import { Aviso } from 'src/app/models/servidor/aviso.model';
import { DeclaracaoService } from 'src/app/services/declaracao-bens/declaracao/declaracao.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AvisoServidorComponent } from '../dialogs/aviso-servidor/aviso-servidor.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  andamentos: AndamentoServidor[];
  avisos: Aviso[] = [];
  filtroAndamentos: FormGroup;
  solicitacoesRealizadas: string[];
  andamentosSelec =  new MatTableDataSource<AndamentoServidor>();
  displayedColumns: string[] = ['idSolicitacao', 'dataOcorrencia'];
  servidor: Servidor;
  dtNow: Date;
  dtNasc: Date;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private recadService: ServidorService,
    private decBensService: DeclaracaoService,

  ) {
    this.andamentos = JSON.parse(auth.getAndamentos());
    this.andamentos.forEach((andamento) => {
      andamento.tipoSolicitacao = this.getNameAndamento(andamento.tipoSolicitacao);
    });

    this.filtroAndamentos = fb.group({
      solicitacao: ['', [Validators.required]],
    });

    this.solicitacoesRealizadas = this.distinctSolicitacoes(this.andamentos);
    this.servidor = JSON.parse(auth.getServidor());
    const datenowString = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1');
    this.dtNow = new Date(datenowString);
    this.dtNasc = new Date(this.servidor.dtNascimento);
  }

  ngOnInit(): void {
    this.filtroAndamentos.controls['solicitacao'].valueChanges.subscribe((value) => {
        this.andamentosSelec.data = [];
        this.andamentos.forEach((andamento) => {
          if (value == andamento.tipoSolicitacao) {
            this.andamentosSelec.data.push(andamento);
            this.andamentosSelec.paginator = this.paginator;
          }
        });
    });
    this.getAvisos();
  }

  //metodo que retorna quais solicitacoes foram realizados de acordo com os andamentos
  distinctSolicitacoes(andamentos: AndamentoServidor[]): string[] {
    return [...new Set(andamentos.map((item) => item.tipoSolicitacao))];
  }

  getNameAndamento(tipoAndamento: string): string {
    let nome: string = '';
    switch (tipoAndamento) {
      case 'ValeTransporte':
        nome = 'Vale Transporte';
        break;
      case 'Declaracao':
        nome = 'Requisição de Declaração';
        break;
      case 'LicencaPremio':
        nome = 'Contagem de Licença Prêmio';
        break;
      case 'ReducaoHorario':
        nome = 'Redução de Carga Horária';
        break;
      case 'LicSemVencimento':
        nome = 'Licença sem Vencimento';
        break;
    }
    return nome;
  }

  //abre dialog/modal com os detalhes do andamento
  openDetailsAndamento(andamento: AndamentoServidor) {
    const container = document.getElementsByTagName('body')[0] as HTMLBodyElement;

    if (container.clientWidth > 1400) {
      this.dialog.open(AndamentoServidorComponent, {
        position: { top: '30vh', left: '45vw' },
        data: andamento,
      });
    } else {
      this.dialog.open(AndamentoServidorComponent, {
        position: { top: '30vh' },
        data: andamento,
      });
    }
  }

  openDetailsAviso(aviso: Aviso){
    const container = document.getElementsByTagName('body')[0] as HTMLBodyElement;

    if (container.clientWidth > 1400) {
      this.dialog.open(AvisoServidorComponent, {
        position: {top: '30vh', left: '45vw'},
        data: aviso,
      });
    } else {
      this.dialog.open(AvisoServidorComponent, {
        position: { top: '30vh' },
        data: aviso,
      });
    }
  }

  getAvisos(){
    //recadastramento
    this.getAvisoRecadastramento();
    //declaração de bens
    this.getAvisoDeclaracaoBens();
  }

  getAvisoRecadastramento(){
    this.recadService.getProtocolo(this.servidor.matricula, this.servidor.cpf, new Date().getFullYear())
    .subscribe({
      next: (protocolo)=>{
        if(protocolo.statusValidacao=="Inválido"){
          const aviso: Aviso = {
            titulo: 'Recadastramento inválido',
            conteudo: 'Seu recadastramento foi invalidado por algum motivo, refaça antes do prazo',
            url: '/recadastramento/'
          };
          this.avisos.push(aviso);
        }
    },
    error: (err)=>{
      if(err.status == 404){
        const aviso: Aviso = {
          titulo: 'Realizar recadastramento',
          conteudo: `Realize o recadastramento até o mês do seu aniversário`,
          url: 'recadastramento/'
        };
        this.avisos.push(aviso);
      } else if (err.status == 500){
        const aviso: Aviso = {
          titulo: 'Erro no recadastramento',
          conteudo: `Seu recadastramento teve um problema ao realizar o envio, vá até a página de recadastramento e verifique`,
          url: 'recadastramento/'
        };
        this.avisos.push(aviso);
      }
    }});

  }

  getAvisoDeclaracaoBens(){
    this.decBensService.getProtocolo(this.servidor.matricula, this.servidor.cpf, new Date().getFullYear()-1)
    .subscribe({
      error: (err) => {
        if(err.status == 404){
          const aviso: Aviso = {
            titulo: `Declaração de Bens de ${new Date().getFullYear()-1}`,
            conteudo: `Você ainda não enviou a declaração de bens do exercício ${new Date().getFullYear()-1}`,
            url: '/declaracao-bens/declaracoes'
          };
          this.avisos.push(aviso)
        }
      }
    })
    this.decBensService.getProtocolo(this.servidor.matricula, this.servidor.cpf, new Date().getFullYear()-2)
    .subscribe({
      error: (err) => {
        if(err.status == 404){
          const aviso: Aviso = {
            titulo: `Declaração de Bens de ${new Date().getFullYear()-2}`,
            conteudo: `Você ainda não enviou a declaração de bens do exercício ${new Date().getFullYear()-2}`,
            url: '/declaracao-bens/declaracoes'
          };
          this.avisos.push(aviso)
        }
      }
    })
  }

}
