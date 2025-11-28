interface Pagination {
  pages: number[];
  currentPage: number;
  totalPages: string;
  hasPrev: boolean;
  hasNext: boolean;
}
