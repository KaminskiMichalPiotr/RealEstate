import { Address } from './address.model';
import { RealEstate } from './real-estate.model';


export class BusinessEstablishment extends RealEstate {
  constructor(area: number,
              price: number,
              pricePerSquareMeter: number,
              address: Address,
              realEstateType: string,
              id: number,
              thumbnailPath: string,
              public businessEstablishmentType: string
  ) {
    super(area,
      price,
      pricePerSquareMeter,
      address,
      realEstateType,
      id,
      thumbnailPath);
  }
}
