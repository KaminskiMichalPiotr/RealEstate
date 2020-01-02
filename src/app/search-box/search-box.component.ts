import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddressService } from '../services/address.service';
import { Address } from '../shared/address.model';
import { RealEstateService } from '../services/real-estate.service';
import { EstateListService } from '../services/estate-list.service';
import { ParameterSearch } from '../shared/parameter-search.model';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  loading = false;
  searchForm: FormGroup;
  public isCollapsed = true;
  addresses: Address[] = [];
  cities: string[] = [];
  districts: string[] = [];
  estateTypes: string[] = [];

  constructor(private formBuilder: FormBuilder, private addressService: AddressService,
              private estateService: RealEstateService, private estataeListService: EstateListService) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      type: [''],
      city: [''],
      district: [''],
      areaMin: [''],
      areaMax: [''],
      priceMin: [''],
      priceMax: [''],
      perMin: [''],
      perMax: ['']
    });
    this.addressService.getAddresses().subscribe(value => {
      this.addresses = value;
      this.populateDistricts();
      this.populateCities(this.districts[0]);
    });
    this.estateService.getRealEstateType().subscribe(value => {
      this.estateTypes = value;
      this.estateTypes.unshift('');
      this.searchForm.get('type').setValue('');
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  search() {
    console.log(this.f);
    const params = new ParameterSearch(
      this.extractValueText(this.searchForm.get('type')),
      this.extractValueText(this.searchForm.get('city')),
      this.extractValueText(this.searchForm.get('district')),
      this.extractValueNumber(this.searchForm.get('areaMin')),
      this.extractValueNumber(this.searchForm.get('areaMax')),
      this.extractValueNumber(this.searchForm.get('priceMin')),
      this.extractValueNumber(this.searchForm.get('priceMax')),
      this.extractValueNumber(this.searchForm.get('perMin')),
      this.extractValueNumber(this.searchForm.get('perMax')),
    );
    this.estataeListService.search(params);
  }

  extractValueText(form: AbstractControl): string {
    return form.value ? form.value : null;
  }

  extractValueNumber(form: AbstractControl): number {
    if (this.isNumberAndNotEmpty(form.value)) {
      return form.value;
    }
    return null;
  }

  private isNumberAndNotEmpty(value: any): boolean {
    if (value !== '' && !isNaN(value)) {
      return true;
    }
    return false;
  }

  populateDistricts() {
    this.districts = this.addresses.map(value => value.district)
      .filter((item, i, ar) => ar.indexOf(item) === i).sort((a, b) => a.localeCompare(b));
    this.districts.unshift('');
    this.searchForm.get('district').setValue('');
  }

  populateCities(district: string) {
    this.cities = this.addresses.filter(value => value.district === district)
      .map(value => value.city).sort((a, b) => a.localeCompare(b));
    this.cities.unshift('');
    this.searchForm.get('city').setValue('');
  }

}
