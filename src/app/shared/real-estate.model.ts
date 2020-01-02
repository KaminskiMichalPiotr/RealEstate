import { Address } from './address.model';


export class RealEstate {
  constructor(public area: number,
              public price: number,
              public pricePerSquareMeter: number,
              public address: Address,
              public realEstateType: string,
              public id: number,
              public thumbnailPath: string) {
  }

  public static adaptFrom(source: RealEstate, target: RealEstate): RealEstate {
    target.address = source.address;
    target.realEstateType = source.realEstateType;
    target.price = source.price;
    target.area = source.area;
    target.thumbnailPath = source.thumbnailPath;
    target.id = source.id;
    target.pricePerSquareMeter = source.pricePerSquareMeter;
    return target;
  }
}


