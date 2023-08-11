import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfReducaoCargaHorariaComponent } from './pdf-reducao-carga-horaria.component';

describe('PdfReducaoCargaHorariaComponent', () => {
  let component: PdfReducaoCargaHorariaComponent;
  let fixture: ComponentFixture<PdfReducaoCargaHorariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfReducaoCargaHorariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfReducaoCargaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
