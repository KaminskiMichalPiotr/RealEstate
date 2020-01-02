import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../shared/house.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private path = environment.apiUrl + '/house';

  constructor(private http: HttpClient) {
  }

  public static empty(): House {
    return new House(null, null, null, null, null, null, null, null, null, null);
  }

  findById(id: number): Observable<House> {
    return this.http.get<House>(this.path + '/' + id);
  }
}
