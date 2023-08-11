import { jsPDF } from 'jspdf';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imprimir-protocolo',
  templateUrl: './imprimir-protocolo.component.html',
  styleUrls: ['./imprimir-protocolo.component.scss']
})
export class ImprimirProtocoloComponent {

  dadosProtocolo: any;
  dataProtocolo: Date;
  protocolo: string;

  @ViewChild ('impressao', {static: false}) impressao!: ElementRef;
  @ViewChild ('pdf') embed !: ElementRef;

  constructor(private rota: Router){
    this.dadosProtocolo = history.state.data[0];
    this.dataProtocolo = history.state.data[1];
    this.protocolo = history.state.data[2]
  }

  ngAfterViewInit(): void {
    this.generatePDF();
  }

  generatePDF(){
    const doc = new jsPDF('p', 'pt', 'a4');
    const a = document.querySelector('a') as HTMLElement;
    doc.html(this.impressao.nativeElement, {
      callback: pdf => {
        let footer = "Telefone Gestão de Pessoas: (13) 3579-1448";

        //centraliza o texto no final da pagina de acordo com o tamanho do texto e da apágina
        // const textWidth = pdf.getStringUnitWidth(footer) * pdf.getFontSize() / pdf.internal.scaleFactor;
        // let x = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
        // pdf.text("Telefone Gestão de Pessoas: (13) 3579-1448", x , 800).setFontSize(12);

        //aplica url criada do pdf no elemento embed no html
        this.embed.nativeElement.setAttribute("src", pdf.output('datauristring'));

        //realiza o download caso o display seja mobile
        if(document.querySelector('body')!.clientWidth < 850){
          pdf.save(`protocolo_recadastramento_${this.protocolo}.pdf`);
          this.rota.navigate(['/solicitacoes/inicio']);
        }
      }
    })
  }

}
