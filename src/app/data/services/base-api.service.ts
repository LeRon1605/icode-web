import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class BaseApiService {
    protected baseApiUrl = environment.baseUrl;
    protected API_END_POINTS: any;

    constructor(protected http: HttpClient) {
        this.API_END_POINTS = {
            LOGIN_REQUEST: this.baseApiUrl + '/auth/login',
            REGISTER_REQUEST: this.baseApiUrl + '/auth/register',
            FORGET_PASSWORD_REQUEST: this.baseApiUrl + '/auth/forget-password',
            REFRESH_TOKEN_REQUEST: this.baseApiUrl + '/auth/refresh-token'
        };
    }
}