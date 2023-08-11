import { ListaService } from './../../../services/recadastramento/lista/lista.service';
import { InfoServidorService } from './../../../services/recadastramento/info-servidor/info-servidor.service';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ServidorService } from 'src/app/services/declaracao/servidor/servidor.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent {

  public displayedColumns = ['id', 'matricula', 'nome', 'secretaria', 'exercicio', 'tipo'];

  cookieToken : any
  secretarias : any[] = []

  //variavel de classe do css
  disabled = 'select_desabilitado'

  divFiltro = false

  filtroSecretaria = false
  filtroExercicio = false

  secretaria : any
  anoExercicio : any

  data = new Date()
  anoAtual = this.data.getFullYear()

  anosExercicio : any[] = []

  fileName = 'ExcelSheet.xlsx';
  servidores : any[] = []

  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor
  (
    private router: Router,
    public rotaAtual: ActivatedRoute,
    private ServicesAdminService : ServidorService,
    private listaService : ListaService
  )
  {
  }

  ngOnInit() {

    this.getAllOwners();
    this.preencherAnos()
    this.getAllSecretariasByExercicio()

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  getAllOwners(){

    this.ServicesAdminService.getAllServidores(this.anoAtual - 1)
    .subscribe(res => {

      this.dataSource.data = res

      this.servidores = []

      for(const element of res)
      {
          let date = new DatePipe('en-US')
          let id = element.id

          let servidor = {
            'Protocolo' : element.id,
            'Matricula' : element.matricula,
            'Nome Completo' : element.nome,
            // 'CPF' : element.cpf,
            'Email' : element.email,
            'Secretaria' : element.secretaria,
            'Local de trabalho' : element.localTrabalho,
            // 'Cargo' : element.cargo,
            'Exercicio' : element.exercicio,
            'Data de Atualização' : date.transform(element.dtAtualizacao, 'dd/MM/yyyy'),
            'Tipo' : element.tipo ? element.tipo : '-',
            'Motivo da retificação' : element.motivoRetificacao ? element.motivoRetificacao : '-'

          }

          this.servidores.push(servidor)
      }

    })

  }

  getAllSecretarias()
  {
    this.listaService.getSecretarias().subscribe(value => {

      for(const element of value)
      {
        this.secretarias.push(element)
      }
    })
  }

  redirectDetails(servidor : any)
  {
    this.router.navigate(['declaracao/relatorio/detalhes'], {state:{data: servidor}})
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
      this.secretaria = ''
      this.anoExercicio = this.anoAtual - 1
      this.getAllOwners()
    }
  }

  ativarFiltro(filtro : string)
  {

    this.secretaria = ''
    this.anoExercicio = this.anoAtual - 1

    this.getAllOwners()

    switch(filtro)
    {
      case 'anoExercicio':

      this.filtroExercicio = true
      this.filtroSecretaria = false

      break;

      case 'secretaria':

      this.filtroExercicio = false
      this.filtroSecretaria = true

      break;
    }
  }

  public doFilter = (value: string) => {

    this.dataSource.filter = value.trim().toLocaleLowerCase();

  }

  getAllServidorByAnoExercicio()
  {
    if(this.anoExercicio == '')
    {
      this.getAllOwners()
    }
    else
    {
      this.servidores = []
      this.ServicesAdminService.getAllServidores(this.anoExercicio).subscribe(value => {

        this.dataSource.data = value
        for(const element of value)
        {
            let date = new DatePipe('en-US')

            let servidor = {
              'Protocolo' : element.id,
              'Matricula' : element.matricula,
              'Nome Completo' : element.nome,
              // 'CPF' : element.cpf,
              'Email' : element.email,
              'Secretaria' : element.secretaria,
              'Local de trabalho' : element.localTrabalho,
              // 'Cargo' : element.cargo,
              'Exercicio' : element.exercicio,
              'Data de Atualização' : date.transform(element.dtAtualizacao, 'dd/MM/yyyy'),
              'Tipo' : element.tipo ? element.tipo : '-',
              'Motivo da retificação' : element.motivoRetificacao ? element.motivoRetificacao : '-'

            }

            this.servidores.push(servidor)
        }
      })
    }

  }

  getAllServidorBySecretaria()
  {
    if(this.secretaria == '' || this.anoExercicio == '')
    {
      this.getAllOwners()
    }
    else
    {
      this.servidores = []
      this.ServicesAdminService.getAllServidoresBySecretariaAndExercicio(this.secretaria, this.anoExercicio).subscribe(value => {

        this.dataSource.data = value

        for(const element of value)
        {
            let date = new DatePipe('en-US')

            let servidor = {
              'Protocolo' : element.id,
              'Matricula' : element.matricula,
              'Nome Completo' : element.nome,
              // 'CPF' : element.cpf,
              'Email' : element.email,
              'Secretaria' : element.secretaria,
              'Local de trabalho' : element.localTrabalho,
              // 'Cargo' : element.cargo,
              'Exercicio' : element.exercicio,
              'Data de Atualização' : date.transform(element.dtAtualizacao, 'dd/MM/yyyy'),
              'Tipo' : element.tipo ? element.tipo : '-',
              'Motivo da retificação' : element.motivoRetificacao ? element.motivoRetificacao : '-'

            }

            this.servidores.push(servidor)
        }

      })
    }

  }

  preencherAnos()
  {
    for(let i = 2021; i <= this.anoAtual; i++)
    {
      this.anosExercicio.push(i)
    }

  }

  getAllSecretariasByExercicio()
  {
    this.ServicesAdminService.getAllSecretariasByExercicio(this.anoAtual - 1).subscribe(value => {

      this.secretarias = value
    })
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
