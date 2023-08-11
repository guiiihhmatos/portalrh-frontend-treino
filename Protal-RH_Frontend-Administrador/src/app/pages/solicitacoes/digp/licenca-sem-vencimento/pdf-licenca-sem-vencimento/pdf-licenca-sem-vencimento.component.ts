import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-pdf-licenca-sem-vencimento',
  templateUrl: './pdf-licenca-sem-vencimento.component.html',
  styleUrls: ['./pdf-licenca-sem-vencimento.component.scss']
})
export class PdfLicencaSemVencimentoComponent {

  servidor : any;
  data = new Date()
  dia = this.data.getUTCDate()
  mes = this.data.getMonth()
  ano = this.data.getFullYear()
  usuario = ''

  mesString = ''

  meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "dezembro"]

  nomeUpper : any
  localTrabalhoUpper : any

  @ViewChild ('impressao', {static: false}) impressao!: ElementRef;

  constructor
  (
    private authService : AuthService
  )
  {
    this.servidor = history.state.data

    for(let i = 0; i < this.meses.length; i++)
    {
      if(i == this.mes)
      {
        this.mesString = this.meses[i]
        break
      }
    }



    this.nomeUpper = this.alterarLetras(this.servidor.nome)

    this.localTrabalhoUpper = this.alterarLetras(this.servidor.localTrabalho)

    this.nomeUpper = this.nomeUpper.replaceAll(",", " ")

    this.localTrabalhoUpper = this.localTrabalhoUpper.replaceAll(",", " ")

    this.getLogin()
  }

  generatePDF(){
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.html(this.impressao.nativeElement, {
      callback: pdf => {
        pdf.save(`licenca_sem_vencimento_${this.servidor.matricula}.pdf`)
      }
    })
  }

  alterarLetras(palavra : any)
  {
    const palavras = palavra.toLowerCase().split(" ");

    for (let i = 0; i < palavras.length; i++) {
        palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substr(1);
    }

    return palavras.toString()
  }

  getLogin()
  {
    this.usuario = this.authService.getLogin()
  }

}
