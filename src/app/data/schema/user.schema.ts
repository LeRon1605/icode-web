export interface UserDto {
    id: string;
    username: string;
    email: string;
    avatar: string;
    gender: string;
    allowNotification: number;
    createdAt: Date;
    updatedAt: Date;
}