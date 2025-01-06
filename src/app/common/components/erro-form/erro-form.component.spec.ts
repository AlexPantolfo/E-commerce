import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroFormComponent } from './erro-form.component';

describe('ErroFormComponent', () => {
  let component: ErroFormComponent;
  let fixture: ComponentFixture<ErroFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErroFormComponent]
    });
    fixture = TestBed.createComponent(ErroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
