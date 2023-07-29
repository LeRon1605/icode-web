import { NgModule } from "@angular/core";
import { ProblemListTableComponent } from "./components/problem-list-table/problem-list-table.component";
import { ProblemManagerComponent } from "./pages/problem-manager/problem-manager.component";
import { CoreModule } from "src/app/core/core.module";
import { ProblemRoutingModule } from "./problem.routing";
import { SharedModule } from "src/app/shared/shared.module";
import { ProblemManagerService } from "./services/problem-manager.service";
import { CommonModule, DatePipe } from "@angular/common";
import { TagModule } from "../tag/tag.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateProblemComponent } from "./pages/create-problem/create-problem.component";
import { TestcaseInputComponent } from "./components/testcase-input/testcase-input.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@NgModule({
    declarations: [
        ProblemListTableComponent,
        ProblemManagerComponent,
        CreateProblemComponent,
        TestcaseInputComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        ReactiveFormsModule,
        ProblemRoutingModule,
        SharedModule,
        TagModule,
        CKEditorModule
    ],
    providers: [
        ProblemManagerService,
        DatePipe
    ]
})
export class ProblemModule { }