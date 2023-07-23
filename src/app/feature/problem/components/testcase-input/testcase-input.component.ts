import { Component, Input } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-testcase-input',
    templateUrl: './testcase-input.component.html',
    styleUrls: ['./testcase-input.component.css']
})
export class TestcaseInputComponent {
    @Input()
    public testcaseFormGroup: FormGroup;

    constructor() {
        this.testcaseFormGroup = new FormGroup({});
    }
}