import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirhComponent } from './dirh.component';

describe('DirhComponent', () => {
  let component: DirhComponent;
  let fixture: ComponentFixture<DirhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
