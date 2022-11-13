import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BaseComponent } from './components/base/base.component';
import { CoreRoutingModule } from './core-routing.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
