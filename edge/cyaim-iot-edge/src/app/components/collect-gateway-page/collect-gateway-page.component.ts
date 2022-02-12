import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collect-gateway-page',
  templateUrl: './collect-gateway-page.component.html',
  styleUrls: ['./collect-gateway-page.component.scss'],
})
export class CollectGatewayPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['./data-handler'], { relativeTo: this.route });
  }
}
