import Country from "./resources/Country";
import Currency from "./resources/Currency";
import LocationInterface from "./LocationInterface";
interface CountryWithDistance extends Country {
    distance: number;
}
export declare class Core {
    private countries;
    private currencies;
    static instance: Core;
    constructor();
    getCurrencies(): Array<Currency>;
    getCurrencyBy(field: "name" | "code" | "symbol", value: string): Currency | undefined;
    getCountries(): Array<Country>;
    getCountriesBy(field: "name" | "capital" | "continent" | "flag" | "iso2" | "iso3" | "dail_code", value: string): Array<Country>;
    private sphereDistance;
    distanceBetweenLocations(firstLocation: LocationInterface, secondLocation: LocationInterface): number;
    countriesWithinRadius(country: Country, radius: number): Array<CountryWithDistance>;
    private topClosestOrFarthestCountries;
    topXClosestCountries(country: Country, x: number): Array<CountryWithDistance>;
    topXFarthestCountries(country: Country, x: number): Array<CountryWithDistance>;
    distanceOfCountryToOtherCountries(country: Country, order?: "asc" | "desc"): Array<CountryWithDistance>;
}
declare const coreInstance: Core;
export default coreInstance;
//# sourceMappingURL=Core.d.ts.map