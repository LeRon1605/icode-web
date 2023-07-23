import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Subscription } from "rxjs";
import { TagDto } from "src/app/data/schema/tag.schema";
import { TagManagerService } from "src/app/feature/tag/tag-manager.service";

@Component({
    templateUrl: './create-problem.component.html'
})
export class CreateProblemComponent implements OnInit, OnDestroy {
    public editor = ClassicEditor;
    public tags: TagDto[];
    public tagSubscription: Subscription | null;

    public createProblemForm: FormGroup;

    constructor(
        private tagManagerService: TagManagerService
    ) { 
        this.tags = [];
        this.tagSubscription = null;
        this.createProblemForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(10)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10)]),
            level: new FormControl('0', [Validators.required]),
            score: new FormControl('', [Validators.required, Validators.min(0)]),
            tag: new FormControl('', [Validators.required]),
            testcases: new FormArray([
                new FormGroup({
                    input: new FormControl('', [Validators.required]),
                    output: new FormControl('', [Validators.required]),
                    timeLimit: new FormControl('', [Validators.required, Validators.min(0)]),
                    memoryLimit: new FormControl('', [Validators.required, Validators.min(0)])
                })
            ])
        });
    }

    ngOnInit(): void {
        this.tagSubscription = this.tagManagerService.tags.subscribe(
            data => this.tags = data
        );

        this.tagManagerService.fetchAll();
    }

    ngOnDestroy(): void {
        this.tagSubscription?.unsubscribe();
    }

    getTestcasesForm() : FormArray {
        return this.createProblemForm.controls['testcases'] as FormArray;
    }

    getTestcasesFormGroupAt(index: number) : FormGroup {
        return (this.getTestcasesForm().at(index) as FormGroup);
    }
}