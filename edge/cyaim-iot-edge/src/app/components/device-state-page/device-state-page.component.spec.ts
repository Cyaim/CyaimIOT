import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStatePageComponent } from './device-state-page.component';

describe('DeviceStatePageComponent', () => {
  let component: DeviceStatePageComponent;
  let fixture: ComponentFixture<DeviceStatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceStatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
