import { TagDto } from "./tag.schema";
import { UserDto } from "./user.schema";

export interface ProblemDto {
    id: string;
    name: string;
    description: string;
    level: string;
    score: number;
    successSubmit: number;
    totalSubmit: number;
    author: UserDto;
    tags: TagDto[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ProblemPagingRequestDto {
    page: number;
    pageSize: number;
    name: string;
    tag: string;
    level: string;
    sort: string;
    orderBy: string
}

export interface ProblemPagingResponseDto {
    totalPage: number;
    page: number;
    data: ProblemDto[];
}