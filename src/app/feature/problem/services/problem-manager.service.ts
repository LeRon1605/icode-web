import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ProblemDto, ProblemPagingRequestDto } from "src/app/data/schema/problem.schema";
import { ProblemApiService } from "src/app/data/services/problem-api.service";

@Injectable()
export class ProblemManagerService {
    public problems: BehaviorSubject<ProblemDto[]>;

    constructor(private problemApiService: ProblemApiService) { 
        this.problems = new BehaviorSubject<ProblemDto[]>([]);
    }

    fetchAll() {
        this.problemApiService.fetchAll().subscribe(
            response => {
                this.problems.next(response)
            },
            errror => this.problems.next([])
        );
    }

    filterAndPaging(
        page: number,
        pageSize: number,
        name: string,
        tag: string,
        level: string,
        sort: string,
        orderBy: string
    ) {
        const data: ProblemPagingRequestDto = {
            page: page,
            pageSize: pageSize,
            name: name,
            tag: tag,
            level: level,
            sort: sort,
            orderBy: orderBy
        };

        return this.problemApiService.filterAndPaging(data);
    }
}