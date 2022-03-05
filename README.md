# Country and currency library
![NPM](https://img.shields.io/npm/l/@workmate/country-and-currency) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@workmate/country-and-currency) ![npm](https://img.shields.io/npm/v/@workmate/country-and-currency) ![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@workmate/country-and-currency) ![GitHub last commit](https://img.shields.io/github/last-commit/work-mate/country-and-currency-ts)

<br />
A lightweight library for countries, their dail codes, currencies as well as location related calculations

## Installation

#### CDN
Add the js script to the head of the html file
```html
<script src="https://cdn.jsdelivr.net/npm/@workmate/country-and-currency@1.0.0/dist/bundle.js" defer></script>
```

Then you can access the country and currency instance using
```html
<script defer>
  var CountryAndCurrency = CountryAndCurrencyLib.setup()
</script>
```


#### Package Manager
```bash
# using npm

npm install @workmate/country-and-currency

# using yarn
yarn add @workmate/country-and-currency
```

Then you can access the country and currency instance using
```js
import CountryAndCurrency from "@workmate/country-and-currency";
```


## Useful types 
```ts
interface Currency {
  name: string;
  code: string;
  symbol: string;
}

interface Country {
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

interface CountryWithDistance extends Country {
  distance: number;
}

interface LocationInterface {
  long: number;
  lat: number;
}
```

## Methods
* `getCurrencies(): Array<Currency>`
* `getCurrencyBy(field: "name" | "code" | "symbol",value: string): Currency | undefined`
* `getCountries(): Array<Country>`
* ` getCountriesBy(field: "name" | "capital" | "continent" | "flag" | "iso2" | "iso3" | "dail_code", value: string): Array<Country> `
* `distanceBetweenLocations(firstLocation: LocationInterface, secondLocation: LocationInterface): number` (result in kilometers)
* `countriesWithinRadius(country: Country, radius: number): Array<CountryWithDistance>` (radius in kilometers)
* `topXClosestCountries(country: Country, x: number): Array<CountryWithDistance>`
* `topXFarthestCountries(country: Country, x: number): Array<CountryWithDistance>`
* `distanceOfCountryToOtherCountries(country: Country, order: "asc" | "desc" = "asc"): Array<CountryWithDistance>`


## Usage
```js
const currencies = CountryAndCurrency.getCurrencies()
console.log(currencies)
/*
Expected result
[
  {
    name: "Afghan Afghani",
    code: "AFA",
    symbol: "؋",
  },
  ...
]
*/

const currency = CountryAndCurrency.getCurrencyBy("code", "AFA")
console.log(currency)
/*
Expected result
{
  name: "Afghan Afghani",
  code: "AFA",
  symbol: "؋",
},
*/

const countries = CountryAndCurrency.getCountries()
console.log(countries)
/*
Expected result
[
  {
    name: "Mexico",
    capital: "Mexico City",
    continent: "NA",
    flag: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",
    iso2: "MX",
    iso3: "MEX",
    dail_code: "+52",
    latitude: 23,
    longitude: -102,
    currency: {
      unicode: "🇲🇽",
      code: "MXN",
      name: "Mexican Peso",
      symbol: "$",
    },
  },
  ...
]
*/

const countriesBy = CountryAndCurrency.getCountriesBy("iso3", "MEX")
// if the field selected (in this case iso3) is unique, the result would be an array of length 0 or 1
console.log(countriesBy)

/*
[
  {
    name: "Mexico",
    capital: "Mexico City",
    continent: "NA",
    flag: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",
    iso2: "MX",
    iso3: "MEX",
    dail_code: "+52",
    latitude: 23,
    longitude: -102,
    currency: {
      unicode: "🇲🇽",
      code: "MXN",
      name: "Mexican Peso",
      symbol: "$",
    },
  }
]
*/

const firstLocation = {
  lat: 10,
  long: 15,
};

const secondLocation = {
  lat: 20,
  long: -17,
};

const distanceBetweenLocations = CountryAndCurrency.distanceBetweenLocations(firstLocation, secondLocation)
console.log(distanceBetweenLocations);
/*
Expected result
3604.3678036992624 // in kilometers
*/

const mexico = CountryAndCurrency.getCountriesBy("iso3", "MEX")[0];
const countriesWithinRadius = CountryAndCurrency.countriesWithinRadius(
  mexico,
  2000
);
console.log(countriesWithinRadius);
/*
Expected result
[
  {
    name: 'Guatemala',
    capital: 'Guatemala City',
    continent: 'NA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg',
    iso2: 'GT',
    iso3: 'GTM',
    dail_code: '+502',
    latitude: 15.5,
    longitude: -90.25,
    currency: {
      unicode: '🇬🇹',
      code: 'GTQ',
      name: 'Guatemalan Quetzal',
      symbol: 'Q'
    },
    distance: 1487.7626308065874
  },
  ...
]
*/


const mexico = CountryAndCurrency.getCountriesBy("iso3", "MEX")[0];
const closestCountries = CountryAndCurrency.topXClosestCountries(mexico, 2);
console.log(closestCountries);
/*
Expected result
[
  {
    name: 'Guatemala',
    capital: 'Guatemala City',
    continent: 'NA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg',
    iso2: 'GT',
    iso3: 'GTM',
    dail_code: '+502',
    latitude: 15.5,
    longitude: -90.25,
    currency: {
      unicode: '🇬🇹',
      code: 'GTQ',
      name: 'Guatemalan Quetzal',
      symbol: 'Q'
    },
    distance: 1487.7626308065874
  },
  ...
]
*/


const mexico = CountryAndCurrency.getCountriesBy("iso3", "MEX")[0];
const farthestCountries = CountryAndCurrency.topXFarthestCountries(mexico, 2);
console.log(farthestCountries);

/*
Expected result
[
  {
    name: 'British Indian Ocean Territory',
    capital: 'Diego Garcia',
    continent: 'AS',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_the_British_Indian_Ocean_Territory.svg',   
    iso2: 'IO',
    iso3: 'IOT',
    dail_code: '+246',
    latitude: -6,
    longitude: 71.5,
    currency: { unicode: '🇮🇴', code: 'USD', name: 'US Dollar', symbol: '$' },
    distance: 18000.497060769732
  },
  ...
]
*/

const mexico = CountryAndCurrency.getCountriesBy("iso3", "MEX")[0];
const distanceFromOthers = CountryAndCurrency.distanceOfCountryToOtherCountries(
  mexico,
  "asc" // from closest to farthest
);
console.log(distanceFromOthers);
/*
Expected result
[
  {
    name: 'British Indian Ocean Territory',
    capital: 'Diego Garcia',
    continent: 'AS',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_the_British_Indian_Ocean_Territory.svg',   
    iso2: 'IO',
    iso3: 'IOT',
    dail_code: '+246',
    latitude: -6,
    longitude: 71.5,
    currency: { unicode: '🇮🇴', code: 'USD', name: 'US Dollar', symbol: '$' },
    distance: 18000.497060769732
  },
  ...
]
*/
```