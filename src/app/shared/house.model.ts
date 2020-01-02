import { Address } from './address.model';
import { RealEstate } from './real-estate.model';


export class House extends RealEstate {
  constructor(area: number,
              price: number,
              pricePerSquareMeter: number,
              address: Address,
              realEstateType: string,
              id: number,
              thumbnailPath: string,
              public numberOfFloors: number,
              public gardenArea: number,
              public numberOfRooms: number
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


