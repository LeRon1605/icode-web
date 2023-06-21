import { Injectable } from "@angular/core";
import { TOKEN_STORAGE } from "../constants/token-storage.constant";
import { UserInfo } from "../schema/user.schema";
import { TokenCredential } from "../schema/token.schema";
import { CLAIMS } from "../constants/claim.constant";

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
    setAccessToken(token: string) {
        localStorage.setItem(TOKEN_STORAGE.ACCESS_TOKEN, token);
    }

    setRefreshToken(token: string) {
        localStorage.setItem(TOKEN_STORAGE.REFRESH_TOKEN, token);
    }

    getAccessToken() : string | null {
        return localStorage.getItem(TOKEN_STORAGE.ACCESS_TOKEN);
    }

    getRefreshToken() : string | null {
        return localStorage.getItem(TOKEN_STORAGE.REFRESH_TOKEN)
    }
 
    getToken() : TokenCredential {
        return {
            accessToken: localStorage.getItem(TOKEN_STORAGE.ACCESS_TOKEN),
            refreshToken: localStorage.getItem(TOKEN_STORAGE.REFRESH_TOKEN)
        }
    }

    clear() {
        localStorage.removeItem(TOKEN_STORAGE.ACCESS_TOKEN);
        localStorage.removeItem(TOKEN_STORAGE.REFRESH_TOKEN);
    }

    parseJwtToken(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    getUserInfoFromToken(token: string): UserInfo {
        const jwtPayload = this.parseJwtToken(token);
        return {
            id: jwtPayload[CLAIMS.ID],
            name: jwtPayload[CLAIMS.NAME],
            role: jwtPayload[CLAIMS.ROLE]
        };
    }

    isValidAccessToken() {
        const token = this.getToken();
        if (token.accessToken == null) return false;

        const claims = this.parseJwtToken(<string>token.accessToken);
        const expireTime = new Date(claims[CLAIMS.EXPIRE]);

        return expireTime < new Date();
    }
}