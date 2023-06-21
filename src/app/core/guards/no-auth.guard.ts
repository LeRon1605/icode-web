import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SecurityService } from "../services/security.service";

@Injectable()
export class NoAuthGuard implements CanActivate {
    
    constructor(
        private securityService: SecurityService, 
        private router: Router
    ) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.securityService.isAuthenticated()) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }

}