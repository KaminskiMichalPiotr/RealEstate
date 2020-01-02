import { Address } from './address.model';
import { RealEstate } from './real-estate.model';


export class Flat extends RealEstate {
  constructor(area: number,
              price: number,
              pricePerSquareMeter: number,
              address: Address,
              realEstateType: string,
              id: number,
              thumbnailPath: string,
              public pcvWindows: boolean,
              public urbanHeating: boolean,
              public floorNumber: number,
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
