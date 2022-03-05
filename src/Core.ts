import countries from "./resources/countries";
import currencies from "./resources/currencies";
import Country from "./resources/Country";
import Currency from "./resources/Currency";
import LocationInterface from "./LocationInterface";

interface CountryWithDistance extends Country {
  distance: number;
}

export class Core {
  private countries: Array<Country> = [];
  private currencies: Array<Currency> = [];

  static instance: Core;

  constructor() {
    if (Core.instance == null) {
      this.countries = countries;
      this.currencies = currencies;
      Core.instance = this;
    }

    return Core.instance;
  } //end constructor

  public getCurrencies(): Array<Currency> {
    return this.currencies;
  } //end method getCurrencies

  public getCurrencyBy(
    field: "name" | "code" | "symbol",
    value: string
  ): Currency | undefined {
    return this.getCurrencies().find((el: Currency) => el[field] == value);
  } //end method getCountriesBy

  public getCountries(): Array<Country> {
    return this.countries;
  } //end method getCountries

  public getCountriesBy(
    field:
      | "name"
      | "capital"
      | "continent"
      | "flag"
      | "iso2"
      | "iso3"
      | "dail_code",
    value: string
  ): Array<Country> {
    return this.countries.filter((el: Country) => el[field] == value);
  } //end method getCountriesBy

  private sphereDistance(
    firstLocation: LocationInterface,
    secondLocation: LocationInterface,
    radius: number
  ): number {
    const lat1 = (firstLocation.lat * Math.PI) / 180;
    const lat2 = (secondLocation.lat * Math.PI) / 180;
    const long1 = (firstLocation.long * Math.PI) / 180;
    const long2 = (secondLocation.long * Math.PI) / 180;

    const distance =
      2 *
      radius *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
            Math.cos(lat1) *
              Math.cos(lat2) *
              Math.pow(Math.sin((long2 - long1) / 2), 2)
        )
      );
    return distance;
  } //end method sphereDistance

  public distanceBetweenLocations(
    firstLocation: LocationInterface,
    secondLocation: LocationInterface
  ): number {
    return this.sphereDistance(firstLocation, secondLocation, 6371); // radius is in kilometer
  } //end method distanceBetweenLocations

  public countriesWithinRadius(
    country: Country,
    radius: number
  ): Array<CountryWithDistance> {
    return this.distanceOfCountryToOtherCountries(country).filter(
      (el) => el.distance <= radius
    );
  } //end method countriesWithinRadius

  private topClosestOrFarthestCountries(
    country: Country,
    x: number,
    order: "asc" | "desc"
  ): Array<CountryWithDistance> {
    return this.distanceOfCountryToOtherCountries(country, order).splice(
      0,
      Math.ceil(x)
    );
  } //end method topClosestOrFarthestCountries

  public topXClosestCountries(
    country: Country,
    x: number
  ): Array<CountryWithDistance> {
    return this.topClosestOrFarthestCountries(country, x, "asc");
  } //end method topXClosestCountries

  public topXFarthestCountries(
    country: Country,
    x: number
  ): Array<CountryWithDistance> {
    return this.topClosestOrFarthestCountries(country, x, "desc");
  } //end method topXClosestCountries

  public distanceOfCountryToOtherCountries(
    country: Country,
    order: "asc" | "desc" = "asc"
  ): Array<CountryWithDistance> {
    const countriesWithDistance = this.getCountries()
      .filter((el) => el.iso3 != country.iso3)
      .map((el: Country) => {
        const temp = el as CountryWithDistance;

        temp.distance = this.distanceBetweenLocations(
          {
            lat: country.latitude,
            long: country.longitude,
          },
          {
            lat: temp.latitude,
            long: temp.longitude,
          }
        );

        return temp;
      }) as Array<CountryWithDistance>;

    countriesWithDistance.sort((a, b) => {
      return (a.distance - b.distance) * (order == "desc" ? -1 : 1);
    });

    return countriesWithDistance;
  } //end method distanceOfCountryToOtherCountries
} //end class Core

const coreInstance = new Core();

Object.freeze(coreInstance);
export default coreInstance;
