import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AuthComponent } from "./auth.component";
import { NoAuthGuard } from "src/app/core/guards/no-auth.guard";
import { ForgetPasswordComponent } from "./pages/forget-password/forget-password.component";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'forget-password',
                component: ForgetPasswordComponent,
                canActivate: [NoAuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }