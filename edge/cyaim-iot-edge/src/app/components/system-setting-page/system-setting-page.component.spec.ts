import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingPageComponent } from './system-setting-page.component';

describe('SystemSettingPageComponent', () => {
  let component: SystemSettingPageComponent;
  let fixture: ComponentFixture<SystemSettingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
