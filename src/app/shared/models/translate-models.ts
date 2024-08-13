export interface ILangTranslation {
  [key: string]: string;
}
export type AvailableLangs = 'en';
export type AllLangs = 'en' | 'br';
export type ITranslateDate = Record<AvailableLangs, ILangTranslation>;
