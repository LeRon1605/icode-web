import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-testcase-input',
    templateUrl: './testcase-input.component.html',
    styleUrls: ['./testcase-input.component.css']
})
export class TestcaseInputComponent {
    @Input()
    public testcaseFormGroup: FormGroup;

    @Input()
    public index: number;

    @Output()
    public remove: EventEmitter<number>;
    
    constructor() {
        this.index = 0;
        this.testcaseFormGroup = new FormGroup({});
        this.remove = new EventEmitter<number>();
    }

    onDeleteBtnClicked() {
        this.remove.emit(this.index);
    }
}