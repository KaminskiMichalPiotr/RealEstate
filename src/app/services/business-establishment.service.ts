import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessEstablishment } from '../shared/business-establishment.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessEstablishmentService {

  private path = environment.apiUrl + '/business-establishment';

  constructor(private http: HttpClient) {
  }

  public static empty(): BusinessEstablishment {
    return new BusinessEstablishment(null, null, null, null, null, null, null, null);
  }

  findById(id: number): Observable<BusinessEstablishment> {
    return this.http.get<BusinessEstablishment>(this.path + '/' + id);
  }

}
