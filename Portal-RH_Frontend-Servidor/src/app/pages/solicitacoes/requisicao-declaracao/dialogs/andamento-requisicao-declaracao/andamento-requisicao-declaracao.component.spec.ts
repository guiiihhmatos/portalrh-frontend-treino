import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndamentoRequisicaoDeclaracaoComponent } from './andamento-requisicao-declaracao.component';

describe('AndamentoRequisicaoDeclaracaoComponent', () => {
  let component: AndamentoRequisicaoDeclaracaoComponent;
  let fixture: ComponentFixture<AndamentoRequisicaoDeclaracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndamentoRequisicaoDeclaracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AndamentoRequisicaoDeclaracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
