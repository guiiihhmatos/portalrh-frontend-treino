import { AuthGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotActivateGuard } from './guards/not-activate/not-activate.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotActivateGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'recadastramento',
    loadChildren: () =>
      import('./pages/recadastramento/recadastramento.module').then(
        (m) => m.RecadastramentoModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'declaracao-bens',
    loadChildren: () =>
      import('./pages/declaracao-bens/declaracao-bens.module').then(
        (m) => m.DeclaracaoBensModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitacoes',
    loadChildren: () =>
      import('./pages/solicitacoes/solicitacoes.module').then(
        (m) => m.SolicitacoesModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
