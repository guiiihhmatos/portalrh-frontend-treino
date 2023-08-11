import { DatePipe, Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbonoNatalService } from 'src/app/services/solicitacoes/dirh/abono-natal/abono-natal.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-abono-natal',
  templateUrl: './abono-natal.component.html',
  styleUrls: ['./abono-natal.component.scss']
})
export class AbonoNatalComponent {

  /// variavel das colunas
  displayedColumns = ['matricula', 'cpf', 'nome', 'dtPedido', 'exercicio', 'dtAniversario'];

  // Variaveis do mes e da data para pegar o mes atual
  data = new Date()
  mes = this.data.getMonth() + 1
  anoAtual = this.data.getFullYear()

  // array para armazenar os servidores e exportar para o excel
  servidores : any[] = []

  // Variaveis dos filtros
  divFiltro = false

  filtroMes = false
  filtroAnoExercicio = false

  // Variavel dos anos de exercicio
  anoExercicio = this.anoAtual
  anosExercicio : any[] = []

  // Variavel do excel
  fileName = 'ExcelSheet.xlsx';

  // Variavel verificacao

  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor
  (
    private abonoService : AbonoNatalService,
    private location : Location
  )
  {


  }

  ngOnInit()
  {
    this.getAllAbonoByMes()
    this.preencherAnos()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  getAllAbonoByMes()
  {
    this.abonoService.getAllAbonoByMes(this.mes).subscribe(res => {

      this.dataSource.data = res

      this.servidores = []

      if(res.length > 0)
      {
        for(const element of res)
        {
            let date = new DatePipe('en-US')

            let servidor = {
              'Matricula' : element.matricula,
              'CPF' : element.cpf,
              'Nome Completo' : element.nome,
              'Data do Pedido' : date.transform(element.dtPedido, 'dd/MM/yyyy'),
              'dtNascimento' : date.transform(element.dtAniversario, 'dd/MM/yyyy')
            }

            this.servidores.push(servidor)
        }
      }

    })
  }

  getAllAbonoByAnoExercicio()
  {

    this.abonoService.getAllSolicitacoesByExercicio(this.anoExercicio).subscribe(res => {

      this.dataSource.data = res

      this.servidores = []

      if(res.length > 0)
      {
        for(const element of res)
        {
            let date = new DatePipe('en-US')

            let servidor = {
              'Matricula' : element.matricula,
              'CPF' : element.cpf,
              'Nome Completo' : element.nome,
              'Data do Pedido' : date.transform(element.dtPedido, 'dd/MM/yyyy'),
              'dtNascimento' : date.transform(element.dtAniversario, 'dd/MM/yyyy')
            }

            this.servidores.push(servidor)
        }
      }

    })
  }

  preencherAnos()
  {
    for(let i = 2023; i <= this.anoAtual; i++)
    {
      this.anosExercicio.push(i)
    }

  }

  adicionarFiltro()
  {
    if(!this.divFiltro)
    {
      this.divFiltro = true
    }
    else
    {
      this.divFiltro = false
      this.doFilter(' ')
      this.getAllAbonoByMes()
    }
  }

  ativarFiltro(filtro : string)
  {

    this.getAllAbonoByMes()

    switch(filtro)
    {
      case 'mes':

      this.filtroMes = true
      this.filtroAnoExercicio = false

      break;

      case 'anoExercicio':

      this.filtroMes = false
      this.filtroAnoExercicio = true

      break;
    }
  }

  public doFilter = (value: string) => {

    this.dataSource.filter = value.trim().toLocaleLowerCase();

  }

  back()
  {
    this.location.back()
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
