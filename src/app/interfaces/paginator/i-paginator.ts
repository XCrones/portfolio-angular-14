export interface IPaginator {
  paginator: Function;
  readonly sumItems: number;
  currPage: number;
  initPaginator(sumItem: number): void;
  getCurrPage(): number;
  setCurrPage(page: number): void;
  getPages(): Array<string>;
}
