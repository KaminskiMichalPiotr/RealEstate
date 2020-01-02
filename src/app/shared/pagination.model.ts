import { RealEstate } from './real-estate.model';

export class Pagination {
  public currentPage: number = null;
  public nextPage: number = null;
  public prevPage: number = null;
  public pages: number[] = [];
  public data: RealEstate[] = [];

  constructor() {
  }
}
