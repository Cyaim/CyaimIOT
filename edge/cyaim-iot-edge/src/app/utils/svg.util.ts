import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// 统一管理svg字体库，避免各个模块分散加载。所以使用公共文件统一处理
// 再到core.module.ts中引入。在core模块下的所有组价都可以使用svg，不用单独加载
export const LoadSvgSources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const iconDir = 'assets/icons';
  // const sidebarDir = `${imgDir}/sidebar`;
  // ir.addSvgIcon(
  //   'day',
  //   ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`)
  // );
  // ir.addSvgIcon(
  //   'month',
  //   ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`)
  // );
  // ir.addSvgIcon(
  //   'project',
  //   ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`)
  // );
  // ir.addSvgIcon(
  //   'projects',
  //   ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`)
  // );
  // ir.addSvgIcon(
  //   'week',
  //   ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`)
  // );
  // const days = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  //   22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  // ];
  // const dayDir = `${imgDir}/days`;
  // days.forEach((d) =>
  //   ir.addSvgIcon(
  //     `day${d}`,
  //     ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)
  //   )
  // );

  // // 增加一个svg图标集合
  // const avatarDir = `${imgDir}/avatar`;
  // ir.addSvgIconSetInNamespace(
  //   'avatars',
  //   ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`)
  // );

  const icons: String[] = ['deviceState:internet', 'sysSetting:infomation'];
  icons.forEach((item) => {
    let iconName = item.split(':');
    if (iconName.length < 2) {
      ir.addSvgIcon(
        iconName[0],
        ds.bypassSecurityTrustResourceUrl(`${iconDir}/${iconName[0]}.svg`)
      );
    } else {
      ir.addSvgIconInNamespace(
        iconName[0],
        iconName[1],
        ds.bypassSecurityTrustResourceUrl(`${iconDir}/${iconName[1]}.svg`)
      );
    }
  });
};
