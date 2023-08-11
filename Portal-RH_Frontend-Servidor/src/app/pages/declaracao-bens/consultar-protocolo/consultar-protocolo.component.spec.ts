import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProtocoloComponent } from './consultar-protocolo.component';

describe('ConsultarProtocoloComponent', () => {
  let component: ConsultarProtocoloComponent;
  let fixture: ComponentFixture<ConsultarProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarProtocoloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
