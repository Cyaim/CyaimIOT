import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInternetComponent } from './device-internet.component';

describe('DeviceInternetComponent', () => {
  let component: DeviceInternetComponent;
  let fixture: ComponentFixture<DeviceInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceInternetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
