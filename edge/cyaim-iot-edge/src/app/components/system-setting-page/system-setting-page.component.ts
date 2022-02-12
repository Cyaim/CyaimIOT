import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-system-setting-page',
  templateUrl: './system-setting-page.component.html',
  styleUrls: ['./system-setting-page.component.scss'],
})
export class SystemSettingPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['./network'], { relativeTo: this.route });
  }
}
