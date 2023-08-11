import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeTransporteComponent } from './vale-transporte.component';

describe('ValeTransporteComponent', () => {
  let component: ValeTransporteComponent;
  let fixture: ComponentFixture<ValeTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValeTransporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValeTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
