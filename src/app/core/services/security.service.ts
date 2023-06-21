import { Injectable } from "@angular/core";
import { AuthApiService } from "src/app/data/services/auth-api.service";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequestDto, RefreshTokenRequestDto } from "src/app/data/schema/auth.schema";
import { ErrorApiResponse } from "../schema/error.schema";
import { TokenStorageService } from "./token-storage.service";
import { UserStorageService } from "./user-storage.service";

@Injectable({ providedIn: 'root' })
export class SecurityService {
    public authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private authApiService: AuthApiService, 
        private tokenStorageService: TokenStorageService,
        private userStorageService: UserStorageService
    ) { }

    login(usernameOrEmail: string, password: string) {
        const data: LoginRequestDto = {
            name: usernameOrEmail,
            password: password
        };

        return this.authApiService.authenticate(data)
                                .pipe(
                                    tap(response => {
                                        this.authenticated.next(true);
                                        this.userStorageService.setCurrentUser(this.tokenStorageService.getUserInfoFromToken(response.access_token));
                                        this.tokenStorageService.setAccessToken(response.access_token);
                                        this.tokenStorageService.setRefreshToken(response.refresh_token);
                                    }),
                                    map(response => {
                                        return this.tokenStorageService.getUserInfoFromToken(response.access_token);
                                    }),
                                    catchError<any, Observable<ErrorApiResponse>>((errorResponse): Observable<ErrorApiResponse> => {
                                        this.authenticated.next(false);
                                        return throwError({
                                            error: errorResponse.error.error,
                                            detail: errorResponse.error.detail
                                        });
                                    })
                                );
    }

    refreshToken() {
        if (!this.tokenStorageService.isValidAccessToken() && this.tokenStorageService.getAccessToken() != null && this.tokenStorageService.getRefreshToken() != null) {
            const data: RefreshTokenRequestDto = {
                accessToken: <string>this.tokenStorageService.getAccessToken(),
                refreshToken: <string>this.tokenStorageService.getRefreshToken()
            }
            this.authApiService.refreshToken(data)
                                .subscribe(
                                    response => {
                                        this.authenticated.next(true);
                                        this.userStorageService.setCurrentUser(this.tokenStorageService.getUserInfoFromToken(response.access_token));
                                        this.tokenStorageService.setAccessToken(response.access_token);
                                        this.tokenStorageService.setRefreshToken(response.refresh_token);
                                    },
                                    error => {
                                        this.authenticated.next(false);
                                        this.userStorageService.setCurrentUser(null);
                                        this.tokenStorageService.clear();
                                    }
                                );
        }
    }

    logout() {
        this.userStorageService.setCurrentUser(null);
        this.tokenStorageService.clear();
        this.authenticated.next(false);
    }

    autoLogin() {
        if (this.tokenStorageService.isValidAccessToken()) {
            const token = this.tokenStorageService.getToken();
            this.authenticated.next(true);
            this.userStorageService.setCurrentUser(this.tokenStorageService.getUserInfoFromToken(<string>token.accessToken));
        } else {
            this.userStorageService.setCurrentUser(null);
            this.tokenStorageService.clear();
            this.authenticated.next(false);
            this.refreshToken();
        }
    }

    isAuthenticated() {
        return this.tokenStorageService.isValidAccessToken();
    }
}