import { Component, OnInit } from '@angular/core';
import { PlatformModel } from 'src/app/models/PlatformModel';

@Component({
  selector: 'app-setting-server',
  templateUrl: './setting-server.component.html',
  styleUrls: ['./setting-server.component.scss'],
})
export class SettingServerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  platform: PlatformModel = {
    ServerAddress: '',
    DeviceID: '',
    Password: '',
  };
}
