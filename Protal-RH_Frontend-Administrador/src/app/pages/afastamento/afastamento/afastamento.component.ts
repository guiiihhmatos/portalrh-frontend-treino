import { DatePipe, Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfastamentoService } from 'src/app/services/afastamento/afastamento.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-afastamento',
  templateUrl: './afastamento.component.html',
  styleUrls: ['./afastamento.component.scss']
})
export class AfastamentoComponent {

  public displayedColumns = ['matricula', 'nome', 'localTrabalho', 'dias', 'dataInicio', 'dataRetorno', 'motivo'];

  fileName = 'ExcelSheet.xlsx';
  servidores : any[] = []

  servidor : any

  registro : any
  secretaria : string = ''

  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor
  (
    private afastados : AfastamentoService,
    private location : Location,
    private auth: AuthService
  ){}

  ngOnInit()
  {
    this.registro = this.auth.getRegistro()
    this.getServidorByMatricula()

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getServidorByMatricula()
  {
    this.afastados.getServidorByMatricula(this.registro).subscribe({

      next: (res) => {

        this.servidor = res;
        this.secretaria = res.secretaria

        this.getAllServidoresAfastados(res.cdSecretaria)
      }

    })
  }

  getAllServidoresAfastados(cdSecretaria : any)
  {
    this.afastados.getAllServidoresAfastados(cdSecretaria).subscribe({

      next: (res) => {
        this.dataSource.data = res

        this.servidores = []

        for(const element of res)
        {
            let date = new DatePipe('en-US')

            let servidor = {
              'Nome Completo' : element.nome,
              'Matricula' : element.matricula,
              'Local de Trabalho' : element.localTrabalho,
              'Motivo' : element.motivo,
              'Data Inicio' : date.transform(element.dataInicio, 'dd/MM/yyyy'),
              'Data de Retorno' : date.transform(element.dataRetorno, 'dd/MM/yyyy'),
              'Dias' : element.dias,
            }

            this.servidores.push(servidor)
        }
      }

    })
  }

  public doFilter = (value: string) => {

    this.dataSource.filter = value.trim().toLocaleLowerCase();

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
