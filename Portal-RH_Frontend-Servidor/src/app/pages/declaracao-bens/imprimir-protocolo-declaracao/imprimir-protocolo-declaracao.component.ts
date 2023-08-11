import { DeclaracaoBens } from '../../../models/declaracao-bens/declaracao-bens.model';
import { jsPDF } from 'jspdf';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imprimir-protocolo-declaracao',
  templateUrl: './imprimir-protocolo-declaracao.component.html',
  styleUrls: ['./imprimir-protocolo-declaracao.component.scss'],
})
export class ImprimirProtocoloDeclaracaoComponent {
  declaracao: DeclaracaoBens;
  exercicio: number;

  @ViewChild('impressao', { static: false }) impressao!: ElementRef;
  @ViewChild('pdf') embed!: ElementRef;
  constructor(private rota: Router) {
    this.declaracao = history.state.data;
    this.exercicio = this.declaracao.exercicio;
  }

  ngAfterViewInit(): void{
    this.generatePDF();
  }

  generatePDF() {
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.html(this.impressao.nativeElement, {
      callback: (pdf) => {
        let footer = 'Telefone Gestão de Pessoas: (13) 3579-1448';

        //aplica url criada do pdf no elemento embed no html
        this.embed.nativeElement.setAttribute(
          'src',
          pdf.output('datauristring')
        );
        //realiza o download caso o display seja mobile
        if (document.querySelector('body')!.clientWidth < 850) {
          pdf.save(`protocolo_declaracao_bens_${this.declaracao.id}.pdf`);
          this.rota.navigate(['/declaracao-bens']);
        }
      },
    });
  }
}
