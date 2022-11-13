import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CacheService {
  constructor(public http: HttpClient) {   
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  get<T>(key: string) {
    try {
        let parseResult: T = JSON.parse(localStorage.getItem(key)!);

        return parseResult;
    } catch(e) {
        return undefined;
    }
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  clearCache() {
    localStorage.clear();
  }
}