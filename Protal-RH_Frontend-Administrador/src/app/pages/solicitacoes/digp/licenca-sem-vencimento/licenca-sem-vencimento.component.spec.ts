import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencaSemVencimentoComponent } from './licenca-sem-vencimento.component';

describe('LicencaSemVencimentoComponent', () => {
  let component: LicencaSemVencimentoComponent;
  let fixture: ComponentFixture<LicencaSemVencimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicencaSemVencimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicencaSemVencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
