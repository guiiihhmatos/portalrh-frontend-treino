import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfLicencaSemVencimentoComponent } from './pdf-licenca-sem-vencimento.component';

describe('PdfLicencaSemVencimentoComponent', () => {
  let component: PdfLicencaSemVencimentoComponent;
  let fixture: ComponentFixture<PdfLicencaSemVencimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfLicencaSemVencimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfLicencaSemVencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
