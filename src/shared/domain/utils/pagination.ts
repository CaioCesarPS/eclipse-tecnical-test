export interface Pagination<T> {
  data: T[] | T;
  page: number;
  limit: number;
}
