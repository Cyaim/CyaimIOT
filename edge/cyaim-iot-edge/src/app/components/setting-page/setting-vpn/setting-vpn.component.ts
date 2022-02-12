import { Component, OnInit } from '@angular/core';
import { CyaimVPNModel } from 'src/app/models/CyaimVPNModel';

@Component({
  selector: 'app-setting-vpn',
  templateUrl: './setting-vpn.component.html',
  styleUrls: ['./setting-vpn.component.scss'],
})
export class SettingVpnComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  vpn: CyaimVPNModel = {
    UserName: '',
    Mode: 'cert',
    Password: '',
  };
}
