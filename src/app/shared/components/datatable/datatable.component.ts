import { Component, Input } from "@angular/core";
import { DatatableOption } from "./datatable-option.schema";

@Component({
    selector: 'app-data-table',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.css']
})
export class DataTableComponent {
    @Input()
    public options: DatatableOption | null;

    constructor() {
        this.options = null;
    }

    
}