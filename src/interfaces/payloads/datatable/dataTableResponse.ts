export interface DataTableResponse<T> {
  totalPage?: number;
  pageNumber?: number;
  itemPerPage?: number;
  totalRecord?: number;
  resultRecord?: number;
  data?: T[];
}
