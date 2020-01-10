import { Injectable } from '@angular/core';
import { environment, JSONHeader } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../shared/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private path = environment.apiUrl + '/address';

  constructor(private http: HttpClient) {

  }

  public static empty(): Address {
    return new Address(null, null, null, null);
  }


  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.path, {headers: JSONHeader});
  }
}
