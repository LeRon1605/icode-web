import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthApiService } from "./services/auth-api.service";
import { BaseApiService } from "./services/base-api.service";
import { AuthGuard } from "../core/guards/auth.guard";
import { NoAuthGuard } from "../core/guards/no-auth.guard";
import { RoleAuthGuard } from "../core/guards/role-auth.guard";

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        BaseApiService,
        AuthApiService,
        AuthGuard,
        NoAuthGuard,
        RoleAuthGuard
    ]
})
export class DataModule {}