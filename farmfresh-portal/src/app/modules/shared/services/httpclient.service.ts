import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthCacheService } from '../../auth/services/auth-cache.service';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
  baseUrl: string;
  
  constructor(public http: HttpClient,
    private authCacheService: AuthCacheService) {
    this.baseUrl = "" //environment.urls.api_base_url;
  }

  get<T>(url: string) {
    return this.http.get<T>(this.baseUrl + url, this.getHeaders());
  }

  getWithUrl(url: string) {
    return this.http.get(url, this.getHeaders());
  }

  getBlob(url: string) {
    return this.http.get(this.baseUrl + url, { responseType: "blob" });
  }

  post(url: string, data: any) {
    const payload = JSON.stringify(data);
    return this.http.post(this.baseUrl + url, payload, this.getHeaders());
  }

  postWithUrl(url: string, data: any) {
    const payload = JSON.stringify(data);
    return this.http.post(url, payload, this.getHeaders());
  }

  put(url: string, data: any) {
    const payload = JSON.stringify(data);
    return this.http.put(this.baseUrl + url, payload, this.getHeaders());
  }

  delete(url: string) {
    return this.http.delete(this.baseUrl + url, this.getHeaders());
  }
  
  getHeaders(): any {
    let token = this.authCacheService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      })
    };
    return httpOptions;
  }
}
