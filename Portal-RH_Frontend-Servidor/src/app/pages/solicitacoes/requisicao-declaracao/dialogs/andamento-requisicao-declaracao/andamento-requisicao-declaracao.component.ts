import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AndamentoRD, ProtocoloRequisicaoDeclaracao } from 'src/app/models/solicitacoes/requisicao-declaracao/protocolo-requisicao-declaracao.model';
import { RequisicaoDeclaracaoService } from 'src/app/services/solicitacoes/requisicao-declaracao/requisicao-declaracao.service';

@Component({
  selector: 'app-andamento-requisicao-declaracao',
  templateUrl: './andamento-requisicao-declaracao.component.html',
  styleUrls: ['./andamento-requisicao-declaracao.component.scss'],
})
export class AndamentoRequisicaoDeclaracaoComponent {

  andamento: AndamentoRD | null;
  protocolo: number;
  arquivos: any[] = [];
  constructor(
    dialogRef: MatDialogRef<AndamentoRequisicaoDeclaracaoComponent>,
    @Inject(MAT_DIALOG_DATA) public solicitacao: ProtocoloRequisicaoDeclaracao,
    private RDService: RequisicaoDeclaracaoService
  ) {
    this.andamento = this.getLastAndamento(solicitacao.andamento);
    this.protocolo = solicitacao.id;
  }

  ngOnInit(): void {
    this.getArquivos(this.protocolo);
  }

  getLastAndamento(andamentos: AndamentoRD[]): AndamentoRD | null{

    if(andamentos.length < 1 || andamentos == null){
      return null;
    }
    //aplica os ids de andamento em um array
    let idsAndamento: number[] = [];
    andamentos.forEach(andamento =>{
      idsAndamento.push(andamento.id);
    })

    //function que verifica qual o maior id do array e armazena em uma variavel
    // if(idsAndamento)
    let lastAndamento:any = idsAndamento.reduce(function(a:number,b:number){
      return Math.max(a,b);
    });

    //aplica na variavel o objeto do andamento
    andamentos.forEach(andamento => {
      if(andamento.id === lastAndamento){
        lastAndamento = andamento as AndamentoRD;
      }
    })
    return lastAndamento;
  }

  getArquivos(protocolo: number){
    this.RDService.listarArquivos(protocolo).subscribe({
      next: (res) => {
        this.arquivos = res;
      },
      error: (error) => {

      }
    })
  }

  verArquivo(urlDownload : string, tipo : string, protocolo: number)
  {
    this.RDService.downloadArquivo(protocolo, urlDownload).subscribe({
      next: (res) => {
        var contentDisposition = res.headers.get('content-disposition')

        // this.type = res.body.type

        if(contentDisposition != null)
        {
          var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        }

        if(tipo == 'visualizar')
        {
          this.viewFile(res)
        }
        else
        {
          this.downloadFile(res)
        }
      },
      error: (err) => {
        console.log("erro")
      }
    })
  }

  viewFile(response : any) {
    let header_content = response.headers.get('content-disposition');
    let file = header_content.split('=')[1];
    file = file.substring(1, file.length);
    let extension = file.split('.')[1];

    var newBlob = new Blob([response.body], { type: this.createFileType(extension)})

    var fileURL = URL.createObjectURL(newBlob)

      window.open(fileURL)
  }

  downloadFile(response : any) {
    let header_content = response.headers.get('content-disposition');
    let file = header_content.split('=')[1];
    file = file.substring(1, file.length);
    let extension = file.split('.')[1];

    var newBlob = new Blob([response.body], { type: this.createFileType(extension)})

    var link = document.createElement('a')
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download = file;
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 400)
  }

  createFileType(e : any): string {
    let fileType: string = "";
    if (e == 'pdf' || e == 'csv') {
      fileType = `application/${e};base64`;
    }
    else if (e == 'jpeg' || e == 'jpg' || e == 'png') {
      fileType = `image/${e};base64`;
    }

    return fileType;
  }


}
