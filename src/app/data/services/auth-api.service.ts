import { Injectable } from "@angular/core";
import { LoginRequestDto, LoginResponseDto } from "../schema/auth.schema";
import { BaseApiService } from "./base-api.service";

@Injectable()
export class AuthApiService extends BaseApiService{
    authenticate(data: LoginRequestDto) {
        return this.http.post<LoginResponseDto>(this.API_END_POINTS.LOGIN_REQUEST, data);
    }
}