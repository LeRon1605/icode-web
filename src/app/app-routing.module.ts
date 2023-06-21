import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PureLayoutComponent } from './layout/pure-layout/pure-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PureLayoutComponent,
    loadChildren: () => import('./feature/home/home.module').then(x => x.HomeModule),
    pathMatch: 'full'
  },

  {
    path: 'auth',
    component: PureLayoutComponent,
    loadChildren: () => import('./feature/auth/auth.module').then(x => x.AuthModule)
  },

  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
