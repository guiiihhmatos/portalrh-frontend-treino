import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoAbonoRealizadaComponent } from './solicitacao-abono-realizada.component';

describe('SolicitacaoAbonoRealizadaComponent', () => {
  let component: SolicitacaoAbonoRealizadaComponent;
  let fixture: ComponentFixture<SolicitacaoAbonoRealizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoAbonoRealizadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoAbonoRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
