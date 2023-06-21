import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth.serivce";
import { AlertType } from "src/app/shared/components/alert/alert.type";
import { ALERT_TYPE } from "src/app/core/constants/alert-type.constant";

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
    public alertData: { 
        type: AlertType;
        message: string;
        isNotification: boolean;
    };
    public forgetPasswordForm: FormGroup;

    constructor(private authService: AuthService) {
        this.alertData = {
            type: '',
            message: '',
            isNotification: false
        };

        this.forgetPasswordForm = new FormGroup({
            usernameOrEmail: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        if (!this.forgetPasswordForm.valid) return;

        const { usernameOrEmail } = this.forgetPasswordForm.value;
        this.authService.forgetPassword(usernameOrEmail)
                        .subscribe(
                            response => {
                                this.alertData = {
                                    type: ALERT_TYPE['SUCCESS'],
                                    message: 'Vui lòng kiểm tra email để tiếp tục',
                                    isNotification: true
                                };
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