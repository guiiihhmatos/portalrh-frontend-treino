import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRequisicaoDeclaracaoComponent } from './formulario-requisicao-declaracao.component';

describe('FormularioRequisicaoDeclaracaoComponent', () => {
  let component: FormularioRequisicaoDeclaracaoComponent;
  let fixture: ComponentFixture<FormularioRequisicaoDeclaracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRequisicaoDeclaracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRequisicaoDeclaracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
