export interface DataTableRequest {
  pageNumber?: number;
  recordLength?: number;
  sort?: Sorting[];
  advanceSearch?: AdvanceSearch[];
}

export interface AdvanceSearch {
  key?: string;
  column?: string;
  condition?: string;
  value?: string;
  multiValue?: string[];
}

export interface Sorting {
  sortColumn?: string;
  sortAscending?: string;
}
