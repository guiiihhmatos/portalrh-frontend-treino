import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/home/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { NotActicatedGuard } from './guard/not-acticated.guard';
import { AlterarSenhaComponent } from './components/home/alterar-senha/alterar-senha.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotActicatedGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'trocar-senha',
    data: { nivel: ['NIVEL_1', 'NIVEL_2', 'NIVEL_3'] },
    component: AlterarSenhaComponent,
  },
  {
    path: 'home',
    data: { nivel: ['NIVEL_2', 'NIVEL_3'] },
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'recadastramento',
    data: { nivel: ['NIVEL_2', 'NIVEL_3'] },
    loadChildren: () =>
      import('./pages/recadastramento/recadastramento.module').then(
        (m) => m.RecadastramentoModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'declaracao',
    data: { nivel: ['NIVEL_2', 'NIVEL_3'] },
    loadChildren: () =>
      import('./pages/declaracao/declaracao.module').then(
        (m) => m.DeclaracaoModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitacoes',
    data: { nivel: ['NIVEL_2', 'NIVEL_3'] },
    loadChildren: () =>
      import('./pages/solicitacoes/solicitacoes.module').then(
        (m) => m.SolicitacoesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'afastamentos',
    data: { nivel: ['NIVEL_1', 'NIVEL_3'] },
    loadChildren: () =>
      import('./pages/afastamento/afastamento.module').then(
        (m) => m.AfastamentoModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'ferias',
    data: { nivel: ['NIVEL_1', 'NIVEL_3'] },
    loadChildren: () =>
      import('./pages/ferias/ferias.module').then((m) => m.FeriasModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
