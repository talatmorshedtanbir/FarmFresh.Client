import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BaseComponent } from './core/components/base/base.component';

const routes: Routes = [
  {
    path: "",
    component: BaseComponent,
    children: [
      { path: "", loadChildren:()=> import('./dashboard/dashboard.module').then(m=> m.DashboardModule)},
    ],
    canActivate: [AuthGuard]
  },
  { path: "login", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
