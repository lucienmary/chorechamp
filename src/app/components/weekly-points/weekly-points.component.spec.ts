import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPointsComponent } from './weekly-points.component';

describe('WeeklyPointsComponent', () => {
  let component: WeeklyPointsComponent;
  let fixture: ComponentFixture<WeeklyPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
