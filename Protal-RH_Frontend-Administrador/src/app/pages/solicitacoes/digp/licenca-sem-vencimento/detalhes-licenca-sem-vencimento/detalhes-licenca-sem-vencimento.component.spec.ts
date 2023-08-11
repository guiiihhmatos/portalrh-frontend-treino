import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesLicencaSemVencimentoComponent } from './detalhes-licenca-sem-vencimento.component';

describe('DetalhesLicencaSemVencimentoComponent', () => {
  let component: DetalhesLicencaSemVencimentoComponent;
  let fixture: ComponentFixture<DetalhesLicencaSemVencimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesLicencaSemVencimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesLicencaSemVencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
