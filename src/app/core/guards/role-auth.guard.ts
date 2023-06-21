import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { UserStorageService } from "../services/user-storage.service";

@Injectable()
export class RoleAuthGuard implements CanActivate {
    
    constructor(
        private authService: AuthService, 
        private userStorage: UserStorageService, 
        private router: Router
    ) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        
        const user = this.userStorage.getCurrentUser();
        if (user?.role != route.data['role']) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }

}