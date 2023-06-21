import { Injectable } from "@angular/core";
import { TOKEN_STORAGE } from "../constants/token-storage.constant";
import { UserInfo } from "../schema/user.schema";
import { TokenCredential } from "../schema/token.schema";

@Injectable()
export class TokenStorageService {
    setAccessToken(token: string) {
        localStorage.setItem(TOKEN_STORAGE.ACCESS_TOKEN, token);
    }

    setRefreshToken(token: string) {
        localStorage.setItem(TOKEN_STORAGE.REFRESH_TOKEN, token);
    }

    getToken() : TokenCredential {
        return {
            accessToken: localStorage.getItem(TOKEN_STORAGE.ACCESS_TOKEN),
            refreshToken: localStorage.getItem(TOKEN_STORAGE.REFRESH_TOKEN)
        }
    }

    parseJwtToken(token: string): UserInfo {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const jwtPayload = JSON.parse(jsonPayload);
        return {
            id: jwtPayload.ID,
            name: jwtPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            role: jwtPayload.Role
        };
    }
}