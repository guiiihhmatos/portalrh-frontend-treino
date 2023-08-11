import { Component } from '@angular/core';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-pagina-inicial-solicitacoes',
  templateUrl: './pagina-inicial-solicitacoes.component.html',
  styleUrls: ['./pagina-inicial-solicitacoes.component.scss']
})
export class PaginaInicialSolicitacoesComponent {
  servidor: Servidor
  constructor(private auth: AuthService){
    this.servidor = JSON.parse(auth.getServidor());
  }


}
