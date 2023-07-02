import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TagDto } from "src/app/data/schema/tag.schema";
import { TagApiService } from "src/app/data/services/tag-api.service";

@Injectable()
export class TagManagerService {
    public tags: BehaviorSubject<TagDto[]>;

    constructor(private tagApiService: TagApiService) { 
        this.tags = new BehaviorSubject<TagDto[]>([]);
    }

    fetchAll() {
        this.tagApiService.fetchAll().subscribe(
            response => {
                this.tags.next(response)
            },
            errror => this.tags.next([])
        );
    }
}