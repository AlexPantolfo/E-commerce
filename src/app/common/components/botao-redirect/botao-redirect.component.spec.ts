import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoRedirectComponent } from './botao-redirect.component';

describe('BotaoRedirectComponent', () => {
  let component: BotaoRedirectComponent;
  let fixture: ComponentFixture<BotaoRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
