import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { TranslateService } from '@core/services/translate/translate.service';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'change-lang',
  templateUrl: './change-lang.component.html',
  styleUrls: ['./change-lang.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, AsyncPipe],
})
export class ChangeLangComponent {
  langImg$ = this.translateService.langChosed$.asObservable().pipe(
    startWith(this.translateService.lang),
    map((val) =>
      val == 'br' ? '/assets/images/usa.png' : '/assets/images/brasil.png'
    )
  );

  constructor(private readonly translateService: TranslateService) {}

  @HostListener('click') onClick() {
    this.translateService.toggleLang();
  }
}
