import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloContagemQuinquenioComponent } from './protocolo-contagem-quinquenio.component';

describe('ProtocoloContagemQuinquenioComponent', () => {
  let component: ProtocoloContagemQuinquenioComponent;
  let fixture: ComponentFixture<ProtocoloContagemQuinquenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocoloContagemQuinquenioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloContagemQuinquenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
