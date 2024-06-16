import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bs-fibbonacci-test-page',
  templateUrl: './fibbonacci-test-page.component.html',
  styleUrls: ['./fibbonacci-test-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FibbonacciTestPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
