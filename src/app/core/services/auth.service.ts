import { Injectable } from "@angular/core";
import { AuthApiService } from "src/app/data/services/auth-api.service";
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequestDto } from "src/app/data/schema/auth.schema";
import { ErrorApiResponse } from "../schema/error.schema";
import { TokenStorageService } from "./token-storage.service";
import { UserStorageService } from "./user-storage.service";

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
                                        this.userStorageService.setCurrentUser(this.tokenStorageService.parseJwtToken(response.access_token));
                                        this.tokenStorageService.setAccessToken(response.access_token);
                                        this.tokenStorageService.setRefreshToken(response.refresh_token);
                                    }),
                                    map(response => {
                                        return this.tokenStorageService.parseJwtToken(response.access_token);
                                    }),
                                    catchError<any, Observable<ErrorApiResponse>>((errorResponse): Observable<ErrorApiResponse> => {
                                        return throwError({
                                            error: errorResponse.error.error,
                                            detail: errorResponse.error.detail
                                        });
                                    })
                                );
    }

    autoLogin() {
        
    }
}