import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicencaSemVencimentoRoutingModule } from './licenca-sem-vencimento-routing.module';
import { FormularioLicencaSemVencimentoComponent } from './formulario-licenca-sem-vencimento/formulario-licenca-sem-vencimento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { ProtocoloLicencaSemVencimentoComponent } from './protocolo-licenca-sem-vencimento/protocolo-licenca-sem-vencimento.component';
import { TermsComponent } from './dialogs/terms/terms.component';
import { LicencaSemVencimentoSolicitadaComponent } from './licenca-sem-vencimento-solicitada/licenca-sem-vencimento-solicitada.component';
import { AndamentoLicencaSemVencimentoComponent } from './dialogs/andamento-licenca-sem-vencimento/andamento-licenca-sem-vencimento.component';


@NgModule({
  declarations: [
    FormularioLicencaSemVencimentoComponent,
    ProtocoloLicencaSemVencimentoComponent,
    TermsComponent,
    LicencaSemVencimentoSolicitadaComponent,
    AndamentoLicencaSemVencimentoComponent
  ],
  imports: [
    CommonModule,
    LicencaSemVencimentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    AppMaterialModule
  ]
})
export class LicencaSemVencimentoModule { }
