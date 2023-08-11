import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagemQuinquenioComponent } from './contagem-quinquenio.component';

describe('ContagemQuinquenioComponent', () => {
  let component: ContagemQuinquenioComponent;
  let fixture: ComponentFixture<ContagemQuinquenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagemQuinquenioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContagemQuinquenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
