import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
    @Input()
    public totalPage: number;

    @Input()
    public currentPage: number;

    @Output()
    public currentPageChanged: EventEmitter<number>;

    constructor() {
        this.totalPage = 1;
        this.currentPage = 1;
        this.currentPageChanged = new EventEmitter<number>();
    }

    onClickNext() {
        if (this.currentPage < this.totalPage) {
            this.currentPage += 1;
            this.currentPageChanged.emit(this.currentPage);
        }
    }

    onClickPrev() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.currentPageChanged.emit(this.currentPage);
        }
    }

    onToPage(page: number) {
        if (page != this.currentPage) {
            this.currentPage = page;
            this.currentPageChanged.emit(this.currentPage);
        }
    }
}