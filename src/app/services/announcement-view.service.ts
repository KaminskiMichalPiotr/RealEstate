import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RealEstate } from '../shared/real-estate.model';
import { RealEstateService } from './real-estate.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementViewService {

  private currentEstateSubject: BehaviorSubject<RealEstate>;
  public currentEstate: Observable<RealEstate>;

  constructor() {
    this.currentEstateSubject = new BehaviorSubject<RealEstate>(RealEstateService.empty());
    this.currentEstate = this.currentEstateSubject.asObservable();
  }

  switch(estate: RealEstate) {
    this.currentEstateSubject.next(estate);
  }

}
