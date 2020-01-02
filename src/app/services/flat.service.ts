import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flat } from '../shared/flat.model';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  private path = environment.apiUrl + '/flat';

  constructor(private http: HttpClient) {
  }

  public static empty(): Flat {
    return new Flat(null, null, null , null, null, null, null, null, null, null, null);
  }

  findById(id: number): Observable<Flat> {
    return this.http.get<Flat>(this.path + '/' + id);
  }
}
