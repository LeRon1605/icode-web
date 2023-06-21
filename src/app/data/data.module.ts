import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthApiService } from "./services/auth-api.service";
import { BaseApiService } from "./services/base-api.service";

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        BaseApiService,
        AuthApiService,
    ]
})
export class DataModule {}