import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprirmirProtocoloSolicitacaoComponent } from './imprirmir-protocolo-solicitacao.component';

describe('ImprirmirProtocoloSolicitacaoComponent', () => {
  let component: ImprirmirProtocoloSolicitacaoComponent;
  let fixture: ComponentFixture<ImprirmirProtocoloSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprirmirProtocoloSolicitacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprirmirProtocoloSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
