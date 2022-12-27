export interface IPaginator {
  paginator: Function;
  readonly sumItems: number;
  currPage: number;
  initPaginator(sumItem: number): void;
  getCurrPage(): number;
  jumpPage(page: number): void;
  getPages(): Array<string>;
}
