export interface DatatableOption {
    title: string | null;
    columns: DatatableColumn[],
    data: any[],
    order: boolean;
    actionOptions?: DatatableActionOption[];
}

export interface DatatableColumn {
    name: string;
    field: string;
    generate?: (item: any) => string;
}

export interface DatatableActionOption {
    title: string;
    onClickListener: (item: any) => void;
}