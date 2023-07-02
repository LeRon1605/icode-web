import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AlertComponent } from "./components/alert/alert.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DataTableComponent } from "./components/datatable/datatable.component";
import { PaginationComponent } from "./components/pagination/pagination.component";

@NgModule({
    declarations: [
        HeaderComponent,
        AlertComponent,
        SidebarComponent,
        DataTableComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule
    ],
    exports: [
        HeaderComponent,
        AlertComponent,
        SidebarComponent,
        DataTableComponent,
        PaginationComponent
    ]
})
export class SharedModule {

}