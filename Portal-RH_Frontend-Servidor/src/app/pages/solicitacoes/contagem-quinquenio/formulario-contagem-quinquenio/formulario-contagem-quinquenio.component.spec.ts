import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioContagemQuinquenioComponent } from './formulario-contagem-quinquenio.component';

describe('FormularioContagemQuinquenioComponent', () => {
  let component: FormularioContagemQuinquenioComponent;
  let fixture: ComponentFixture<FormularioContagemQuinquenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioContagemQuinquenioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioContagemQuinquenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
