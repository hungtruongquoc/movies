import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessMoreButtonComponent } from './less-more-button.component';

describe('LessMoreButtonComponent', () => {
  let component: LessMoreButtonComponent;
  let fixture: ComponentFixture<LessMoreButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessMoreButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessMoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
