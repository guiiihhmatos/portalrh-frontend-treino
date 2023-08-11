import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PossuiCadastroComponent } from './possui-cadastro.component';

describe('PossuiCadastroComponent', () => {
  let component: PossuiCadastroComponent;
  let fixture: ComponentFixture<PossuiCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PossuiCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PossuiCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
