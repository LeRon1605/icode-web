import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Subscription } from "rxjs";
import { ALERT_TYPE } from "src/app/core/constants/alert-type.constant";
import { ProblemCreateDto } from "src/app/data/schema/problem.schema";
import { TagDto } from "src/app/data/schema/tag.schema";
import { ProblemApiService } from "src/app/data/services/problem-api.service";
import { TagManagerService } from "src/app/feature/tag/tag-manager.service";
import { AlertType } from "src/app/shared/components/alert/alert.type";

@Component({
    templateUrl: './create-problem.component.html',
    styleUrls: ['./create-problem.component.css']
})
export class CreateProblemComponent implements OnInit, OnDestroy {
    public alertData: { 
        type: AlertType;
        message: string;
        isNotification: boolean;
    };
    public editor = ClassicEditor;
    public tags: TagDto[];
    public tagSubscription: Subscription | null;

    public createProblemForm: FormGroup;

    constructor(
        private tagManagerService: TagManagerService,
        private problemApiService: ProblemApiService
    ) { 
        this.alertData = {
            type: '',
            message: '',
            isNotification: false
        };
        this.tags = [];
        this.tagSubscription = null;
        this.createProblemForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(10)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10)]),
            level: new FormControl('0', [Validators.required]),
            score: new FormControl('', [Validators.required, Validators.min(0)]),
            tag: new FormControl('', [Validators.required]),
            testcases: new FormArray([
                this.initTestcaseForm()
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

    onDeleteTestcase(index: number) {
        if (this.getTestcasesForm().length > 1) {
            this.getTestcasesForm().removeAt(index);
        }
    }

    onAddTestcase() {
        this.getTestcasesForm().push(this.initTestcaseForm());
    }

    onSubmit() {
        const { name, description, level, score, tag, testcases } = this.createProblemForm.value;
        const data: ProblemCreateDto = {
            name,
            description,
            level,
            score,
            tags: [tag],
            testcases
        };
        this.problemApiService.insert(data).subscribe(
            res => {
                this.createProblemForm.reset();
                this.alertData = {
                    type: ALERT_TYPE['SUCCESS'],
                    message: 'Tạo bài tập mới thành công.',
                    isNotification: true
                };
            },
            error => {
                this.alertData = {
                    type: ALERT_TYPE['ERROR'],
                    message: 'Đã xảy ra lỗi trong quá trình tạo bài tập mới.',
                    isNotification: true
                };
            }
        );
    }

    getTestcasesForm() : FormArray {
        return this.createProblemForm.controls['testcases'] as FormArray;
    }

    getTestcasesFormGroupAt(index: number) : FormGroup {
        return (this.getTestcasesForm().at(index) as FormGroup);
    }

    initTestcaseForm() : FormGroup {
        return new FormGroup({
            input: new FormControl('', [Validators.required]),
            output: new FormControl('', [Validators.required]),
            timeLimit: new FormControl('', [Validators.required, Validators.min(0)]),
            memoryLimit: new FormControl('', [Validators.required, Validators.min(0)])
        })
    }
}