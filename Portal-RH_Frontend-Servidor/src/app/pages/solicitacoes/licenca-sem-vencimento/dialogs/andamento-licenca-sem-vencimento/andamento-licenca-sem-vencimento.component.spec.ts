import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndamentoLicencaSemVencimentoComponent } from './andamento-licenca-sem-vencimento.component';

describe('AndamentoLicencaSemVencimentoComponent', () => {
  let component: AndamentoLicencaSemVencimentoComponent;
  let fixture: ComponentFixture<AndamentoLicencaSemVencimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndamentoLicencaSemVencimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AndamentoLicencaSemVencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
