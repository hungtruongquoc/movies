import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapSimpleCardComponent } from './bootstrap-simple-card.component';

describe('BootstrapSimpleCardComponent', () => {
  let component: BootstrapSimpleCardComponent;
  let fixture: ComponentFixture<BootstrapSimpleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapSimpleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapSimpleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
