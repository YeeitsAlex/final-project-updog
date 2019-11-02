import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentRunsComponent } from './recent-runs.component';

describe('RecentRunsComponent', () => {
  let component: RecentRunsComponent;
  let fixture: ComponentFixture<RecentRunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentRunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
