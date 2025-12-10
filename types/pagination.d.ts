interface Pagination {
  pages: number[];
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};
