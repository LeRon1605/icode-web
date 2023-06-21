export interface LoginRequestDto {
    name: string;
    password: string;
}

export interface LoginResponseDto {
    access_token: string;
    refresh_token: string
}