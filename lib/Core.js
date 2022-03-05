"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
var countries_1 = __importDefault(require("./resources/countries"));
var currencies_1 = __importDefault(require("./resources/currencies"));
var Core = /** @class */ (function () {
    function Core() {
        this.countries = [];
        this.currencies = [];
        if (Core.instance == null) {
            this.countries = countries_1.default;
            this.currencies = currencies_1.default;
            Core.instance = this;
        }
        return Core.instance;
    } //end constructor
    Core.prototype.getCurrencies = function () {
        return this.currencies;
    }; //end method getCurrencies
    Core.prototype.getCurrencyBy = function (field, value) {
        return this.getCurrencies().find(function (el) { return el[field] == value; });
    }; //end method getCountriesBy
    Core.prototype.getCountries = function () {
        return this.countries;
    }; //end method getCountries
    Core.prototype.getCountriesBy = function (field, value) {
        return this.countries.filter(function (el) { return el[field] == value; });
    }; //end method getCountriesBy
    Core.prototype.sphereDistance = function (firstLocation, secondLocation, radius) {
        var lat1 = (firstLocation.lat * Math.PI) / 180;
        var lat2 = (secondLocation.lat * Math.PI) / 180;
        var long1 = (firstLocation.long * Math.PI) / 180;
        var long2 = (secondLocation.long * Math.PI) / 180;
        var distance = 2 *
            radius *
            Math.asin(Math.sqrt(Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
                Math.cos(lat1) *
                    Math.cos(lat2) *
                    Math.pow(Math.sin((long2 - long1) / 2), 2)));
        return distance;
    }; //end method sphereDistance
    Core.prototype.distanceBetweenLocations = function (firstLocation, secondLocation) {
        return this.sphereDistance(firstLocation, secondLocation, 6371); // radius is in kilometer
    }; //end method distanceBetweenLocations
    Core.prototype.countriesWithinRadius = function (country, radius) {
        return this.distanceOfCountryToOtherCountries(country).filter(function (el) { return el.distance <= radius; });
    }; //end method countriesWithinRadius
    Core.prototype.topClosestOrFarthestCountries = function (country, x, order) {
        return this.distanceOfCountryToOtherCountries(country, order).splice(0, Math.ceil(x));
    }; //end method topClosestOrFarthestCountries
    Core.prototype.topXClosestCountries = function (country, x) {
        return this.topClosestOrFarthestCountries(country, x, "asc");
    }; //end method topXClosestCountries
    Core.prototype.topXFarthestCountries = function (country, x) {
        return this.topClosestOrFarthestCountries(country, x, "desc");
    }; //end method topXClosestCountries
    Core.prototype.distanceOfCountryToOtherCountries = function (country, order) {
        var _this = this;
        if (order === void 0) { order = "asc"; }
        var countriesWithDistance = this.getCountries()
            .filter(function (el) { return el.iso3 != country.iso3; })
            .map(function (el) {
            var temp = el;
            temp.distance = _this.distanceBetweenLocations({
                lat: country.latitude,
                long: country.longitude,
            }, {
                lat: temp.latitude,
                long: temp.longitude,
            });
            return temp;
        });
        countriesWithDistance.sort(function (a, b) {
            return (a.distance - b.distance) * (order == "desc" ? -1 : 1);
        });
        return countriesWithDistance;
    }; //end method distanceOfCountryToOtherCountries
    return Core;
}()); //end class Core
exports.Core = Core;
var coreInstance = new Core();
Object.freeze(coreInstance);
exports.default = coreInstance;
//# sourceMappingURL=Core.js.map