import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencaSemVencimentoSolicitadaComponent } from './licenca-sem-vencimento-solicitada.component';

describe('LicencaSemVencimentoSolicitadaComponent', () => {
  let component: LicencaSemVencimentoSolicitadaComponent;
  let fixture: ComponentFixture<LicencaSemVencimentoSolicitadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicencaSemVencimentoSolicitadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicencaSemVencimentoSolicitadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
