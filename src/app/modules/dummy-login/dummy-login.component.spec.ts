import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyLoginComponent } from './dummy-login.component';

describe('DummyLoginComponent', () => {
  let component: DummyLoginComponent;
  let fixture: ComponentFixture<DummyLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyLoginComponent]
    });
    fixture = TestBed.createComponent(DummyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
