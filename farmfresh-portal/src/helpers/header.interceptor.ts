import { AuthCacheService } from './../app/modules/auth/services/auth-cache.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private authCacheService: AuthCacheService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authCacheService.getToken();
    const isBaseUrl = request.url.startsWith(environment.urls.api_base_url);
    const isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn && isBaseUrl){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
