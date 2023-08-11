import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloRequisicaoDeclaracaoComponent } from './protocolo-requisicao-declaracao.component';

describe('ProtocoloRequisicaoDeclaracaoComponent', () => {
  let component: ProtocoloRequisicaoDeclaracaoComponent;
  let fixture: ComponentFixture<ProtocoloRequisicaoDeclaracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocoloRequisicaoDeclaracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloRequisicaoDeclaracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
