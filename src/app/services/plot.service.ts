import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plot } from '../shared/plot.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  constructor(private http: HttpClient) {
  }

  private path = environment.apiUrl + '/plot';

  public static empty(): Plot {
    return new Plot(null, null, null, null, null, null, null, null, null, null, null);
  }

  findById(id: number): Observable<Plot> {
    return this.http.get<Plot>(this.path + '/' + id);
  }
}
