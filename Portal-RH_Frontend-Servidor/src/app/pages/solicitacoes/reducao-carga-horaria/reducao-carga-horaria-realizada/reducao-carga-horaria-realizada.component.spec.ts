import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReducaoCargaHorariaRealizadaComponent } from './reducao-carga-horaria-realizada.component';

describe('ReducaoCargaHorariaRealizadaComponent', () => {
  let component: ReducaoCargaHorariaRealizadaComponent;
  let fixture: ComponentFixture<ReducaoCargaHorariaRealizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReducaoCargaHorariaRealizadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReducaoCargaHorariaRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
