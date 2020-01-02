import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../shared/real-estate.model';
import { AnnouncementViewService } from '../services/announcement-view.service';
import { Plot } from '../shared/plot.model';
import { House } from '../shared/house.model';
import { BusinessEstablishment } from '../shared/business-establishment.model';
import { Flat } from '../shared/flat.model';
import { AnnouncementService } from '../services/announcement.service';
import { Announcement } from '../shared/announcement.model';
import { PlotService } from '../services/plot.service';
import { HouseService } from '../services/house.service';
import { FlatService } from '../services/flat.service';
import { BusinessEstablishmentService } from '../services/business-establishment.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  images = [];
  realEstate: RealEstate;
  plotModel: Plot;
  houseModel: House;
  businessEstablishmentModel: BusinessEstablishment;
  flatModel: Flat;
  announcement: Announcement = AnnouncementService.empty();

  constructor(private viewService: AnnouncementViewService,
              private announcementService: AnnouncementService,
              private plotService: PlotService,
              private houseService: HouseService,
              private flatService: FlatService,
              private businessEstablishmentService: BusinessEstablishmentService,
              private config: NgbCarouselConfig
  ) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    this.viewService.currentEstate.subscribe(value => this.realEstate = value);
    this.announcementService.getAnnouncementByEstateId(this.realEstate.id).subscribe(
      value => {
        this.announcement = value;
        this.images = this.announcement.picturesPaths;
        console.log(this.announcement);
      }
    );
    this.createModel(this.realEstate);
  }

  private createModel(estate: RealEstate) {
    this.houseModel =  null;
    this.plotModel = null;
    this.businessEstablishmentModel = null;
    this.flatModel = null;
    if (estate.realEstateType === 'HOUSE') {
      this.houseService.findById(estate.id).subscribe(value => this.realEstate = this.houseModel =  value);
    } else if (estate.realEstateType === 'PLOT') {
      this.plotService.findById(estate.id).subscribe(value => this.realEstate = this.plotModel =  value);
    } else if (estate.realEstateType === 'FLAT') {
      this.flatService.findById(estate.id).subscribe(value => this.realEstate = this.flatModel =  value);
    } else {
      this.businessEstablishmentService.findById(estate.id).subscribe(value => this.realEstate = this.businessEstablishmentModel =  value);
    }
  }

}
