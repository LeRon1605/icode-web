import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserInfo } from "src/app/core/schema/user.schema";
import { AuthService } from "src/app/core/services/auth.service";
import { UserStorageService } from "src/app/core/services/user-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isAuthenticated: boolean;
    public currentUser: UserInfo | null;

    private currentUserSubscription: Subscription | null;
    private isAuthenticatedSubscription: Subscription | null;

    constructor(
        private userStorageService: UserStorageService, 
        private authService: AuthService
    ) {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.currentUserSubscription = null;
        this.isAuthenticatedSubscription = null;
    }

    ngOnInit(): void {
        this.currentUserSubscription = this.userStorageService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

        this.isAuthenticatedSubscription = this.authService.authenticated.subscribe(authenticated => {
            this.isAuthenticated = authenticated;
        });
    }

    onLogoutClicked() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.currentUserSubscription?.unsubscribe();
        this.isAuthenticatedSubscription?.unsubscribe();
    }
}