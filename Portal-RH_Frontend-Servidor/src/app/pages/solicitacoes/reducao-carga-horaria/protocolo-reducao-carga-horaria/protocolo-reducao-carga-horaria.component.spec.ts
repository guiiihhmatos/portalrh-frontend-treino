import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloReducaoCargaHorariaComponent } from './protocolo-reducao-carga-horaria.component';

describe('ProtocoloReducaoCargaHorariaComponent', () => {
  let component: ProtocoloReducaoCargaHorariaComponent;
  let fixture: ComponentFixture<ProtocoloReducaoCargaHorariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocoloReducaoCargaHorariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloReducaoCargaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
