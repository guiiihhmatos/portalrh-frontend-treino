import { environment } from '../../../environments/environments';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Municipio } from 'src/app/models/listas/municipio.model';
import { Secretaria } from 'src/app/models/listas/secretaria.model';
import { EmpresaOnibus } from 'src/app/models/listas/empresaOnibus.model';
import { GrauInstrucao } from 'src/app/models/listas/grauInstrucao.model';
import { EstadoCivil } from 'src/app/models/listas/estadoCivil.model';
import { TipoLogradouro } from 'src/app/models/listas/tipoLogradouro.model';
import { Cep } from 'src/app/models/listas/cep.model';
import { Curso } from 'src/app/models/listas/curso.model';
import { RacaCor } from 'src/app/models/listas/racaCor.model';

@Injectable({
  providedIn: 'root',
})
export class ListasService {
  private readonly API = environment.apiUrl + '/lista';

  constructor(private authService: AuthService, private http: HttpClient) {}

  getSecretarias(): Observable<Secretaria[]> {
    return this.http.get<Secretaria[]>(this.API + '/secretaria');
  }

  getRacaCor(): Observable<RacaCor[]> {
    return this.http.get<RacaCor[]>(this.API + '/raca_cor');
  }

  getEstadoCivil(): Observable<EstadoCivil[]> {
    return this.http.get<EstadoCivil[]>(this.API + '/estado_civil');
  }

  getGrauInstrucao(): Observable<GrauInstrucao[]> {
    return this.http.get<GrauInstrucao[]>(this.API + '/grau_instrucao');
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API + '/cursos');
  }

  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.API + '/municipio');
  }

  getMunicipioByCode(codigo: number): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.API}/municipio/${codigo}`);
  }

  getTipoLogradouroByDescricao(descricao: String): Observable<TipoLogradouro> {
    return this.http.get<TipoLogradouro>(this.API + '/tipo_logradouro/' + descricao);
  }

  getTiposLogradouros(): Observable<TipoLogradouro[]> {
    return this.http.get<TipoLogradouro[]>(this.API + '/tipo_logradouro');
  }

  getCep(cep: string): Observable<Cep> {
    return this.http.get<Cep>(this.API + '/cep/' + cep);
  }

  getEmpresasOnibus(): Observable<EmpresaOnibus[]> {
    return this.http.get<EmpresaOnibus[]>(this.API + '/empresas_onibus');
  }
  getEmpresaOnibusByCode(codigo: number): Observable<EmpresaOnibus> {
    return this.http.get<EmpresaOnibus>(this.API + `/empresas_onibus/${codigo}`);
  }
}
