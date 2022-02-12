/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SettingVpnComponent } from './setting-vpn.component';

describe('SettingVpnComponent', () => {
  let component: SettingVpnComponent;
  let fixture: ComponentFixture<SettingVpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingVpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingVpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
