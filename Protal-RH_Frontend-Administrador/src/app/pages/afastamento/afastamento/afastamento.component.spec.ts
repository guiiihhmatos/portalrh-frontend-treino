import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfastamentoComponent } from './afastamento.component';

describe('AfastamentoComponent', () => {
  let component: AfastamentoComponent;
  let fixture: ComponentFixture<AfastamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfastamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfastamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
