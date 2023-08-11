import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReducaoCargaHorariaComponent } from './formulario-reducao-carga-horaria.component';

describe('FormularioReducaoCargaHorariaComponent', () => {
  let component: FormularioReducaoCargaHorariaComponent;
  let fixture: ComponentFixture<FormularioReducaoCargaHorariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioReducaoCargaHorariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioReducaoCargaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
