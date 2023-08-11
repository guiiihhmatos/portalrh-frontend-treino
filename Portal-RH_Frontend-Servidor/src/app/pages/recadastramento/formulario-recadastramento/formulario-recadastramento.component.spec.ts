import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRecadastramentoComponent } from './formulario-recadastramento.component';

describe('FormularioRecadastramentoComponent', () => {
  let component: FormularioRecadastramentoComponent;
  let fixture: ComponentFixture<FormularioRecadastramentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRecadastramentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRecadastramentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
