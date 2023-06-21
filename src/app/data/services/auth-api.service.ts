import { Injectable } from "@angular/core";
import { LoginRequestDto, LoginResponseDto, RefreshTokenRequestDto, RefreshTokenResponseDto, RegisterRequestDto, RegisterResponseDto } from "../schema/auth.schema";
import { BaseApiService } from "./base-api.service";

@Injectable()
export class AuthApiService extends BaseApiService{
    authenticate(data: LoginRequestDto) {
        return this.http.post<LoginResponseDto>(this.API_END_POINTS.LOGIN_REQUEST, data);
    }

    register(data: RegisterRequestDto) {
        return this.http.post<RegisterResponseDto>(this.API_END_POINTS.REGISTER_REQUEST, data);
    }

    refreshToken(data: RefreshTokenRequestDto) {
        return this.http.post<RefreshTokenResponseDto>(this.API_END_POINTS.REFRESH_TOKEN_REQUEST, data);
    }
}