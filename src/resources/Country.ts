export default interface Country {
  name: string;
  capital: string;
  continent: string;
  flag: string;
  iso2: string;
  iso3: string;
  dail_code: string;
  latitude: number;
  longitude: number;
  currency: {
    unicode: string;
    code: string;
    name: string;
    symbol: string;
  };
}
