import { Component, OnDestroy, OnInit } from "@angular/core";
import { DatatableOption } from "src/app/shared/components/datatable/datatable-option.schema";
import { ProblemManagerService } from "../../services/problem-manager.service";
import { Subscription } from "rxjs";
import { DatePipe } from '@angular/common';
import { TagManagerService } from "src/app/feature/tag/tag-manager.service";
import { TagDto } from "src/app/data/schema/tag.schema";
import { SelectOption } from "src/app/shared/schema/select-option.schema";
import { FormControl, FormGroup } from "@angular/forms";
import { ProblemPagingRequestDto } from "src/app/data/schema/problem.schema";
import { ProblemApiService } from "src/app/data/services/problem-api.service";

@Component({
    selector: 'app-problem-list-table',
    templateUrl: './problem-list-table.component.html',
    styleUrls: ['./problem-list-table.component.css']
})
export class ProblemListTableComponent implements OnInit, OnDestroy { 
    public filterForm: FormGroup;
    public filterPagingData: ProblemPagingRequestDto;
    public totalProblemPages: number

    public tagSubscription: Subscription | null;

    public tags: TagDto[];
    public dataTableOptions: DatatableOption = {
        title: 'Danh sách bài tập',
        columns: [
            {
                name: 'Tên bài tập',
                field: 'name'
            },
            {
                name: 'Tác giả',
                field: 'author.name',
                generate: (item) => item.author.username
            },
            {
                name: 'Mức độ',
                field: 'level'
            },
            {
                name: 'Thể loại',
                field: 'tags.name',
                generate: (item) => item.tags.map((x: any) => `<span class="badge text-bg-primary">${x.name}</span>`).join()
            },
            {
                name: 'Điểm',
                field: 'score'
            },
            {
                name: 'Số lần nộp',
                field: 'totalSubmit'
            },
            {
                name: 'Đã đạt',
                field: 'successSubmit'
            },
            {
                name: 'Ngày tạo',
                field: 'createdAt',
                generate: (item) => this.datePipe.transform(item.createdAt, 'hh:MM:ss dd/mm/yyyy')
            },
            {
                name: 'Ngày cập nhật',
                field: 'updatedAt',
                generate: (item) => item.updatedAt == null ? 'None' : this.datePipe.transform(item.updatedAt, 'hh:MM:ss dd/mm/yyyy')
            }
        ],
        actionOptions: [
            {
                title: 'Xem',
                onClickListener: (item) => console.log(item)
            },
            {
                title: 'Sửa',
                onClickListener: (item) => console.log(item)
            },
            {
                title: 'Xóa',
                onClickListener: (item) => console.log(item)
            }
        ],
        data: [],
        order: true
    }

    public sortOptions: SelectOption[] = [
        {
            title: 'Tên bài viết',
            value: 'name'
        },
        {
            title: 'Tên tác giả',
            value: 'author'
        },
        {
            title: 'Ngày tạo',
            value: 'date'
        }
    ];

    public levelOptions: SelectOption[] = [
        {
            title: 'Dễ',
            value: '0'
        },
        {
            title: 'Trung bình',
            value: '1'
        },
        {
            title: 'Khó',
            value: '2'
        }
    ]

    constructor(
        private problemManagerService: ProblemManagerService,
        private tagManagerService: TagManagerService,
        private problemApiService: ProblemApiService,
        private datePipe: DatePipe
    ) { 
        this.totalProblemPages = 0;
        this.tagSubscription = null;
        this.tags = [];
        this.filterPagingData = {
            page: 1,
            pageSize: 10,
            name: '',
            tag: '',
            level: '',
            sort: '',
            orderBy: 'asc'
        };
        this.filterForm = new FormGroup({
            name: new FormControl(''),
            tag: new FormControl(''),
            level: new FormControl(''),
            sort: new FormControl('')
        });
    }
    
    ngOnInit(): void {
        this.tagSubscription = this.tagManagerService.tags.subscribe(
            data => this.tags = data
        );

        this.loadProblems();

        this.tagManagerService.fetchAll();
    }

    ngOnDestroy(): void {
        this.tagSubscription?.unsubscribe();
    }

    filterProblem() {
        this.loadProblems();
    }

    onPageChanged(page: number) {
        this.filterPagingData.page = page;
        this.loadProblems();
    }

    loadProblems() {
        this.filterPagingData.level = this.filterForm.value.level;
        this.filterPagingData.name = this.filterForm.value.name;
        this.filterPagingData.sort = this.filterForm.value.sort;
        this.filterPagingData.tag = this.filterForm.value.tag;

        this.problemApiService.filterAndPaging(this.filterPagingData).subscribe(
            response => {
                this.totalProblemPages = response.totalPage;
                this.dataTableOptions.data = response.data;
            }
        );
    }
}