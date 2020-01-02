import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, JSONHeader } from '../../environments/environment';
import { RealEstate } from '../shared/real-estate.model';
import { ParameterSearch } from '../shared/parameter-search.model';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  private path = environment.apiUrl + '/real-estate';

  constructor(private http: HttpClient) {

  }

  public static empty(): RealEstate {
    return new RealEstate(null, null, null, AddressService.empty(), null, null, null);
  }

  getRealEstateType(): Observable<string[]> {
    return this.http.get<string[]>(this.path + '/type', {headers: JSONHeader});
  }

  getSearchResult(): Observable<RealEstate[]> {
    return this.http.get<RealEstate[]>(this.path, {headers: JSONHeader});
  }

  search(params: ParameterSearch): Observable<RealEstate[]> {
    return this.http.put<RealEstate[]>(this.path + '/search', JSON.stringify(params), {headers: JSONHeader});
  }
}
