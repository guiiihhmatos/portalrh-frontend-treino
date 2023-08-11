import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesRecadastroComponent } from './detalhes-recadastro.component';

describe('DetalhesRecadastroComponent', () => {
  let component: DetalhesRecadastroComponent;
  let fixture: ComponentFixture<DetalhesRecadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesRecadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesRecadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
