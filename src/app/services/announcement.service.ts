import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from '../shared/announcement.model';
import { HttpClient } from '@angular/common/http';
import { environment, JSONHeader } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {


  constructor(private http: HttpClient) {
  }

  private path = environment.apiUrl + '/announcement/';

  public static empty() {
    return new Announcement(null, null, null, null, []);
  }

  public getAnnouncementByEstateId(id: number): Observable<Announcement> {
    return this.http.get<Announcement>(this.path + 'estate/' + id);
  }

  deleteAnnouncementByEstateId(id: number) {
    return this.http.delete(this.path + 'estate/' + id);
  }

  save(model: Announcement) {
    return this.http.post<Announcement>(this.path, model, {headers: JSONHeader});
  }

}
