import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloDeclaracaoComponent } from './protocolo-declaracao.component';

describe('ProtocoloDeclaracaoComponent', () => {
  let component: ProtocoloDeclaracaoComponent;
  let fixture: ComponentFixture<ProtocoloDeclaracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocoloDeclaracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloDeclaracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
