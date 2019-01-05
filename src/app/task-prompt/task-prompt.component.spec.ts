import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPromptComponent } from './task-prompt.component';

describe('TaskPromptComponent', () => {
  let component: TaskPromptComponent;
  let fixture: ComponentFixture<TaskPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
