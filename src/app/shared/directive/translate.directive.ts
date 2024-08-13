import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TranslateService } from '@core/services/translate/translate.service';
import { AvailableLangs } from '@shared/models/translate-models';
import { startWith, switchMap } from 'rxjs';

@Directive({
  selector: '[translate]',
  standalone: true,
})
export class TranslateDirective implements OnInit {
  initialContent: string = '';

  @Input({ required: true, alias: 'translate' }) id!: string;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getInitialContent();

    this.translateService.translateData$
      .pipe(
        switchMap(() =>
          this.translateService.langChosed$.pipe(
            startWith(this.translateService.lang)
          )
        )
      )
      .subscribe((lang) => {
        if (lang === 'br') {
          this.elementRef.nativeElement.innerHTML = this.initialContent;
          return;
        }

        this.setContent(lang);
      });
  }

  setContent(lang: AvailableLangs) {
    this.elementRef.nativeElement.innerHTML = this.translateService.getText(
      lang,
      this.id
    );
  }

  getInitialContent() {
    this.initialContent = this.elementRef.nativeElement.innerHTML;
  }
}
