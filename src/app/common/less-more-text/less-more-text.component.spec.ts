import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessMoreTextComponent } from './less-more-text.component';

describe('LessMoreTextComponent', () => {
  let component: LessMoreTextComponent;
  let fixture: ComponentFixture<LessMoreTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessMoreTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessMoreTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
