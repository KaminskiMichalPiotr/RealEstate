import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pagination } from '../shared/pagination.model';
import { RealEstate } from '../shared/real-estate.model';
import { environment } from '../../environments/environment';
import { RealEstateService } from './real-estate.service';
import { ParameterSearch } from '../shared/parameter-search.model';
import { AnnouncementService } from './announcement.service';


@Injectable({
  providedIn: 'root'
})
export class EstateListService {

  selectedPage = null;

  // for pagination
  private estatePaginationData: BehaviorSubject<Pagination>;
  public currentEstatePaginationData: Observable<Pagination>;

  // for test
  estateList: RealEstate[] = [];

  constructor(private realEstateService: RealEstateService, private announcementService: AnnouncementService) {
    this.estatePaginationData = new BehaviorSubject<Pagination>(new Pagination());
    this.currentEstatePaginationData = this.estatePaginationData.asObservable();
    realEstateService.getSearchResult().subscribe(value => {
      this.estateList = value;
      this.estateList = this.estateList.sort((a, b) => (a.id > b.id ? -1 : 1));
      this.estatePaginationData.next((this.switchPage(1)));
    });
  }

  switchToPage(index: number) {
    this.estatePaginationData.next(this.switchPage(index));
  }


  private switchPage(index: number): Pagination {
    const totalPages = Math.ceil(this.estateList.length / environment.pagination);
    const maxPages = environment.maxPages;
    const pageSize = environment.pagination;
    const totalItems = this.estateList.length;

    if (index < 1) {
      index = 1;
    } else if (index > totalPages) {
      index = totalPages;
    }

    let startPage: number;
    let endPage: number;
    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (index <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (index + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = index - maxPagesBeforeCurrentPage;
        endPage = index + maxPagesAfterCurrentPage;
      }
    }

    const startIndex = (index - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    const pagination = new Pagination();
    pagination.pages = pages;
    pagination.currentPage = index;
    pagination.prevPage = startPage;
    pagination.nextPage = endPage;
    pagination.data = this.estateList.slice(startIndex, endIndex + 1);
    this.selectedPage = index;

    return pagination;

  }


  remove(id: number) {
    this.announcementService.deleteAnnouncementByEstateId(id).subscribe(value => {
      this.estateList = this.estateList.filter(estate => estate.id !== id);
      this.switchToPage(this.estatePaginationData.getValue().currentPage);
    });
  }

  addEstate(estate: RealEstate) {
    const result = this.estateList.find(x => x.id === estate.id);
    if (result) {
      const indexOf = this.estateList.indexOf(result);
      this.estateList[indexOf] = estate;
    } else {
      this.estateList.unshift(estate);
    }
    this.switchToPage(this.estatePaginationData.getValue().currentPage);
  }


  search(params: ParameterSearch) {
    this.realEstateService.search(params).subscribe(value => {
      this.estateList = value;
      this.estatePaginationData.next((this.switchPage(1)));
    });
  }

  sortAreaInc() {
    this.estateList = this.estateList.sort((a, b) => (a.area < b.area ? -1 : 1));
    this.reload();
  }

  sortAreaDec() {
    this.estateList = this.estateList.sort((a, b) => (a.area > b.area ? -1 : 1));
    this.reload();
  }

  sortPriceDec() {
    this.estateList = this.estateList.sort((a, b) => (a.price > b.price ? -1 : 1));
    this.reload();
  }

  sortPriceInc() {
    this.estateList = this.estateList.sort((a, b) => (a.price < b.price ? -1 : 1));
    this.reload();
  }

  sortDefault() {
    this.estateList = this.estateList.sort((a, b) => (a.id > b.id ? -1 : 1));
    this.reload();
  }

  private reload() {
    this.estatePaginationData.next((this.switchPage(this.selectedPage)));
  }

}
