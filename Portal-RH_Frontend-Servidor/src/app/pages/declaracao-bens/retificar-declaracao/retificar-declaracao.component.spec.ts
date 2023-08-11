import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetificarDeclaracaoComponent } from './retificar-declaracao.component';

describe('RetificarDeclaracaoComponent', () => {
  let component: RetificarDeclaracaoComponent;
  let fixture: ComponentFixture<RetificarDeclaracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetificarDeclaracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetificarDeclaracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
