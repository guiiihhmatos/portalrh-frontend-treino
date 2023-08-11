import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAbonoNatalComponent } from './formulario-abono-natal.component';

describe('FormularioAbonoNatalComponent', () => {
  let component: FormularioAbonoNatalComponent;
  let fixture: ComponentFixture<FormularioAbonoNatalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAbonoNatalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAbonoNatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
