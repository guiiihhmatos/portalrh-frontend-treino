import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-reducao-carga-horaria',
  templateUrl: './pdf-reducao-carga-horaria.component.html',
  styleUrls: ['./pdf-reducao-carga-horaria.component.scss']
})
export class PdfReducaoCargaHorariaComponent {
  servidor : any;
  data = new Date()
  dia = this.data.getUTCDate()
  mes = this.data.getMonth()
  ano = this.data.getFullYear()
  usuario = ''

  mesString = ''

  nomeUpper : any

  meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "dezembro"]

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

    const palavras = this.servidor.nome.toLowerCase().split(" ");

    for (let i = 0; i < palavras.length; i++) {
        palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substr(1);
    }

    this.nomeUpper = palavras.toString()

    this.nomeUpper = this.nomeUpper.replaceAll(",", " ")

    this.getLogin()
  }

  generatePDF(){
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.html(this.impressao.nativeElement, {
      callback: pdf => {
        pdf.save(`solicitacao_reducao_cargaHoraria_${this.servidor.matricula}.pdf`)
      }
    })
  }

  getLogin()
  {
    this.usuario = this.authService.getLogin()
  }

}
