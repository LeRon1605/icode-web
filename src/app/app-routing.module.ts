import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PureLayoutComponent } from './layout/pure-layout/pure-layout.component';
import { BasicLayoutComponent } from './layout/basic-layout/basic-layout.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    loadChildren: () => import('./feature/home/home.module').then(x => x.HomeModule),
    pathMatch: 'full'
  },

  {
    path: 'auth',
    component: PureLayoutComponent,
    loadChildren: () => import('./feature/auth/auth.module').then(x => x.AuthModule)
  },

  {
    path: 'admin/problem',
    component: SidebarLayoutComponent,
    loadChildren: () => import('./feature/problem/problem.module').then(x => x.ProblemModule)
  },

  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
