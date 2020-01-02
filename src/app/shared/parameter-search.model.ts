export class ParameterSearch {

  constructor(public realEstateType: string,
              public city: string,
              public district: string,
              public minArea: number,
              public maxArea: number,
              public minPrice: number,
              public maxPrice: number,
              public minPricePerM: number,
              public maxPricePerM: number
  ) {
  }
}
