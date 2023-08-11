import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styleUrls: ['./protocolo.component.scss']
})
export class ProtocoloComponent {

  dadosServidor: any;
  dataEnvio: Date = new Date;
  dadosImpressao: any;
  protocolo : string;


  constructor(
    private rota: Router,
    private rotaAtual: ActivatedRoute
    ){
    this.dadosImpressao = history.state.data;
    this.dadosServidor = history.state.data[0];
    this.dataEnvio = history.state.data[1];
    this.protocolo = history.state.data[2];
  }


  ngOnInit(): void {

  }

  redirectToPDF(){
    this.rota.navigate(['/recadastramento/imprimir-protocolo', this.protocolo ], {relativeTo: this.rotaAtual, state:{data: this.dadosImpressao}})
  }


}
