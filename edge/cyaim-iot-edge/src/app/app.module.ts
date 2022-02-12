import { DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';

import { LoadSvgSources } from './utils/svg.util';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingPageComponent } from './components/setting-page/setting-page.component';
import { SystemSettingPageComponent } from './components/system-setting-page/system-setting-page.component';
import { CollectGatewayPageComponent } from './components/collect-gateway-page/collect-gateway-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { DeviceStatePageComponent } from './components/device-state-page/device-state-page.component';
import { DeviceOverviewComponent } from './components/device-state-page/device-overview/device-overview.component';
import { DeviceInternetComponent } from './components/device-state-page/device-internet/device-internet.component';
import { SystemSettingNetworkComponent } from './components/system-setting-page/system-setting-network/system-setting-network.component';
import { SystemSettingRunLogComponent } from './components/system-setting-page/system-setting-run-log/system-setting-run-log.component';
import { SystemSettingSysStateComponent } from './components/system-setting-page/system-setting-sys-state/system-setting-sys-state.component';
import { SettingServerComponent } from './components/setting-page/setting-server/setting-server.component';
import { SettingDdnsComponent } from './components/setting-page/setting-ddns/setting-ddns.component';
import { SettingVpnComponent } from './components/setting-page/setting-vpn/setting-vpn.component';
import { CollectGatewaySettingComponent } from './components/collect-gateway-page/collect-gateway-setting/collect-gateway-setting.component';
import { CollectGatewayLogComponent } from './components/collect-gateway-page/collect-gateway-log/collect-gateway-log.component';
import { CollectGatewayDataHandlerComponent } from './components/collect-gateway-page/collect-gateway-data-handler/collect-gateway-data-handler.component';
import {
  GetPaginator,
  MatPaginatorIntlCroService,
} from './services/MatPaginatorIntlCro/mat-paginator-intl-cro.service';
import { EditTaskComponent } from './components/collect-gateway-page/collect-gateway-setting/edit-task/edit-task.component';
import { EditHandlerComponent } from './components/collect-gateway-page/collect-gateway-data-handler/edit-handler/edit-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SettingPageComponent,
    SystemSettingPageComponent,
    CollectGatewayPageComponent,
    NotFoundPageComponent,
    DeviceStatePageComponent,
    DeviceOverviewComponent,
    DeviceInternetComponent,
    SystemSettingNetworkComponent,
    SystemSettingRunLogComponent,
    SystemSettingSysStateComponent,
    SettingServerComponent,
    SettingDdnsComponent,
    SettingVpnComponent,
    CollectGatewaySettingComponent,
    CollectGatewayLogComponent,
    CollectGatewayDataHandlerComponent,
    EditTaskComponent,
    EditHandlerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [
    {
      // 分页组件语言选择
      provide: MatPaginatorIntl,
      useValue: GetPaginator(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(ir: MatIconRegistry, ds: DomSanitizer) {
    LoadSvgSources(ir, ds);
  }
}
