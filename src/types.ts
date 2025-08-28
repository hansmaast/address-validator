export type CountryCode = 'NO'; // Add codes

export type HouseType =
  | 'E' // (E)nebolig   - detached house
  | 'R' // (R)ekkehus   - row house
  | 'B' // (B)lokk      - apartment building
  | 'F' // (F)orretning - business
  | 'H' // (H)ytte      - holiday house
  | 'A'; // (A)nnet     - other

export type Street = {
  countryCode: CountryCode;
  city: string;
  streetName: string;
  streetIds: number[]; // A street has one or more id's
};

export type StreetCollection = {
  streets: Street[];
  totalResults: number;
};

export type StreetNumber = {
  streetNo: number;
  addressId: number;
  entrance: string; // Present if a building has several entrances, where the value is the entrance name
  houseType: HouseType; // See the following examples
  deliveryPointId: number;
  postalCode: string;
  duplicateNumberAndEntrance: boolean; // Some streets have several entrances on the same street number. When duplicateNumberAndAddress is true, the houseType should be used to separate them
  latitude: number;
  longitude: number;
  showHouseholds: boolean; // True if households exists on houseType block
};

export type StreetNumberCollection = {
  streetNumbers: StreetNumber[];
};

export type Address = {
  street: Street;
  number: StreetNumber;
};

export type RequestOptions = {
  countryCode: CountryCode;
  path: string;
  query: string;
  parameters?: Record<string, string>;
  baseUrl?: string;
  apiKey?: string;
};

export type AddressHelperOptions = Pick<
  RequestOptions,
  'path' | 'query' | 'parameters'
>;
