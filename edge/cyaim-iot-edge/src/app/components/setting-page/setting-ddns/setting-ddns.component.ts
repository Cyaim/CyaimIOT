import { Component, OnInit } from '@angular/core';
import { CyaimDDNSModel } from 'src/app/models/CyaimDDNSModel';

@Component({
  selector: 'app-setting-ddns',
  templateUrl: './setting-ddns.component.html',
  styleUrls: ['./setting-ddns.component.scss'],
})
export class SettingDdnsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ddns: CyaimDDNSModel = {
    UserName: '',
    Password: '',
    HostName: '',
    StateCheck: 0,
  };
}
