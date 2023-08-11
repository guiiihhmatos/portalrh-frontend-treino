import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLicencaSemVencimentoComponent } from './formulario-licenca-sem-vencimento.component';

describe('FormularioLicencaSemVencimentoComponent', () => {
  let component: FormularioLicencaSemVencimentoComponent;
  let fixture: ComponentFixture<FormularioLicencaSemVencimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioLicencaSemVencimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioLicencaSemVencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
