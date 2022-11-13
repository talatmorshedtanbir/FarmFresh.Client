import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { HttpClientService } from "src/app/modules/shared/services/httpclient.service";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { AuthCacheService } from './auth-cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSignIn = new EventEmitter<boolean>();
  redirectUrl:string | null = null;
  private url: string;
  
  constructor(private httpClient: HttpClientService,
    private authCacheService: AuthCacheService,
    private router: Router,) {
    this.url = "" //environment.urls.auth_server_url+"api/v1/auth";
  }

  authenticationUser(userDetails : any) {
    try {  
      return this.httpClient
        .postWithUrl(`${this.url}`, userDetails)
        .pipe(
          tap(() => {
            this.isSignIn.emit(true)
          }), 
          catchError(this.handleError)
        );
    } 
    catch (e) {
      throw e;
    }
  }

  forgotPassword(forgotPasswordRequest : any) {
    try {  
      return this.httpClient
        .postWithUrl(`${this.url}/forgotpassword`, forgotPasswordRequest)
        .pipe(
          tap(() => {
            this.isSignIn.emit(true)
          }), 
          catchError(this.handleError)
        );
    } 
    catch (e) {
      throw e;
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  logout(): void {
    this.authCacheService.clearAllCacheData();
    
    this.isSignIn.emit(false);
    this.router.navigate(["/login"]);
  }

  isLoggedIn(): boolean {
    return this.authCacheService.getLoggedIn();
  }
  
  checkLogin():EventEmitter<boolean>{
    return this.isSignIn;
  }
}
