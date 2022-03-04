import Country from "./resources/Country";
import Currency from "./resources/Currency";
import LocationInterface from "./LocationInterface";
interface CountryWithDistance extends Country {
    distance: number;
}
declare class Core {
    private countries;
    private currencies;
    static instance: Core;
    constructor();
    getCountries(): Array<Country>;
    getCurrencies(): Array<Currency>;
    getCountriesBy(field: "name" | "capital" | "continent" | "flag" | "iso2" | "iso3" | "dail_code", value: string): Array<Country>;
    private sphereDistance;
    distanceBetweenLocations(firstLocation: LocationInterface, secondLocation: LocationInterface): number;
    countriesWithinRadius(country: Country, radius: number): Array<CountryWithDistance>;
    private topClosestOrFarthestCountries;
    topXClosestCountries(country: Country, x: number): Array<CountryWithDistance>;
    topXFarthestCountries(country: Country, x: number): Array<CountryWithDistance>;
    distanceOfCountryToOtherCountries(country: Country, order?: "asc" | "desc"): Array<CountryWithDistance>;
    getTimezones(): void;
}
declare const coreInstance: Core;
export default coreInstance;
//# sourceMappingURL=Core.d.ts.map