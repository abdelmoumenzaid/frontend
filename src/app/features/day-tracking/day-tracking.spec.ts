import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTracking } from './day-tracking';

describe('DayTracking', () => {
  let component: DayTracking;
  let fixture: ComponentFixture<DayTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayTracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayTracking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
