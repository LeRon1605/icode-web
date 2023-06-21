import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) {}

  canActivate(): boolean {
    if (!this.securityService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
  
}