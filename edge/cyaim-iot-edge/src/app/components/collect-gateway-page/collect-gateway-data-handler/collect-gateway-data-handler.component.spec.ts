/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectGatewayDataHandlerComponent } from './collect-gateway-data-handler.component';

describe('CollectGatewayDataHandlerComponent', () => {
  let component: CollectGatewayDataHandlerComponent;
  let fixture: ComponentFixture<CollectGatewayDataHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectGatewayDataHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectGatewayDataHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
