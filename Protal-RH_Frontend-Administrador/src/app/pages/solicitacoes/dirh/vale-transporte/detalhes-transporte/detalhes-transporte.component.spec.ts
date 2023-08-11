import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesTransporteComponent } from './detalhes-transporte.component';

describe('DetalhesTransporteComponent', () => {
  let component: DetalhesTransporteComponent;
  let fixture: ComponentFixture<DetalhesTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesTransporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
