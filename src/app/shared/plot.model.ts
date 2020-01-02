import { Address } from './address.model';
import { RealEstate } from './real-estate.model';


export class Plot extends RealEstate {
  constructor(area: number,
              price: number,
              pricePerSquareMeter: number,
              address: Address,
              realEstateType: string,
              id: number,
              thumbnailPath: string,
              public isWaterAvailable: boolean,
              public isGasAvailable: boolean,
              public isEnergyAvailable: boolean,
              public plotType: string
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
