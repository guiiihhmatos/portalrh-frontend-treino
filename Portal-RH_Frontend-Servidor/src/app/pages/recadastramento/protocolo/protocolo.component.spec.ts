import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloComponent } from './protocolo.component';

describe('ProtocoloComponent', () => {
  let component: ProtocoloComponent;
  let fixture: ComponentFixture<ProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocoloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
