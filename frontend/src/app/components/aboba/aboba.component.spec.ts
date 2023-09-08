import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbobaComponent } from './aboba.component';

describe('AbobaComponent', () => {
  let component: AbobaComponent;
  let fixture: ComponentFixture<AbobaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbobaComponent]
    });
    fixture = TestBed.createComponent(AbobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
