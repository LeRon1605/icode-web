import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./guards/auth.guard";
import { AuthTokenInterceptor } from "./interceptors/auth-token.interceptor";
import { AuthService } from "./services/auth.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        AuthGuard,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptor,
            multi: true
        },
    ]
})
export class CoreModule {

}