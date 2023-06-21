import { Injectable } from "@angular/core";
import { AuthApiService } from "src/app/data/services/auth-api.service";
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequestDto, RefreshTokenRequestDto } from "src/app/data/schema/auth.schema";
import { ErrorApiResponse } from "../schema/error.schema";
import { TokenStorageService } from "./token-storage.service";
import { UserStorageService } from "./user-storage.service";
import { TokenCredential } from "../schema/token.schema";

@Injectable()
export class AuthService {
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
                                        this.userStorageService.setCurrentUser(this.tokenStorageService.getUserInfoFromToken(response.access_token));
                                        this.tokenStorageService.setAccessToken(response.access_token);
                                        this.tokenStorageService.setRefreshToken(response.refresh_token);
                                    }),
                                    map(response => {
                                        return this.tokenStorageService.getUserInfoFromToken(response.access_token);
                                    }),
                                    catchError<any, Observable<ErrorApiResponse>>((errorResponse): Observable<ErrorApiResponse> => {
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
                                        this.userStorageService.setCurrentUser(this.tokenStorageService.getUserInfoFromToken(response.access_token));
                                        this.tokenStorageService.setAccessToken(response.access_token);
                                        this.tokenStorageService.setRefreshToken(response.refresh_token);
                                    },
                                    error => {
                                        this.userStorageService.setCurrentUser(null);
                                        this.tokenStorageService.clear();
                                    }
                                );
        }
    }

    autoLogin() {
        if (this.tokenStorageService.isValidAccessToken()) {
            const token = this.tokenStorageService.getToken();
            this.userStorageService.setCurrentUser(this.tokenStorageService.getUserInfoFromToken(<string>token.accessToken));
        } else {
            this.userStorageService.setCurrentUser(null);
            this.tokenStorageService.clear();
            this.refreshToken();
        }
    }
}