import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndamentoServidorComponent } from './andamento-servidor.component';

describe('AndamentoServidorComponent', () => {
  let component: AndamentoServidorComponent;
  let fixture: ComponentFixture<AndamentoServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndamentoServidorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AndamentoServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
