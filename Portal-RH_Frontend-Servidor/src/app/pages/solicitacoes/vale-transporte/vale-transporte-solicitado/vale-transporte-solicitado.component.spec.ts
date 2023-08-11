import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeTransporteSolicitadoComponent } from './vale-transporte-solicitado.component';

describe('ValeTransporteSolicitadoComponent', () => {
  let component: ValeTransporteSolicitadoComponent;
  let fixture: ComponentFixture<ValeTransporteSolicitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValeTransporteSolicitadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValeTransporteSolicitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
