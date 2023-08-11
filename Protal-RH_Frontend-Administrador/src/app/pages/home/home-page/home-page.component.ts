import { Router } from '@angular/router';
import { DashboardService } from './../../../services/home/dashboard/dashboard.service';
import { Component, Input, ElementRef } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  // objetos dos totais das informações
  allDeclaracoes = { "quantidade" : 0, "secretaria" : ''}
  allRecadastramento = { "quantidade" : 0, "secretaria" : ''}
  allRecadastramentoBySecretaria = { "quantidade" : 0, "secretaria" : ''}
  allRecadastramentoByMes = { "quantidade" : 0, "exercicio" : 0, "mes" : 0}
  allDeclaracoesBySecretaria = { "quantidade" : 0, "secretaria" : ''}
  allServidores = { "quantidade" : 0, "secretaria" : ''}
  allServidoresBySecretaria = { "quantidade" : 0, "secretaria" : ''}
  getAllAniversariantesByMes = { "quantidade" : 0, "mes" : 0}


  // variaveis referentes aos anos
  anosExercicioDeclaracao : any[] = []
  anosExercicioRecadastramento : any[] = []

  data = new Date()
  anoAtual = this.data.getFullYear()

  anoExercicioDeclaracao = this.anoAtual - 1
  anoExercicioRecadastramento = this.anoAtual


  //variaveis dos graficos
  chart: any;

  secretarias : any[] = []
  quantidade : any[] = []

  totalSecretarias = 0

  // variaveis do circle progress

  @Input() percent !: number
  @Input() percentDeclaracao !: number
  @Input() percentRecadastramento !: number
  @Input() maxPercent !: number
  @Input() maxPercentDeclaracao !: number

  colorOuter : any
  colorInner : any
  colorOuterDeclaracao : any
  colorInnerDeclaracao : any
  colorOuterRecadastramento: any
  colorInnerRecadastramento: any

  valSpinner = true
  progressoDecleracao : any
  progressoRecadastramento : any
  progressoRecadastramentoByMes : any

  // variaveis dos aniversariantes
  meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  mesSelecionado = ''
  cod_mes = this.data.getMonth() + 1

  qtdeFaltanteRecadastro : number = 0
  qtdeFaltanteRecadastroByMes : number = 0
  qtdeFaltanteDeclaracao : number = 0

  constructor
  (
    private dashboardService : DashboardService,
    private router : Router
  )
  {
  }

  ngOnInit()
  {
    this.preencherAnosDeclaracao()
    this.preencherAnosRecadastramento()

    this.getAllDeclaracoesByExercicio(this.anoExercicioDeclaracao)
    this.getAllRecadastramento(this.anoExercicioRecadastramento)
    this.getAllAniversariantesByMesMethod(this.cod_mes)
    // this.getAllServidorBySecretaria()

  }

  // METODOS QUE UTILIZAM O SERVICE PARA FAZER BUSCA NA API

  getAllDeclaracoesByExercicio(exercicio : number)
  {
    this.dashboardService.getAllDeclaracoesByExercicio(this.anoExercicioDeclaracao).subscribe(value => {

      this.allDeclaracoes.quantidade = value.quantidade
      this.allDeclaracoes.secretaria = value.secretaria

      this.percentDeclaracao = value.quantidade
      this.progressoDecleracao = 'Declaração de bens '

      this.dashboardService.getAllServidor().subscribe(value => {

        this.allServidores.quantidade = value.quantidade
        this.allServidores.secretaria = value.secretaria

        this.maxPercentDeclaracao = value.quantidade

        this.percentDeclaracao = (this.percentDeclaracao / this.maxPercentDeclaracao) * 100;

        this.verifyColor()

        this.valSpinner = false

        this.qtdeFaltanteDeclaracao = this.allServidores.quantidade - this.allDeclaracoes.quantidade

      })

    })
  }


  getAllRecadastramento(exercicio : number)
  {
    this.dashboardService.getAllRecadastramentos(exercicio).subscribe(value => {


      this.allRecadastramento.quantidade = value.quantidade
      this.allRecadastramento.secretaria = value.secretaria

      this.progressoRecadastramento = 'Recadastramento Anual'

      this.percent = value.quantidade

      this.dashboardService.getAllServidor().subscribe(value => {

        this.allServidores.quantidade = value.quantidade
        this.allServidores.secretaria = value.secretaria

        this.maxPercent = value.quantidade

        this.percent = (this.percent / this.maxPercent) * 100;

        this.verifyColor()

        this.qtdeFaltanteRecadastro = this.maxPercent - this.allRecadastramento.quantidade


      })


    })
  }

  getAllAniversariantesByMesMethod(mes : number)
  {
    this.dashboardService.getAllAniversariantesByMes(mes).subscribe( res => {

      this.getAllAniversariantesByMes.quantidade = res.quantidade
      this.getAllAniversariantesByMes.mes = res.mes

      for(let i = 0; i < this.meses.length; i++)
      {
        let aux = i + 1
        if(aux == this.cod_mes)
        {
          this.mesSelecionado = this.meses[i++]
        }
      }

      this.percentRecadastramento = res.quantidade

      this.dashboardService.getAllRecadastramentosByMesAndExercicio(mes, this.anoAtual).subscribe( value => {

        this.allRecadastramentoByMes.exercicio = value.exercicio
        this.allRecadastramentoByMes.quantidade = value.quantidade
        this.allRecadastramentoByMes.mes = value.mes

        this.percentRecadastramento = ( this.allRecadastramentoByMes.quantidade / this.percentRecadastramento) * 100

        this.verifyColor()

        this.qtdeFaltanteRecadastroByMes = res.quantidade - value.quantidade
      })

    })
  }

  // METODO PARA PREENCHER OS ANOS DE DECLARAÇÃO
  preencherAnosDeclaracao()
  {
    for(let i = 2021; i <= this.anoAtual; i++)
    {
      this.anosExercicioDeclaracao.push(i)
    }

  }


  // METODO PARA PREENCHER OS ANOS DO RECADASTRAMENTO
  preencherAnosRecadastramento()
  {
    for(let i = 2023; i <= this.anoAtual; i++)
    {
      this.anosExercicioRecadastramento.push(i)
    }

  }

  //REDIRECIONAMENTO PARA A ABA PENDENTES DO RECADASTRAMENTO
  redirectPendentes()
  {
    this.router.navigateByUrl('recadastramento/pendentes', {state: {data: this.cod_mes} });
  }

  // METODO PARA COLORIR O CIRCLE

  verifyColor()
  {

    //verificador de cor do recadastramento anual

    if(this.percent <= 70)
    {
      this.colorInner = 'rgb(255, 79, 79)'
      this.colorOuter = 'red'
    }
    else
    {
      this.colorInner = '#C7E596'
      this.colorOuter = '#78C000'
    }

    //verificador de cor da declaração de bens

    if(this.percentDeclaracao <= 70)
    {
      this.colorInnerDeclaracao = 'rgb(255, 79, 79)'
      this.colorOuterDeclaracao = 'red'
    }
    else
    {
      this.colorInnerDeclaracao = '#C7E596'
      this.colorOuterDeclaracao = '#78C000'
    }


    //verificador de cor do recadastramento anual por mes

    if(this.percentRecadastramento <= 70)
    {
      this.colorInnerRecadastramento = 'rgb(255, 79, 79)'
      this.colorOuterRecadastramento = 'red'
    }
    else
    {
      this.colorInnerRecadastramento = '#C7E596'
      this.colorOuterRecadastramento = '#78C000'
    }
  }


}
