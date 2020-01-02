import { RealEstate } from './real-estate.model';


export class Announcement {
  constructor(public announcementDate: string,
              public realEstate: RealEstate,
              public id: number,
              public description: string,
              public picturesPaths: string[]) {
  }

}

