import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ErrorApiResponse } from "src/app/core/schema/error.schema";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent{
    public loginForm: FormGroup;
    public errorMessage: string | null;

    constructor(private authService: AuthService, private router: Router) {
        this.errorMessage = null;

        this.loginForm = new FormGroup({
            usernameOrEmail: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        if (!this.loginForm.valid) return;

        this.authService.login(this.loginForm.value.usernameOrEmail, this.loginForm.value.password)
                        .subscribe(
                            val => {
                                this.router.navigate(['']);
                                this.errorMessage = null;
                            },
                            (errorResponse: ErrorApiResponse) => {
                                this.errorMessage = errorResponse.detail;
                            }
                        );
    }
}