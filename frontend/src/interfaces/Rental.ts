export interface Rental {
  id: number;
  startDate: string;
  endDate: string;
  rentedKilometers: number;
  rentalStatus: number;
  carId: number;
  customerId: number;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: string;
  twoAddresses: boolean;
}
