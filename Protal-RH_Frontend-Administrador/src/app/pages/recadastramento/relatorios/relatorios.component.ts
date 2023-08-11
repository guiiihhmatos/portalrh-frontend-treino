import { ListaService } from './../../../services/recadastramento/lista/lista.service';
import { InfoServidorService } from './../../../services/recadastramento/info-servidor/info-servidor.service';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent {
  public displayedColumns = ['matricula', 'nome', 'secretaria', 'dtAtualizacao', 'protocolo', 'statusValidacao'];

  cookieToken : any
  secretarias : any[] = []

  secretaria = ''
  ano = ''

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
    private ServicesAdminService : InfoServidorService,
    private listaService : ListaService
  )
  {
  }

  ngOnInit() {

    this.getAllOwners();
    this.getAllSecretarias()
    this.preencherAnos()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  redirectDetails(servidor : any)
  {
    this.router.navigate(['recadastramento/relatorio/detalhes'], {state:{data: servidor}})
  }

  getAllOwners(){

    this.ServicesAdminService.getAllServidores(this.anoAtual)
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
          let id = element.id

          let servidor = {
            'Nome Completo' : element.nome,
            'Matricula' : element.matricula,
            'Exercicio' : element.exercicio,
            'Data de Atualização' : date.transform(element.dtAtualizacao, 'dd/MM/yyyy'),
            'Secretaria' : element.secretaria,
            'Protocolo' : String(id + element.dtAtualizacao.slice(0, 4)).padStart(8, "0"),
            'Status' : element.statusValidacao
          }

          this.servidores.push(servidor)
      }

    })

  }

  getAllSecretarias()
  {
    this.listaService.getSecretarias().subscribe(value => {

      for(let i = 0; i < value.length; i++)
      {
        this.secretarias.push(value[i])
      }
    })
  }

  getAllServidorBySecretaria()
  {

    if(this.secretaria == '')
    {
      this.getAllOwners()
    }
    else
    {

      this.servidores = []

      this.ServicesAdminService.getAllServidorBySecretaria(this.secretaria, this.anoAtual).subscribe(value => {

        this.dataSource.data = value

        for(const element of value)
        {
            let date = new DatePipe('en-US')
            let id = element.id

            let servidor = {
              'Nome Completo' : element.nome,
              'Matricula' : element.matricula,
              'Exercicio' : element.exercicio,
              'Data de Atualização' : date.transform(element.dtAtualizacao, 'dd/MM/yyyy'),
              'Secretaria' : element.secretaria,
              'Protocolo' : String(id + element.dtAtualizacao.slice(0, 4)).padStart(8, "0"),
              'Status' : element.statusValidacao
            }

            this.servidores.push(servidor)
        }
      })
    }


  }

  getAllAniversariantesByMes()
  {

    this.servidores = []

    this.ServicesAdminService.getAllServidoresByMes(this.mesAtual, this.anoAtual).subscribe( res => {

      this.dataSource.data = res

      for(const element of res)
      {
          let date = new DatePipe('en-US')
          let id = element.id

          let servidor = {
            'Nome Completo' : element.nome,
            'Matricula' : element.matricula,
            'Exercicio' : element.exercicio,
            'Data de Atualização' : date.transform(element.dtAtualizacao, 'dd/MM/yyyy'),
            'Secretaria' : element.secretaria,
            'Protocolo' : String(id + element.dtAtualizacao.slice(0, 4)).padStart(8, "0"),
            'Status' : element.statusValidacao
          }

          this.servidores.push(servidor)
      }

    })

  }

  getAllServidorByAno()
  {
    if(this.ano == '')
    {
      this.getAllOwners()
    }
    else
    {
      this.servidores = []
      this.ServicesAdminService.getAllServidorByAno(this.ano).subscribe(value => {

        this.dataSource.data = value
        for(const element of value)
        {
            let date = new DatePipe('en-US')
            let id = element.id

            let servidor = {
              'Nome Completo' : element.nome,
              'Matricula' : element.matricula,
              'Exercicio' : element.exercicio,
              'Data de Atualização' : date.transform(element.dtAtualizacao, 'dd/MM/yyyy'),
              'Secretaria' : element.secretaria,
              'Protocolo' : String(id + element.dtAtualizacao.slice(0, 4)).padStart(8, "0"),
              'Status' : element.statusValidacao
            }

            this.servidores.push(servidor)
        }
      })
    }

  }

  getAllServidorByAnoAndSecretaria()
  {
    if(this.secretaria == '')
    {
      let input = document.getElementById('ano')

      input?.classList.add('select_desabilitado')
      this.getAllOwners()
    }
    else
    {

      this.servidores = []

      let input = document.getElementById('ano')

      input?.classList.remove('select_desabilitado')

      if(this.ano != '')
      {
        this.ServicesAdminService.getAllServidorByAnoAndSecretaria(this.ano, this.secretaria).subscribe(value => {

          this.dataSource.data = value
          for(const element of value)
          {
              let date = new DatePipe('en-US')
              let id = element.id

              let servidor = {
                'Nome Completo' : element.nome,
                'Matricula' : element.matricula,
                'Exercicio' : element.exercicio,
                'Data de Atualização' : date.transform(element.dtAtualizacao, 'dd/MM/yyyy'),
                'Secretaria' : element.secretaria,
                'Protocolo' : String(id + element.dtAtualizacao.slice(0, 4)).padStart(8, "0"),
                'Status' : element.statusValidacao
              }

              this.servidores.push(servidor)
          }
        })
      }
      else
      {
        this.getAllOwners()
      }

    }
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
      this.secretaria = ''
      this.ano = ''
      this.getAllOwners()
    }
  }

  getAniversariantesValidador()
  {
    if(!this.valAniversariante)
    {
      this.valAniversariante = true
      this.getAllAniversariantesByMes()
    }
    else
    {
      this.valAniversariante = false
      this.doFilter(' ')
      this.getAllOwners()
    }
  }

  ativarFiltro(filtro : string)
  {

    this.secretaria = ''
    this.ano = ''
    this.getAllOwners()

    switch(filtro)
    {
      case 'secretariaAno':

      this.filtroSecretariaAno = true
      this.filtroAno = false
      this.filtroSecretaria = false

      break;

      case 'secretaria':

      this.filtroSecretariaAno = false
      this.filtroAno = false
      this.filtroSecretaria = true

      break;

      case 'ano':

      this.filtroSecretariaAno = false
      this.filtroAno = true
      this.filtroSecretaria = false

      break;
    }
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
