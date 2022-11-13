import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from '../../shared/services/cache.service';

@Injectable({
  providedIn: 'root'
})

export class AuthCacheService {
  constructor(public http: HttpClient,
    private cacheService: CacheService) {   
  }

  getLoggedIn() {
    return this.cacheService.get<boolean>('isLoggedIn')!;
  }

  setLoggedIn() {
    this.cacheService.setItem('isLoggedIn', 'true');
  }

  clearLoggedIn() {
    this.cacheService.setItem('isLoggedIn', 'false');
  }

  getUserRole() {
    return this.cacheService.getItem('userRole')!;
  }

  setUserRole(role:any) {
    this.cacheService.setItem('userRole', role)!;
  }

  clearAllCacheData() {
    this.cacheService.clearCache();
  }

  getToken() {
    return this.cacheService.getItem('token')!;
  }
}