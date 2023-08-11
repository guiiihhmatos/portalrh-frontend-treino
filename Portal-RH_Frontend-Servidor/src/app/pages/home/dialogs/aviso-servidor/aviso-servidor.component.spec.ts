import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoServidorComponent } from './aviso-servidor.component';

describe('AvisoServidorComponent', () => {
  let component: AvisoServidorComponent;
  let fixture: ComponentFixture<AvisoServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoServidorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisoServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
