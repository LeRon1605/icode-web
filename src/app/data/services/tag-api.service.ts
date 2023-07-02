import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { TagDto } from "../schema/tag.schema";

@Injectable()
export class TagApiService extends BaseApiService {
    fetchAll() {
        return this.http.get<TagDto[]>(this.API_END_POINTS.TAG_REQUEST);
    }
}