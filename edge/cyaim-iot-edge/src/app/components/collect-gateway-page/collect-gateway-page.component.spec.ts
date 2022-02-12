import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectGatewayPageComponent } from './collect-gateway-page.component';

describe('CollectGatewayPageComponent', () => {
  let component: CollectGatewayPageComponent;
  let fixture: ComponentFixture<CollectGatewayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectGatewayPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectGatewayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
