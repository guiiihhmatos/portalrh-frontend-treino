import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaradaComponent } from './declarada.component';

describe('DeclaradaComponent', () => {
  let component: DeclaradaComponent;
  let fixture: ComponentFixture<DeclaradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclaradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
