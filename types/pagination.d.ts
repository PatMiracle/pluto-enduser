interface Pagination {
  pages: number[];
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

type PaginatedResponse<T> = {
  start: number;
  count: number;
  total: string;
  done: boolean;
  data: T[];
  pagination: Pagination;
};
