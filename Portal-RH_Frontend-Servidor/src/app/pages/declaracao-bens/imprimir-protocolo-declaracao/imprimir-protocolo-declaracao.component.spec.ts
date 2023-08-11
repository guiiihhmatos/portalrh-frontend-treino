import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirProtocoloDeclaracaoComponent } from './imprimir-protocolo-declaracao.component';

describe('ImprimirProtocoloDeclaracaoComponent', () => {
  let component: ImprimirProtocoloDeclaracaoComponent;
  let fixture: ComponentFixture<ImprimirProtocoloDeclaracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirProtocoloDeclaracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirProtocoloDeclaracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
