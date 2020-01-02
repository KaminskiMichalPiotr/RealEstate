import { Component, OnInit } from '@angular/core';
import { Plot } from '../shared/plot.model';
import { RealEstate } from '../shared/real-estate.model';
import { BusinessEstablishment } from '../shared/business-establishment.model';
import { RealEstateService } from '../services/real-estate.service';
import { AddressService } from '../services/address.service';
import { Address } from '../shared/address.model';
import { House } from '../shared/house.model';
import { Flat } from '../shared/flat.model';
import { PlotService } from '../services/plot.service';
import { HouseService } from '../services/house.service';
import { FlatService } from '../services/flat.service';
import { BusinessEstablishmentService } from '../services/business-establishment.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnnouncementViewService } from '../services/announcement-view.service';
import { Validator } from './validator';
import { Announcement } from '../shared/announcement.model';

@Component({
  selector: 'app-estate-add-edit',
  templateUrl: './estate-add-edit.component.html',
  styleUrls: ['./estate-add-edit.component.css']
})
export class EstateAddEditComponent implements OnInit {


  constructor(private estateService: RealEstateService,
              private addressService: AddressService,
              private plotService: PlotService,
              private houseService: HouseService,
              private flatService: FlatService,
              private businessEstablishmentService: BusinessEstablishmentService,
              private router: Router,
              private formBuilder: FormBuilder,
              private estateViewService: AnnouncementViewService) {
  }

  announcementForm: FormGroup;
  editMode = false;
  invalid;

  plotModel: Plot;
  houseModel: House;
  businessEstablishmentModel: BusinessEstablishment;
  flatModel: Flat;

  picturePaths: string[] = [];

  estateTypes: string[] = [];
  addresses: Address[] = [];
  cities: string[] = [];
  districts: string[] = [];
  estate: RealEstate = RealEstateService.empty();


  ngOnInit() {
    this.initForm();
    if (this.router.url.includes('edit-estate')) {
      this.estateViewService.currentEstate.subscribe(value => {
        this.estate = value;
        this.createModel(this.estate);
        this.editMode = true;
        this.disableController('realEstateType');
      });
    }
    this.estateService.getRealEstateType().subscribe(value => {
      this.estateTypes = value;
      this.estateTypes.unshift('');
    });
    this.addressService.getAddresses().subscribe(value2 => {
      this.addresses = value2;
      this.populateDistricts();
      this.setValues();
      this.populateCities(this.announcementForm.get('district').value);
    });

  }

  add() {
    if (this.announcementForm.get('picturePath').value) {
      this.picturePaths.push(this.announcementForm.get('picturePath').value);
    }
    this.announcementForm.get('picturePath').patchValue('');
  }

  remove(index: number) {
    this.picturePaths.splice(index, 1);
  }

  proceedChanges() {
    this.invalid = !this.validateForm(this.announcementForm.get('realEstateType').value);
    console.log(this.announcementForm);
    console.log(this.extractData(this.announcementForm.get('realEstateType').value));
    if (this.announcementForm.invalid) {
      return;
    }
    if (this.editMode) {
      const model = this.extractData(this.announcementForm.get('realEstateType').value);
    } else {

    }
  }

  populateDistricts() {
    this.districts = this.addresses.map(value => value.district)
      .filter((item, i, ar) => ar.indexOf(item) === i).sort((a, b) => a.localeCompare(b));
    this.districts.unshift('');
  }

  populateCities(district: string) {
    this.cities = this.addresses.filter(value => value.district === district)
      .map(value => value.city).sort((a, b) => a.localeCompare(b));
    this.cities.unshift('');
  }

  private createModel(estate: RealEstate) {
    this.houseModel = null;
    this.plotModel = null;
    this.businessEstablishmentModel = null;
    this.flatModel = null;
    if (estate.realEstateType === 'HOUSE') {
      this.houseService.findById(estate.id).subscribe(value => this.estate = this.houseModel = value);
    } else if (estate.realEstateType === 'PLOT') {
      this.plotService.findById(estate.id).subscribe(value => this.estate = this.plotModel = value);
    } else if (estate.realEstateType === 'FLAT') {
      this.flatService.findById(estate.id).subscribe(value => this.estate = this.flatModel = value);
    } else {
      this.businessEstablishmentService.findById(estate.id).subscribe(value => this.estate = this.businessEstablishmentModel = value);
    }
  }


  private initForm() {
    this.announcementForm = this.formBuilder.group({
      area: [''],
      price: [''],
      realEstateType: [''],
      district: [''],
      city: [''],
      isWaterAvailable: [''],
      isGasAvailable: [''],
      isEnergyAvailable: [''],
      plotType: [''],
      numberOfFloors: [''],
      numberOfRooms: [''],
      gardenArea: [''],
      pcvWindows: [''],
      urbanHeating: [''],
      floorNumber: [''],
      numberOfRoomsFlat: [''],
      businessEstablishmentType: [''],
      description: [''],
      picturePath: [''],
      thumbnailPath: ['']
    });
  }

  private validateForm(type): boolean {
    if (Validator.validateEstate(this.announcementForm)) {
      if (type === 'HOUSE') {
        return Validator.validateHouse(this.announcementForm);
      } else if (type === 'PLOT') {
        return Validator.validatePlot(this.announcementForm);
      } else if (type === 'FLAT') {
        return Validator.validateFlat(this.announcementForm);
      } else if (type === 'BUSINESS_ESTABLISHMENT') {
        return Validator.validateBusinessEstablishment(this.announcementForm);
      }
    }
    return false;
  }


  private disableController(controller: string) {
    this.announcementForm.get(controller).disable();
  }


  switchEstate(value: string) {
    this.houseModel = null;
    this.plotModel = null;
    this.businessEstablishmentModel = null;
    this.flatModel = null;
    if (value === 'HOUSE') {
      this.houseModel = HouseService.empty();
    } else if (value === 'PLOT') {
      this.plotModel = PlotService.empty();
    } else if (value === 'FLAT') {
      this.flatModel = FlatService.empty();
    } else if (value === 'BUSINESS_ESTABLISHMENT') {
      this.businessEstablishmentModel = BusinessEstablishmentService.empty();
    }
  }


  private setValues() {
    this.announcementForm.patchValue({
      area: this.estate.area,
      price: this.estate.price,
      realEstateType: this.estate.realEstateType,
      district: this.estate.address.district,
      city: this.estate.address.city
    });
    if (this.businessEstablishmentModel) {
      this.announcementForm.patchValue({
        businessEstablishmentType: this.businessEstablishmentModel.businessEstablishmentType
      });
    } else if (this.flatModel) {
      this.announcementForm.patchValue({
        numberOfRoomsFlat: this.flatModel.numberOfRooms,
        urbanHeating: this.flatModel.urbanHeating,
        floorNumber: this.flatModel.floorNumber,
        pcvWindows: this.flatModel.pcvWindows
      });
    } else if (this.houseModel) {
      this.announcementForm.patchValue({
        gardenArea: this.houseModel.gardenArea,
        numberOfRooms: this.houseModel.numberOfRooms,
        numberOfFloors: this.houseModel.numberOfFloors
      });
    } else if (this.plotModel) {
      this.announcementForm.patchValue({
        isEnergyAvailable: this.plotModel.isEnergyAvailable,
        isGasAvailable: this.plotModel.isGasAvailable,
        isWaterAvailable: this.plotModel.isWaterAvailable,
        plotType: this.plotModel.plotType
      });
    }
  }

  private extractData(type: string): Announcement {
    const address = new Address(
      this.announcementForm.get('city').value, null, null, null
    );
    let resultEstate = new RealEstate(
      this.announcementForm.get('area').value,
      this.announcementForm.get('price').value,
      null,
      address,
      this.announcementForm.get('realEstateType').value,
      this.estate.id,
      this.announcementForm.get('thumbnailPath').value,
    );
    if (type === 'HOUSE') {
      // @ts-ignore
      const house: House = RealEstate.adaptFrom(resultEstate, HouseService.empty());
      house.numberOfRooms = this.announcementForm.get('numberOfRooms').value;
      house.gardenArea = this.announcementForm.get('gardenArea').value;
      house.numberOfFloors = this.announcementForm.get('numberOfFloors').value;
      resultEstate = house;
    } else if (type === 'PLOT') {
      // @ts-ignore
      const plot: Plot = RealEstate.adaptFrom(resultEstate, HouseService.empty());
      plot.plotType = this.announcementForm.get('plotType').value;
      plot.isWaterAvailable = this.announcementForm.get('isWaterAvailable').value;
      plot.isGasAvailable = this.announcementForm.get('isGasAvailable').value;
      plot.isEnergyAvailable = this.announcementForm.get('isEnergyAvailable').value;
      resultEstate = plot;
    } else if (type === 'FLAT') {
      // @ts-ignore
      const flat: Flat = RealEstate.adaptFrom(resultEstate, HouseService.empty());
      flat.numberOfRooms = this.announcementForm.get('numberOfRoomsFlat').value;
      flat.pcvWindows = this.announcementForm.get('pcvWindows').value;
      flat.floorNumber = this.announcementForm.get('floorNumber').value;
      flat.urbanHeating = this.announcementForm.get('urbanHeating').value;
      resultEstate = flat;
    } else if (type === 'BUSINESS_ESTABLISHMENT') {
      // @ts-ignore
      const businessEstablishment: BusinessEstablishment = RealEstate.adaptFrom(resultEstate, HouseService.empty());
      businessEstablishment.businessEstablishmentType = this.announcementForm.get('businessEstablishmentType').value;
      resultEstate = businessEstablishment;
    }
    // TODO  id?
    return new Announcement(null, resultEstate, null,
      this.announcementForm.get('description').value, this.picturePaths);
  }
}
