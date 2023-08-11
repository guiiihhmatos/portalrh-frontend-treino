import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracoesComponent } from './declaracoes.component';

describe('DeclaracoesComponent', () => {
  let component: DeclaracoesComponent;
  let fixture: ComponentFixture<DeclaracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclaracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
