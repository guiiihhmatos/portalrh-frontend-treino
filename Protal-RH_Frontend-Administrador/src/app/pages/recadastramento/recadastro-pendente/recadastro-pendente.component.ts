import { DatePipe, Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoServidorService } from 'src/app/services/recadastramento/info-servidor/info-servidor.service';
import { ListaService } from 'src/app/services/recadastramento/lista/lista.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-recadastro-pendente',
  templateUrl: './recadastro-pendente.component.html',
  styleUrls: ['./recadastro-pendente.component.scss']
})
export class RecadastroPendenteComponent {

  public displayedColumns = ['matricula', 'nome', 'secretaria', 'nascimento'];

  cookieToken : any
  secretarias : any[] = []

  secretaria = ''

  //variavel de classe do css
  disabled = 'select_desabilitado'

  divFiltro = false
  valAniversariante = false

  filtroSecretaria = false
  filtroSecretariaAno = false
  filtroAno = false

  data = new Date()
  anoAtual = this.data.getFullYear()
  mesAtual = this.data.getMonth() + 1

  cod_mes = 0

  fileName = 'ExcelSheet.xlsx';
  servidores : any[] = []

  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor
  (
    private router: Router,
    public rotaAtual: ActivatedRoute,
    private ServicesAdminService : InfoServidorService,
    private listaService : ListaService,
    private location : Location
  )
  {
    this.cod_mes = history.state.data;
  }

  ngOnInit() {

    this.getAllOwners();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  getAllOwners(){

    this.ServicesAdminService.getAllServidoresWithRecadastroPendente(this.cod_mes, this.anoAtual)
    .subscribe(res => {

      this.dataSource.data = res

      this.listaService.getSecretarias().subscribe(
        (res) => {
          res.forEach(secretaria => {
            for(const element of this.dataSource.data){
              if(element.secretaria == secretaria.codigo){
                element.secretaria = secretaria.sigla
              }
            }
          })
        }
      )

      this.servidores = []

      for(const element of res)
      {
          let date = new DatePipe('en-US')
          let servidor = {
            'Nome Completo' : element.nome,
            'Matricula' : element.matricula,
            'Data de Atualização' : date.transform(element.nascimento, 'dd/MM/yyyy'),
            'Secretaria' : element.secretaria
          }

          this.servidores.push(servidor)
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

  back()
  {
    this.location.back()
  }


}
