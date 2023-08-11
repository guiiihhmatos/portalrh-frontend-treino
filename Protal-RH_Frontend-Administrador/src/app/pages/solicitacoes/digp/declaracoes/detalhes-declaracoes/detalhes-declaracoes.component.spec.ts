import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDeclaracoesComponent } from './detalhes-declaracoes.component';

describe('DetalhesDeclaracoesComponent', () => {
  let component: DetalhesDeclaracoesComponent;
  let fixture: ComponentFixture<DetalhesDeclaracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesDeclaracoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesDeclaracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
