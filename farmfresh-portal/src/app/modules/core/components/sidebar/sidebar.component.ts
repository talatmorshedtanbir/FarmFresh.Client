import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCacheService } from 'src/app/modules/auth/services/auth-cache.service';

@Component({
  selector: 'farmfresh-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() sideMenuClass = "side-menu";
  @Output() onMenuChange = new EventEmitter<any>();
  
  isMenuActive: boolean = false;
  sideMenuPinId = "sidemenu-pinned";

  constructor(
    private router: Router,
    private authCacheService: AuthCacheService) { 
    }

  ngOnInit(): void {
    
  }

  increaseSidebarMargin() {
    if(this.sideMenuClass === "toggled-2") {
      const sideBar = document.querySelector<HTMLElement>('body main .menu-toggled')!;
      sideBar.style.marginLeft = '300px';
    }
    else if(this.sideMenuClass === "side-menu") {
      const sideBar = document.querySelector<HTMLElement>('body main .menu-full')!;
      sideBar.style.marginLeft = '300px';
    }
  }

  decreaseSidebarMargin() {
    if(this.sideMenuClass === "toggled-2") {
      const sideBar = document.querySelector<HTMLElement>('body main .menu-toggled')!;
      sideBar.style.marginLeft = '50px';
    }
    else if(this.sideMenuClass === "side-menu") {
      const sideBar = document.querySelector<HTMLElement>('body main .menu-full')!;
      sideBar.style.marginLeft = '300px';
    }
  }

  toggleMenu() {
    this.onMenuChange.emit();
    
    if(this.sideMenuPinId === "sidemenu-pinned") {
      this.sideMenuPinId = "sidemenu-unpinned";
      
    }
    else {
      this.sideMenuPinId = "sidemenu-pinned";
      this.increaseSidebarMargin();
    }
  }
}
