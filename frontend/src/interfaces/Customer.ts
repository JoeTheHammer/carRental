// interfaces/Customer.ts

export interface Customer {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  licenseId: string;
  registerDate: String;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: string;
}
