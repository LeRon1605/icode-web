import { NgModule } from "@angular/core";
import { LoginComponent } from "./pages/login/login.component";
import { AuthRoutingModule } from "./auth.routing";
import { RegisterComponent } from "./pages/register/register.component";
import { AuthComponent } from "./auth.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CoreModule } from "src/app/core/core.module";
import { AuthService } from "./auth.serivce";
import { SharedModule } from "src/app/shared/shared.module";
import { ForgetPasswordComponent } from "./pages/forget-password/forget-password.component";

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ForgetPasswordComponent
    ],
    imports: [
        AuthRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        CoreModule,
        SharedModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {}