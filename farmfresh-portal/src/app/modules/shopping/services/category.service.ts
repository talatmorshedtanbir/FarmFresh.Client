import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { HttpClientService } from "src/app/modules/shared/services/httpclient.service";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlSuffix: string;
  
  constructor(private httpClient: HttpClientService,
    private router: Router,) {
    this.urlSuffix = environment.urls.auth_server_url+"categories";
  }

  getAllCategories(): Observable<any> {
    try {
      return this.httpClient
        .get(`${this.urlSuffix}`)
        .pipe(tap(), catchError(this.handleError));
    } catch (e) {
      throw e;
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
