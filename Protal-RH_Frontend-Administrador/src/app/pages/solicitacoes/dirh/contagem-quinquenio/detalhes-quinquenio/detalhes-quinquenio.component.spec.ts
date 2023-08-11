import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesQuinquenioComponent } from './detalhes-quinquenio.component';

describe('DetalhesQuinquenioComponent', () => {
  let component: DetalhesQuinquenioComponent;
  let fixture: ComponentFixture<DetalhesQuinquenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesQuinquenioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesQuinquenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
