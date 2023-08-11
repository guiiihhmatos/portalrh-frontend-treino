import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirProtocoloComponent } from './imprimir-protocolo.component';

describe('ImprimirProtocoloComponent', () => {
  let component: ImprimirProtocoloComponent;
  let fixture: ComponentFixture<ImprimirProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirProtocoloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
