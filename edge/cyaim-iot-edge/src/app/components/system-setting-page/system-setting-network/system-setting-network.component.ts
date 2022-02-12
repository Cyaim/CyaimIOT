import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-system-setting-network',
  templateUrl: './system-setting-network.component.html',
  styleUrls: ['./system-setting-network.component.scss'],
})
export class SystemSettingNetworkComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  color: ThemePalette = 'accent';

  ipv4Mode: string = 'static';
  ipv4: string = '111';
  ipv4Subnetmask: string = '';
  ipv4Gateway: string = '';
  ipv4DnsChecked: boolean = false;
  ipv4Dns1: string = '114.114.114.114';
  ipv4Dns2: string = '114.114.114.114';

  ipv6Mode: string = 'static';
  ipv6: string = 'fd00:6868:6868::d18';
  ipv6Gateway: string = 'fe80::8ede:f9ff:fee4:ff70%11';
  ipv6DnsChecked: boolean = false;
  ipv6Dns1: string = 'fe80::8ede:f9ff:fee4:ff70%11';
  ipv6Dns2: string = 'fe80::8ede:f9ff:fee4:ff70%11';
  ipv6Enabled: boolean = true;

  dhcpEnabled: boolean = true;
  dhcpStartIP: string = '';
  dhcpEndIP: string = '';
  dhcpLease: number = 720;
  dhcpDns1: string = '114.114.114.114';
  dhcpDns2: string = '114.114.114.114';
  dhcpGateway: string = '114.114.114.114';

  changeNetWorkMode(event: String) {
    // this.isStatic = event === 'static';
  }
}
