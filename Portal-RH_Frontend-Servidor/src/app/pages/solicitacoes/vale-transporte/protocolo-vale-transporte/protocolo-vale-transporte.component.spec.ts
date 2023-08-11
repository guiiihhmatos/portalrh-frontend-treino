import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloValeTransporteComponent } from './protocolo-vale-transporte.component';

describe('ProtocoloValeTransporteComponent', () => {
  let component: ProtocoloValeTransporteComponent;
  let fixture: ComponentFixture<ProtocoloValeTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocoloValeTransporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloValeTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
