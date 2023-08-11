import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCargaHorariaComponent } from './detalhes-carga-horaria.component';

describe('DetalhesCargaHorariaComponent', () => {
  let component: DetalhesCargaHorariaComponent;
  let fixture: ComponentFixture<DetalhesCargaHorariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesCargaHorariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesCargaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
