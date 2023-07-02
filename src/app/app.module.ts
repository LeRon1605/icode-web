import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './feature/auth/auth.module';
import { PureLayoutComponent } from './layout/pure-layout/pure-layout.component';
import { SharedModule } from './shared/shared.module';
import { BasicLayoutComponent } from './layout/basic-layout/basic-layout.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { ProblemModule } from './feature/problem/problem.module';

@NgModule({
  declarations: [
    AppComponent,
    PureLayoutComponent,
    BasicLayoutComponent,
    SidebarLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    ProblemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
