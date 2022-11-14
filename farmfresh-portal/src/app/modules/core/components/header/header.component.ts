import { AuthService } from './../../../auth/services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'farmfresh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() headerEmit = new EventEmitter<string>();
  productName: string = '';

  constructor(private authService: AuthService) { 

  }

  ngOnInit(): void {
  }

  searchProduct() {
    this.headerEmit.emit(this.productName);
  }

  logout() {
    this.authService.logout();
  }
}
