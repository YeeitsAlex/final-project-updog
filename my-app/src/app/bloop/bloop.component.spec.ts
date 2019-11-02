import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloopComponent } from './bloop.component';

describe('BloopComponent', () => {
  let component: BloopComponent;
  let fixture: ComponentFixture<BloopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
