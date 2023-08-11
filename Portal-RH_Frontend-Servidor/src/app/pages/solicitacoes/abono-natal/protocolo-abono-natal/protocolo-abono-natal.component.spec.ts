import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloAbonoNatalComponent } from './protocolo-abono-natal.component';

describe('ProtocoloAbonoNatalComponent', () => {
  let component: ProtocoloAbonoNatalComponent;
  let fixture: ComponentFixture<ProtocoloAbonoNatalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocoloAbonoNatalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloAbonoNatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
