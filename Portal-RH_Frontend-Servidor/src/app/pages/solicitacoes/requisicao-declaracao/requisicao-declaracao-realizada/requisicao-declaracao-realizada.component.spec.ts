import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoDeclaracaoRealizadaComponent } from './requisicao-declaracao-realizada.component';

describe('RequisicaoDeclaracaoRealizadaComponent', () => {
  let component: RequisicaoDeclaracaoRealizadaComponent;
  let fixture: ComponentFixture<RequisicaoDeclaracaoRealizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoDeclaracaoRealizadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisicaoDeclaracaoRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
