import { Component, OnInit } from '@angular/core';
import { EstateListService } from '../services/estate-list.service';
import { RealEstate } from '../shared/real-estate.model';
import { Pagination } from '../shared/pagination.model';

@Component({
  selector: 'app-estate-list',
  templateUrl: './estate-list.component.html',
  styleUrls: ['./estate-list.component.css']
})
export class EstateListComponent implements OnInit {


  estateList: RealEstate[] = [];

  paginationData: Pagination;

  constructor(private listService: EstateListService) { }

  ngOnInit() {
    this.listService.currentEstatePaginationData.subscribe(value => this.paginationData = value);
  }

  switchPage(index: number) {
    this.listService.switchToPage(index);
  }

  switchPageDown() {
    this.listService.switchToPage(this.paginationData.currentPage - 1);
  }

  switchPageUp() {
    this.listService.switchToPage(this.paginationData.currentPage + 1);
  }

}
