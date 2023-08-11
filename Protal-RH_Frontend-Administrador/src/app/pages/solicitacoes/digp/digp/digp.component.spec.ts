import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigpComponent } from './digp.component';

describe('DigpComponent', () => {
  let component: DigpComponent;
  let fixture: ComponentFixture<DigpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
