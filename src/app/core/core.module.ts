import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./guards/auth.guard";
import { AuthTokenInterceptor } from "./interceptors/auth-token.interceptor";
import { DataModule } from "../data/data.module";

@NgModule({
    imports: [
        HttpClientModule,
        DataModule
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptor,
            multi: true
        },
    ]
})
export class CoreModule {

}