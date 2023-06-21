import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./guards/auth.guard";
import { AuthTokenInterceptor } from "./interceptors/auth-token.interceptor";
import { AuthService } from "./services/auth.service";
import { DataModule } from "../data/data.module";
import { TokenStorageService } from "./services/token-storage.service";
import { UserStorageService } from "./services/user-storage.service";

@NgModule({
    imports: [
        HttpClientModule,
        DataModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        TokenStorageService,
        UserStorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptor,
            multi: true
        },
    ]
})
export class CoreModule {

}