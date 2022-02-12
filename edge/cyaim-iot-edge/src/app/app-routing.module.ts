import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SettingPageComponent } from './components/setting-page/setting-page.component';
import { CollectGatewayPageComponent } from './components/collect-gateway-page/collect-gateway-page.component';
import { SystemSettingPageComponent } from './components/system-setting-page/system-setting-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { DeviceStatePageComponent } from './components/device-state-page/device-state-page.component';
import { DeviceOverviewComponent } from './components/device-state-page/device-overview/device-overview.component';
import { DeviceInternetComponent } from './components/device-state-page/device-internet/device-internet.component';
import { SystemSettingNetworkComponent } from './components/system-setting-page/system-setting-network/system-setting-network.component';
import { SystemSettingRunLogComponent } from './components/system-setting-page/system-setting-run-log/system-setting-run-log.component';
import { SystemSettingSysStateComponent } from './components/system-setting-page/system-setting-sys-state/system-setting-sys-state.component';
import { CollectGatewaySettingComponent } from './components/collect-gateway-page/collect-gateway-setting/collect-gateway-setting.component';
import { CollectGatewayLogComponent } from './components/collect-gateway-page/collect-gateway-log/collect-gateway-log.component';
import { CollectGatewayDataHandlerComponent } from './components/collect-gateway-page/collect-gateway-data-handler/collect-gateway-data-handler.component';
import { SettingNetworkSpeedComponent } from './components/setting-page/setting-network-speed/setting-network-speed.component';
import { SettingServerComponent } from './components/setting-page/setting-server/setting-server.component';
import { SettingDdnsComponent } from './components/setting-page/setting-ddns/setting-ddns.component';
import { SettingVpnComponent } from './components/setting-page/setting-vpn/setting-vpn.component';

const routes: Routes = [
  // 设备状态
  {
    path: 'device-state',
    component: DeviceStatePageComponent,
    children: [
      { path: 'overview', component: DeviceOverviewComponent },
      { path: 'internet', component: DeviceInternetComponent },
    ],
  },
  // 系统设置
  {
    path: 'sys-setting',
    component: SystemSettingPageComponent,
    children: [
      // 网络设置
      { path: 'network', component: SystemSettingNetworkComponent },
      // 运行日志
      { path: 'run-log', component: SystemSettingRunLogComponent },
      // 系统状态
      { path: 'sys-state', component: SystemSettingSysStateComponent },
    ],
  },
  // 高级设置
  {
    path: 'setting',
    component: SettingPageComponent,
    children: [
      // 网络测速
      { path: 'network-speed', component: SettingNetworkSpeedComponent },
      // 服务器设置
      { path: 'server', component: SettingServerComponent },
      // DDNS
      { path: 'ddns', component: SettingDdnsComponent },
      // VPN
      { path: 'vpn', component: SettingVpnComponent },
    ],
  },
  // 采集网关
  {
    path: 'collect_gateway',
    component: CollectGatewayPageComponent,
    children: [
      // 采集设置
      { path: 'collect-setting', component: CollectGatewaySettingComponent },
      // 采集日志
      { path: 'collect-log', component: CollectGatewayLogComponent },
      // 数据解析程序
      { path: 'data-handler', component: CollectGatewayDataHandlerComponent },
    ],
  },
  // { path: '', redirectTo: '/device-state', pathMatch: 'full' },
  { path: '', redirectTo: '/setting', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  routeData: Routes = routes;
}
