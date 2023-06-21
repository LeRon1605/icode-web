import { NgModule } from "@angular/core";
import { LoginComponent } from "./pages/login/login.component";
import { AuthRoutingModule } from "./auth.routing";
import { RegisterComponent } from "./pages/register/register.component";
import { AuthComponent } from "./auth.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CoreModule } from "src/app/core/core.module";
import { AuthHandlerService } from "./auth-handler.serivce";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        AuthRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        CoreModule,
        SharedModule
    ],
    providers: [
        AuthHandlerService
    ]
})
export class AuthModule {}