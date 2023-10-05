import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor() { }

  isSimilarity(str1: string, str2: string, needSimilarity: number) {
    const set1 = new Set(str1.split(''));
    const set2 = new Set(str2.split(''));

    const intersection = new Set([...set1].filter(item => set2.has(item)));
    const union = new Set([...set1, ...set2]);

    const stringSimilarity = intersection.size / union.size;
    return stringSimilarity >= needSimilarity;
  }
}
