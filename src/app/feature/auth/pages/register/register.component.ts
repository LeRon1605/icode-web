import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CompareValidator } from "src/app/shared/validators/compare.validator";
import { AuthService } from "../../auth.serivce";
import { ALERT_TYPE } from "src/app/core/constants/alert-type.constant";
import { AlertType } from "src/app/shared/components/alert/alert.type";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    public alertData: { 
        type: AlertType;
        message: string;
        isNotification: boolean;
    };
    public registerForm: FormGroup;

    constructor(private authService: AuthService) {
        this.alertData = {
            type: '',
            message: '',
            isNotification: false
        };

        this.registerForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            username: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl('', [Validators.required, CompareValidator('password')]),
            gender: new FormControl('', [Validators.required]),
            allowNotification : new FormControl(false)
        });
    }

    onSubmit() {
        if (!this.registerForm.valid) return;

        const { username, email, password, confirmPassword, gender, allowNotification } = this.registerForm.value;
        this.authService.register(username, email, password, confirmPassword, gender, allowNotification)
                               .subscribe(
                                    response => {
                                        this.alertData = {
                                            type: ALERT_TYPE['SUCCESS'],
                                            message: 'Đăng kí tài khoản thành công',
                                            isNotification: true
                                        };
                                        this.registerForm.reset({
                                            gender: ''
                                        });
                                    },
                                    error => {
                                        this.alertData = {
                                            type: ALERT_TYPE['ERROR'],
                                            message: error.detail,
                                            isNotification: true
                                        };
                                    }
                               )
    }
}