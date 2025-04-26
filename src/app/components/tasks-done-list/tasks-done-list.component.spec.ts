import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDoneListComponent } from './tasks-done-list.component';

describe('TasksDoneListComponent', () => {
  let component: TasksDoneListComponent;
  let fixture: ComponentFixture<TasksDoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksDoneListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksDoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
