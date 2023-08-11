import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecadastroPendenteComponent } from './recadastro-pendente.component';

describe('RecadastroPendenteComponent', () => {
  let component: RecadastroPendenteComponent;
  let fixture: ComponentFixture<RecadastroPendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecadastroPendenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecadastroPendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
