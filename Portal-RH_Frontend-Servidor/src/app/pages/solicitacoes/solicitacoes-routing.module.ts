import { PaginaInicialSolicitacoesComponent } from './pages-solicitacoes/pagina-inicial-solicitacoes/pagina-inicial-solicitacoes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprirmirProtocoloSolicitacaoComponent } from './pages-solicitacoes/imprirmir-protocolo-solicitacao/imprirmir-protocolo-solicitacao.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'inicio'
  },
  {
    path: 'inicio', pathMatch: 'full', component: PaginaInicialSolicitacoesComponent
  },
  {
    path: 'imprimir-protocolo/:solicitacao/:id_protocolo', pathMatch: 'full', component: ImprirmirProtocoloSolicitacaoComponent
  },
  {
    path: 'abono-natal',
    loadChildren: () =>
      import('./abono-natal/abono-natal.module').then(
        (m) => m.AbonoNatalModule
      )
  },
  {
    path: 'requisicao-declaracao',
    loadChildren: () =>
      import('./requisicao-declaracao/requisicao-declaracao.module').then(
        (m) => m.RequisicaoDeclaracaoModule
      )
  },
  {
    path: 'contagem-quinquenio',
    loadChildren: () =>
      import('./contagem-quinquenio/contagem-quinquenio.module').then(
        (m) => m.ContagemQuinquenioModule
      )
  },
  {
    path: 'vale-transporte',
    loadChildren: () =>
      import('./vale-transporte/vale-transporte.module').then(
        (m) => m.ValeTransporteModule
      )
  },
  {
    path: 'reducao-carga-horaria',
    loadChildren: () =>
      import('./reducao-carga-horaria/reducao-carga-horaria.module').then(
        (m) => m.ReducaoCargaHorariaModule
      )
  },
  {
    path: 'licenca-sem-vencimento',
    loadChildren: () =>
      import('./licenca-sem-vencimento/licenca-sem-vencimento.module').then(
        (m) => m.LicencaSemVencimentoModule
      )
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitacoesRoutingModule { }
