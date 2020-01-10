import { FormGroup } from '@angular/forms';

export class Validator {

  private static isNumberAndNotEmpty(value: any): boolean {
    if (value !== '' && !isNaN(value)) {
      return true;
    }
    return false;
  }

  public static validateAnnouncement(announcementForm: FormGroup, gallery: string[]): boolean {
    if (gallery.length === 0) {
      return false;
    }
    if (!announcementForm.get('description').value) {
      return false;
    }
    return true;
  }

  public static validateEstate(announcementForm: FormGroup): boolean {
    if (!Validator.isNumberAndNotEmpty(announcementForm.get('area').value)) {
      this.resetValue('area', announcementForm);
      return false;
    }
    if (!Validator.isNumberAndNotEmpty(announcementForm.get('price').value)) {
      this.resetValue('price', announcementForm);
      return false;
    }
    if (!announcementForm.get('realEstateType').value) {
      return false;
    }
    if (!announcementForm.get('district').value) {
      return false;
    }
    if (!announcementForm.get('city').value) {
      return false;
    }
    if (!announcementForm.get('thumbnailPath').value) {
      return false;
    }
    return true;
  }

  public static validateHouse(announcementForm: FormGroup): boolean {
    if (!Validator.isNumberAndNotEmpty(announcementForm.get('numberOfFloors').value)) {
      this.resetValue('numberOfFloors', announcementForm);
      return false;
    }
    if (!Validator.isNumberAndNotEmpty(announcementForm.get('numberOfRooms').value)) {
      this.resetValue('numberOfRooms', announcementForm);
      return false;
    }
    if (!Validator.isNumberAndNotEmpty(announcementForm.get('gardenArea').value)) {
      this.resetValue('gardenArea', announcementForm);
      return false;
    }
    return true;
  }

  public static validatePlot(announcementForm: FormGroup): boolean {
    if (!announcementForm.get('isWaterAvailable').value) {
      return false;
    }
    if (!announcementForm.get('isGasAvailable').value) {
      return false;
    }
    if (!announcementForm.get('isEnergyAvailable').value) {
      return false;
    }
    if (!announcementForm.get('plotType').value) {
      return false;
    }
    return true;
  }

  public static validateFlat(announcementForm: FormGroup): boolean {
    if (!announcementForm.get('pcvWindows').value) {
      return false;
    }
    if (!announcementForm.get('urbanHeating').value) {
      return false;
    }
    if (!Validator.isNumberAndNotEmpty(announcementForm.get('floorNumber').value)) {
      this.resetValue('floorNumber', announcementForm);
      return false;
    }
    if (!Validator.isNumberAndNotEmpty(announcementForm.get('numberOfRoomsFlat').value)) {
      this.resetValue('numberOfRoomsFlat', announcementForm);
      return false;
    }
    return true;
  }

  public static validateBusinessEstablishment(announcementForm: FormGroup): boolean {
    if (!announcementForm.get('businessEstablishmentType').value) {
      return false;
    }
    return true;
  }

  private static resetValue(controller: string, announcementForm: FormGroup) {
    announcementForm.get(controller).setValue('');
  }
}
