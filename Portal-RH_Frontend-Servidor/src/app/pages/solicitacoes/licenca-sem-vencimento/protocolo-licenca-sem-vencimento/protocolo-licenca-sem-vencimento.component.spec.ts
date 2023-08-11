import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloLicencaSemVencimentoComponent } from './protocolo-licenca-sem-vencimento.component';

describe('ProtocoloLicencaSemVencimentoComponent', () => {
  let component: ProtocoloLicencaSemVencimentoComponent;
  let fixture: ComponentFixture<ProtocoloLicencaSemVencimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocoloLicencaSemVencimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloLicencaSemVencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
