import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  }, 
  { path: 'notfound', 
    loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundModule) 
  },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
