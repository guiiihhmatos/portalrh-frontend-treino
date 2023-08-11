import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracaoEncontradaComponent } from './declaracao-encontrada.component';

describe('DeclaracaoEncontradaComponent', () => {
  let component: DeclaracaoEncontradaComponent;
  let fixture: ComponentFixture<DeclaracaoEncontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracaoEncontradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclaracaoEncontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
