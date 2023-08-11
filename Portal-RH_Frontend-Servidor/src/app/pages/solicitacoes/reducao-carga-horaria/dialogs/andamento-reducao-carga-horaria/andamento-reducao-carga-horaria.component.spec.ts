import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndamentoReducaoCargaHorariaComponent } from './andamento-reducao-carga-horaria.component';

describe('AndamentoReducaoCargaHorariaComponent', () => {
  let component: AndamentoReducaoCargaHorariaComponent;
  let fixture: ComponentFixture<AndamentoReducaoCargaHorariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndamentoReducaoCargaHorariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AndamentoReducaoCargaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
