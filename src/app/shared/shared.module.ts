import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AlertComponent } from "./components/alert/alert.component";

@NgModule({
    declarations: [
        HeaderComponent,
        AlertComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        AlertComponent
    ]
})
export class SharedModule {

}