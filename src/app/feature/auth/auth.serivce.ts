import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ErrorApiResponse } from "src/app/core/schema/error.schema";
import { ForgetPasswordRequestDto, RegisterRequestDto } from "src/app/data/schema/auth.schema";
import { AuthApiService } from "src/app/data/services/auth-api.service";

@Injectable()
export class AuthService {
    constructor(private authApiService: AuthApiService) { }

    register(
        username: string, email: string, password: string, 
        confirmPassword: string, gender: boolean, allowNotification: boolean
    ) {
        const data: RegisterRequestDto = {
            username,
            email,
            password,
            confirmPassword,
            gender,
            allowNotification
        };

        return this.authApiService.register(data)
                                .pipe(
                                    catchError<any, Observable<ErrorApiResponse>>((errorResponse): Observable<ErrorApiResponse> => {
                                        return throwError({
                                            error: errorResponse.error.error,
                                            detail: errorResponse.error.detail
                                        });
                                    })
                                );
    }

    forgetPassword(usernameOrEmail: string) {
        const data: ForgetPasswordRequestDto = {
            name: usernameOrEmail
        };

        return this.authApiService.requestForgetPassword(data)
                                .pipe(
                                    catchError<any, Observable<ErrorApiResponse>>((errorResponse): Observable<ErrorApiResponse> => {
                                        return throwError({
                                            error: errorResponse.error.error,
                                            detail: errorResponse.error.detail
                                        });
                                    })
                                );
    }
}