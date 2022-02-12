import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingSysStateComponent } from './system-setting-sys-state.component';

describe('SystemSettingSysStateComponent', () => {
  let component: SystemSettingSysStateComponent;
  let fixture: ComponentFixture<SystemSettingSysStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingSysStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingSysStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
