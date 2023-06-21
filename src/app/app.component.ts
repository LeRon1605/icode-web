import { Component, OnInit } from '@angular/core';
import { SecurityService } from './core/services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  
  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.securityService.autoLogin();
  }
}