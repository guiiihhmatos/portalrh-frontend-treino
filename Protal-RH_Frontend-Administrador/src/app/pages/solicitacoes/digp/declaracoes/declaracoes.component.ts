import { DatePipe, Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeclaracoesGeralService } from 'src/app/services/solicitacoes/digp/declaracoes-geral/declaracoes-geral.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-declaracoes',
  templateUrl: './declaracoes.component.html',
  styleUrls: ['./declaracoes.component.scss']
})
export class DeclaracoesComponent {

  /// variavel das colunas
  displayedColumns = ['id', 'matricula', 'cpf','nome','tipo','dtPedido', 'dtConcluido'];

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
    private declaracoesService : DeclaracoesGeralService,
    private router : Router
  )
  {

  }

  ngOnInit()
  {
    this.getAllSolicitacoesByStatus('')
  }

  getAllSolicitacoesByStatus(botao : any)
  {

    if(botao != '')
    {
      if(this.concluido) this.concluido = false
      else this.concluido = true
    }

    this.declaracoesService.getAllSolicitacoesStatus(this.concluido).subscribe(res => {

      this.dataSource.data = res

      console.log(res)

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
              'Telefone' : element.telefone,
              'Email' : element.email,
              'Tipo' : element.tipo,
              'Data do Pedido' : date.transform(element.dtPedido, 'dd/MM/yyyy HH:mm'),
              'concluido' : element.concluido? 'Concluído' : 'Em aberto',
              'Data do Atendimento' : element.dtConcluido? date.transform(element.dtConcluido, 'dd/MM/yyyy HH:mm') : "Não concluido"
            }

            this.servidores.push(servidor)
        }
      }
    })


  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

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
    this.router.navigate(['solicitacoes/digp/declaracoes/detalhes'], {state:{data: servidor.id}})
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
