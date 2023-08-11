import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracaoNaoEncontradaComponent } from './declaracao-nao-encontrada.component';

describe('DeclaracaoNaoEncontradaComponent', () => {
  let component: DeclaracaoNaoEncontradaComponent;
  let fixture: ComponentFixture<DeclaracaoNaoEncontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracaoNaoEncontradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclaracaoNaoEncontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
