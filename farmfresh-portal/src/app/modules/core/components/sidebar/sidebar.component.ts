import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCacheService } from 'src/app/modules/auth/services/auth-cache.service';

@Component({
  selector: 'farmfresh-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private authCacheService: AuthCacheService) { 
    }

  ngOnInit(): void {
    
  }
}
