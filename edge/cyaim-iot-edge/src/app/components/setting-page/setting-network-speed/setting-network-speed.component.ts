import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-network-speed',
  templateUrl: './setting-network-speed.component.html',
  styleUrls: ['./setting-network-speed.component.scss'],
})
export class SettingNetworkSpeedComponent implements OnInit {
  constructor() {}

  speed = { ping: '—', network: '—' };

  ngOnInit() {}
}
