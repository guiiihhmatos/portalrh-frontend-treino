import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialSolicitacoesComponent } from './pagina-inicial-solicitacoes.component';

describe('PaginaInicialSolicitacoesComponent', () => {
  let component: PaginaInicialSolicitacoesComponent;
  let fixture: ComponentFixture<PaginaInicialSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaInicialSolicitacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaInicialSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
