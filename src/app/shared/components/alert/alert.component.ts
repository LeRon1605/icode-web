import { Component, Input } from "@angular/core";
import { AlertType } from "./alert.type";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input()
    public type: AlertType;

    @Input()
    public message: string;

    constructor() {
        this.type = 'success';
        this.message = '';
    }
}