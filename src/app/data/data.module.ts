import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthApiService } from "./services/auth-api.service";
import { BaseApiService } from "./services/base-api.service";
import { AuthGuard } from "../core/guards/auth.guard";
import { NoAuthGuard } from "../core/guards/no-auth.guard";
import { RoleAuthGuard } from "../core/guards/role-auth.guard";
import { ProblemApiService } from "./services/problem-api.service";
import { TagApiService } from "./services/tag-api.service";

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        BaseApiService,
        AuthApiService,
        ProblemApiService,
        TagApiService,
        AuthGuard,
        NoAuthGuard,
        RoleAuthGuard
    ]
})
export class DataModule {}