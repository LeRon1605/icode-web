export interface LoginRequestDto {
    name: string;
    password: string;
}

export interface LoginResponseDto {
    access_token: string;
    refresh_token: string;
}

export interface RefreshTokenRequestDto {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenResponseDto {
    access_token: string;
    refresh_token: string;
}

export interface RegisterRequestDto {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: boolean;
    allowNotification: boolean;
}

export interface RegisterResponseDto {
    
}

export interface ForgetPasswordRequestDto {
    name: string;
}

export interface ForgetPasswordResponseDto {
}