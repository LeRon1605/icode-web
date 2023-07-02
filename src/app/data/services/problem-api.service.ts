import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { ProblemDto, ProblemPagingRequestDto, ProblemPagingResponseDto } from "../schema/problem.schema";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class ProblemApiService extends BaseApiService {
    fetchAll() {
        return this.http.get<ProblemDto[]>(this.API_END_POINTS.PROBLEM_REQUEST);
    }

    filterAndPaging(problemPagingRequestDto: ProblemPagingRequestDto) {
        return this.http.get<ProblemPagingResponseDto>(this.API_END_POINTS.PROBLEM_REQUEST, {
            params: this.getPagingParams(problemPagingRequestDto)
        });
    }

    private getPagingParams(problemPagingRequestDto: ProblemPagingRequestDto) : HttpParams {
        let params: HttpParams = new HttpParams().append('page', problemPagingRequestDto.page).append('pageSize', problemPagingRequestDto.pageSize);
        if (problemPagingRequestDto.level.trim().length > 0) {
            params = params.append('level', problemPagingRequestDto.level);
        };
        if (problemPagingRequestDto.name.trim().length > 0) {
            params = params.append('name', problemPagingRequestDto.name);
        };
        if (problemPagingRequestDto.orderBy.trim().length > 0) {
            params = params.append('orderBy', problemPagingRequestDto.orderBy);
        };
        if (problemPagingRequestDto.sort.trim().length > 0) {
            params = params.append('sort', problemPagingRequestDto.sort);
        };
        if (problemPagingRequestDto.tag.trim().length > 0) {
            params = params.append('tag', problemPagingRequestDto.tag);
        };
        return params;
    }
}