import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReducaoCargaHorariaComponent } from './reducao-carga-horaria.component';

describe('ReducaoCargaHorariaComponent', () => {
  let component: ReducaoCargaHorariaComponent;
  let fixture: ComponentFixture<ReducaoCargaHorariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReducaoCargaHorariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReducaoCargaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
