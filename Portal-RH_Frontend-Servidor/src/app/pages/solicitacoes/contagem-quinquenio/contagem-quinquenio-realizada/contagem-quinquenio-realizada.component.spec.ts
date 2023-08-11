import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagemQuinquenioRealizadaComponent } from './contagem-quinquenio-realizada.component';

describe('ContagemQuinquenioRealizadaComponent', () => {
  let component: ContagemQuinquenioRealizadaComponent;
  let fixture: ComponentFixture<ContagemQuinquenioRealizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagemQuinquenioRealizadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContagemQuinquenioRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
