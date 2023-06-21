import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './feature/auth/auth.module';
import { PureLayoutComponent } from './layout/pure-layout/pure-layout.component';
import { SharedModule } from './shared/shared.module';
import { BasicLayoutComponent } from './layout/basic-layout/basic-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    PureLayoutComponent,
    BasicLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
