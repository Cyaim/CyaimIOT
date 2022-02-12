import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingRunLogComponent } from './system-setting-run-log.component';

describe('SystemSettingRunLogComponent', () => {
  let component: SystemSettingRunLogComponent;
  let fixture: ComponentFixture<SystemSettingRunLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingRunLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingRunLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
