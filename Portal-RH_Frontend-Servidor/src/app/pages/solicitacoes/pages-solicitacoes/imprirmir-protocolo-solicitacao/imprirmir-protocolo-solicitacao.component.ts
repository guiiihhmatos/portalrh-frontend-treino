import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';

@Component({
  selector: 'app-imprirmir-protocolo-solicitacao',
  templateUrl: './imprirmir-protocolo-solicitacao.component.html',
  styleUrls: ['./imprirmir-protocolo-solicitacao.component.scss']
})
export class ImprirmirProtocoloSolicitacaoComponent {

  protocolo: ImpressaoProtocoloSolicitacao;
  terms: any;
  termsIsObject: boolean = false
  @ViewChild ('impressao', {static: false}) impressao!: ElementRef;
  @ViewChild ('pdf') embed !: ElementRef;


  constructor(private rota: Router){
    this.protocolo = history.state.data;
    this.terms = this.protocolo?.termos;
  }

  ngOnInit(): void {

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
        const textWidth = pdf.getStringUnitWidth(footer) * pdf.getFontSize() / pdf.internal.scaleFactor;
        let x = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
        pdf.text(footer, x , 800).setFontSize(12);

        //aplica url criada do pdf no elemento embed no html
        this.embed.nativeElement.setAttribute("src", pdf.output('datauristring'));

        //realiza o download caso o display seja mobile
        if(document.querySelector('body')!.clientWidth < 850){
          pdf.save(`protocolo_${this.protocolo.tipo}_${this.protocolo.numero}.pdf`);
          this.rota.navigate(['/solicitacoes/inicio']);
        }
      }
    })
  }
}
