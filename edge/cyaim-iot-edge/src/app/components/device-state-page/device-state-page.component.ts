import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-device-state-page',
  templateUrl: './device-state-page.component.html',
  styleUrls: ['./device-state-page.component.scss'],
})
export class DeviceStatePageComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 默认跳转overview
    this.router.navigate(['./overview'], { relativeTo: this.route });
  }
}
