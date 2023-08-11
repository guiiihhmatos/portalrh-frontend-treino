import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExoneracaoComponent } from './exoneracao.component';

describe('ExoneracaoComponent', () => {
  let component: ExoneracaoComponent;
  let fixture: ComponentFixture<ExoneracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExoneracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExoneracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
