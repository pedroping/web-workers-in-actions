import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { TranslateService } from '@core/services/translate/translate.service';
import { map, startWith } from 'rxjs';
import { environment } from 'src/environments/environment';

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
      val == 'br'
        ? environment.baseUrl + '/assets/images/brasil.png'
        : environment.baseUrl + '/assets/images/usa.png',
    ),
  );

  constructor(private readonly translateService: TranslateService) {}

  @HostListener('click') onClick() {
    this.translateService.toggleLang();
  }
}
