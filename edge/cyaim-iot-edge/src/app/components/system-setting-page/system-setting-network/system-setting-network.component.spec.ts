import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingNetworkComponent } from './system-setting-network.component';

describe('SystemSettingNetworkComponent', () => {
  let component: SystemSettingNetworkComponent;
  let fixture: ComponentFixture<SystemSettingNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
