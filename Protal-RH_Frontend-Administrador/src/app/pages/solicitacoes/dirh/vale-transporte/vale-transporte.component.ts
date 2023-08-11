import { DatePipe, Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ValeTransporteService } from 'src/app/services/solicitacoes/dirh/vale-transporte/vale-transporte.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vale-transporte',
  templateUrl: './vale-transporte.component.html',
  styleUrls: ['./vale-transporte.component.scss']
})
export class ValeTransporteComponent {

  /// variavel das colunas
  displayedColumns = ['id', 'matricula', 'cpf', 'nome','operacao','dtPedido', 'dtConcluido'];

  // array para armazenar os servidores e exportar para o excel
  servidores : any[] = []

  // Variaveis dos filtros
  concluido = false

  // Variavel do excel
  fileName = 'ExcelSheet.xlsx';

  // Variavel verificacao

  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor
  (
    private location : Location,
    private valeService : ValeTransporteService,
    private router : Router
  )
  {

  }

  ngOnInit()
  {
    this.getAllSolicitacoesByStatus('')
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  getAllSolicitacoesByStatus(botao : any)
  {

    if(botao != '')
    {
      if(this.concluido) this.concluido = false
      else this.concluido = true
    }

    this.valeService.getAllSolicitacoesByStatus(this.concluido).subscribe(res => {

      this.dataSource.data = res

      this.servidores = []

      if(res.length > 0)
      {
        for(const element of res)
        {
            let date = new DatePipe('en-US')

            let servidor = {
              'Protocolo' : element.id,
              'Matricula' : element.matricula,
              'CPF' : element.cpf,
              'RG' : element.rg,
              'Nome Completo' : element.nome,
              'Endereço' : element.endereco,
              'Bairro' : element.bairro,
              'Cidade' : element.cidade,
              'Cargo' : element.cargo,
              'Data do Pedido' : date.transform(element.dtPedido, 'dd/MM/yyyy HH:mm'),
              'Período' : element.periodo,
              'concluido' : element.concluido? 'Concluído' : 'Em aberto'
            }

            this.servidores.push(servidor)
        }
      }
    })


  }


  public doFilter = (value: string) => {

    this.dataSource.filter = value.trim().toLocaleLowerCase();

  }

  back()
  {
    this.location.back()
  }

  redirectDetails(servidor : any)
  {
    this.router.navigate(['solicitacoes/dirh/vale-transporte/detalhes'], {state:{data: servidor.id}})
  }

  exportexcel(): void
  {
    /* pass here the table id */
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.servidores);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatorio');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


}
