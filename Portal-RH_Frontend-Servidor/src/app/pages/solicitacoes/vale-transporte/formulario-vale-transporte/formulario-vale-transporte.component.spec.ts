import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioValeTransporteComponent } from './formulario-vale-transporte.component';

describe('FormularioValeTransporteComponent', () => {
  let component: FormularioValeTransporteComponent;
  let fixture: ComponentFixture<FormularioValeTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioValeTransporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioValeTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
