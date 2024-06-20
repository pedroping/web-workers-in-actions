import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AllLangs,
  AvailableLangs,
  ITranslateDate,
} from '@shared/models/translate-models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  langChosed$ = new BehaviorSubject<AllLangs>('br');
  translateData$ = new BehaviorSubject<ITranslateDate | null>(null);

  constructor(private readonly http: HttpClient) {}

  startDomain() {
    this.http
      .get<ITranslateDate>('/assets/translate-data/translate-data.json')
      .subscribe((data) => this.translateData$.next(data));
  }

  toggleLang() {
    this.langChosed$.next(this.lang == 'br' ? 'en' : 'br');
  }

  setlang(lang: AllLangs) {
    this.langChosed$.next(lang);
  }

  getText(lang: AvailableLangs, id: string) {
    const langData = this.translateData[lang];

    return langData[id] || 'Not Found';
  }

  get translateData() {
    return this.translateData$.value as ITranslateDate;
  }

  get lang() {
    return this.langChosed$.value;
  }
}
