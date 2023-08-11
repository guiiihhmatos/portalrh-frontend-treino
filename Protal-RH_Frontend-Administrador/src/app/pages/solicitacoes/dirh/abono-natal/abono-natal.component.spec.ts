import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonoNatalComponent } from './abono-natal.component';

describe('AbonoNatalComponent', () => {
  let component: AbonoNatalComponent;
  let fixture: ComponentFixture<AbonoNatalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbonoNatalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonoNatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
