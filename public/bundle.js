/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Rand.ts":
/*!*********************!*\
  !*** ./src/Rand.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rand)
/* harmony export */ });
class Rand {
    static generateSeed() {
        // let arr: string[] = [];
        // for (let i = 0; i < 3; i++) {
        //   // Don't use a seeded value to generate the seed
        //   arr.push(Data.words[Math.floor(Math.random() * Data.words.length)]);
        // }
        // Rand.seed = arr.join('-');
        // Rand.seedRandomNumberGenerator();
    }
    static seedRandomNumberGenerator() {
        let h = 1779033703 ^ Rand.seed.length;
        for (var i = 0; i < Rand.seed.length; i++) {
            h = Math.imul(h ^ Rand.seed.charCodeAt(i), 3432918353);
            h = (h << 13) | (h >>> 19);
        }
        Rand.m_w = (123456789 + h) & Rand.mask;
        Rand.m_z = (987654321 - h) & Rand.mask;
    }
    static next() {
        return this.between(0, 1);
    }
    static between(min, max, floor = false) {
        Rand.m_z = (36969 * (Rand.m_z & 65535) + (Rand.m_z >> 16)) & Rand.mask;
        Rand.m_w = (18000 * (Rand.m_w & 65535) + (Rand.m_w >> 16)) & Rand.mask;
        let result = ((Rand.m_z << 16) + (Rand.m_w & 65535)) >>> 0;
        result /= 4294967296;
        result = result * (max - min) + min;
        return floor ? Math.floor(result) : result;
    }
    // Returns an item from an array
    static pick(arr) {
        return arr[Rand.between(0, arr.length, true)];
    }
    // Returns an item from an array
    // The weight value is determined using the accessor function
    // randomWeightedValue<NamePart>(nameParts, item => item.asRoot)
    static weightedPick(arr, accessor, log = false) {
        if (log)
            console.log(arr);
        // Get the max weight
        const max = arr.reduce((total, item) => {
            return total + accessor(item);
        }, 0);
        // Calculate a random number on the scale of max
        let weight = Rand.between(0, max);
        // For each item in the array, decrement max by that item's weight
        let result;
        arr.some((item) => {
            weight -= accessor(item);
            result = item;
            return weight < 0;
        });
        return result;
    }
}
Rand.m_w = 123456789;
Rand.m_z = 987654321;
Rand.mask = 4294967295;


/***/ }),

/***/ "./src/Util.ts":
/*!*********************!*\
  !*** ./src/Util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
class Util {
    static download(name, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', name);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    static toggleDarkMode() {
        Util.isDarkMode = !Util.isDarkMode;
        localStorage.setItem('darkMode', JSON.stringify(Util.isDarkMode));
        Util.isDarkMode ? Util.applyDarkMode() : Util.applyLightMode();
    }
    static applyDarkMode() {
        console.log('Apply dark mode');
        const mode = [
            { id: '--dark-text', value: '#f8f8f8' },
            { id: '--dark-text-muted', value: 'rgba(248, 248, 248, 0.6)' },
            { id: '--dark-text-very-muted', value: 'rgba(248, 248, 248, 0.1)' },
            { id: '--dark-text-hidden', value: 'rgba(248, 248, 248, 0)' },
            { id: '--light-text', value: '#444444' },
            { id: '--light-text-muted', value: 'rgba(68, 68, 68, 0.6)' },
            { id: '--light-text-very-muted', value: 'rgba(68, 68, 68, 0.1)' },
            { id: '--light-text-hidden', value: 'rgba(68, 68, 68, 0)' },
            { id: '--dark-background', value: '#f8f8f8' },
            { id: '--dark-background-alt', value: 'rgba(248, 248, 248, 0.95)' },
            { id: '--light-background', value: '#444444' },
            { id: '--light-background-alt', value: 'rgba(68, 68, 68, 0.95)' }
        ];
        var root = document.querySelector(':root');
        mode.forEach((m) => {
            root.style.setProperty(m.id, m.value);
        });
    }
    static applyLightMode() {
        console.log('Apply light mode');
        const mode = [
            { id: '--dark-text', value: '#444444' },
            { id: '--dark-text-muted', value: 'rgba(68, 68, 68, 0.6)' },
            { id: '--dark-text-very-muted', value: 'rgba(68, 68, 68, 0.1)' },
            { id: '--dark-text-hidden', value: 'rgba(68, 68, 68, 0)' },
            { id: '--light-text', value: '#f8f8f8' },
            { id: '--light-text-muted', value: 'rgba(248, 248, 248, 0.6)' },
            { id: '--light-text-very-muted', value: 'rgba(248, 248, 248, 0.1)' },
            { id: '--light-text-hidden', value: 'rgba(248, 248, 248, 0)' },
            { id: '--dark-background', value: '#444444' },
            { id: '--dark-background-alt', value: 'rgba(68, 68, 68, 0.95)' },
            { id: '--light-background', value: '#f8f8f8' },
            { id: '--light-background-alt', value: 'rgba(248, 248, 248, 0.95)' }
        ];
        var root = document.querySelector(':root');
        mode.forEach((m) => {
            root.style.setProperty(m.id, m.value);
        });
    }
    static arrayRemove(arr, elementToRemove) {
        return arr.filter(function (element) {
            return element != elementToRemove;
        });
    }
    // Returns 'a' or 'an' if str's first char is a consonant or a vowel
    static aOrAn(str) {
        return Util.startsWithVowel(str) ? 'an' : 'a';
    }
    // Returns true if the string ends with a given str
    static endsWith(str, endingStr) {
        const regex = new RegExp('.*' + endingStr + '$');
        return regex.test(str);
    }
    // Returns true if the string starts with a vowel
    static startsWithVowel(str) {
        const regex = new RegExp('^[aeiou].*', 'i');
        return regex.test(str);
    }
    // Returns true if the string starts with a vowel
    static endsWithVowel(str) {
        const regex = new RegExp('.*[aeiou]$', 'i');
        return regex.test(str);
    }
    // Returns a string joining an array of at least two entries
    // with commas and the word 'and' between the last two entries
    static joinArrayWithAnd(arr) {
        const last = arr.pop();
        if (arr.length == 1) {
            return arr[0] + ' and ' + last;
        }
        let str = arr.join(', ');
        str += ', and ' + last;
        return str;
    }
    // Tweet a realm
    // static shareByTweet(realm: Realm) {
    //   let tweet: string = `Explore ${Util.capitalize(
    //     Util.readWord(realm.realmName)
    //   )}, a ${realm.size} ${realm.parentEntityAdj} ${realm.governmentRank}.`;
    //   window.open(
    //     'https://twitter.com/intent/tweet?url=' +
    //       window.location.href +
    //       '&text=' +
    //       tweet,
    //     '_blank'
    //   );
    // }
    // Capitalize first letter
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
    // Returns any number lower than 20 as a word ('one', 'two', ... 'nineteen')
    static wordFromNumber(n) {
        const words = [
            'zero',
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine',
            'ten',
            'eleven',
            'twelve',
            'thirteen',
            'fourteen',
            'fifteen',
            'sixteen',
            'seventeen',
            'eighteen',
            'nineteen'
        ];
        return n < words.length ? words[n] : n.toString();
    }
}
Util.isDarkMode = false;


/***/ }),

/***/ "./src/modules/Module.ts":
/*!*******************************!*\
  !*** ./src/modules/Module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Module)
/* harmony export */ });
class Module {
    constructor(realm) {
        this._realm = realm;
        this.run();
    }
    run() { }
}
// Module child class template
// import Module from '../Module';
// import Realm from '../../realm/Realm';
// export default class xModule extends Module {
//   constructor(realm: Realm) {
//     super(realm);
//   }
//   protected run() {
//   }
// }


/***/ }),

/***/ "./src/modules/general/LocationModule.ts":
/*!***********************************************!*\
  !*** ./src/modules/general/LocationModule.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Direction": () => (/* binding */ Direction),
/* harmony export */   "default": () => (/* binding */ LocationModule)
/* harmony export */ });
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Rand */ "./src/Rand.ts");
/* harmony import */ var _geography_BiomesModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geography/BiomesModule */ "./src/modules/geography/BiomesModule.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");



var Direction;
(function (Direction) {
    Direction["NORTH"] = "north";
    Direction["NORTH_EAST"] = "north-east";
    Direction["EAST"] = "east";
    Direction["SOUTH_EAST"] = "south-east";
    Direction["SOUTH"] = "south";
    Direction["SOUTH_WEST"] = "south-west";
    Direction["WEST"] = "west";
    Direction["NORTH_WEST"] = "north-west";
})(Direction || (Direction = {}));
class LocationModule extends _Module__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor(realm) {
        super(realm);
        this.locationWithinParentEntity = Direction.NORTH;
        this.directionToCoast = null;
    }
    run() {
        this.locationWithinParentEntity = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(Object.values(Direction));
        // Add direction tags south-west => south, west
        this.locationWithinParentEntity
            .split('-')
            .forEach((l) => this._realm.addTag(l));
        // 40% chance to be coastal
        if (_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.4) {
            this.directionToCoast = this.locationWithinParentEntity;
            this._realm.addTag(_geography_BiomesModule__WEBPACK_IMPORTED_MODULE_1__.BiomeType.COAST);
        }
    }
    static isCardinalDirection(direction) {
        return !direction.includes('-');
    }
}


/***/ }),

/***/ "./src/modules/geography/BiomesModule.ts":
/*!***********************************************!*\
  !*** ./src/modules/geography/BiomesModule.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BiomeType": () => (/* binding */ BiomeType),
/* harmony export */   "default": () => (/* binding */ BiomesModule)
/* harmony export */ });
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Rand */ "./src/Rand.ts");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Util */ "./src/Util.ts");
/* harmony import */ var _general_LocationModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../general/LocationModule */ "./src/modules/general/LocationModule.ts");
/* harmony import */ var _ClimateModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ClimateModule */ "./src/modules/geography/ClimateModule.ts");





var BiomeType;
(function (BiomeType) {
    BiomeType["GRASSLAND"] = "grassland";
    BiomeType["TUNDRA"] = "tundra";
    BiomeType["BOREAL_FOREST"] = "borealForest";
    BiomeType["TEMPERATE_FOREST"] = "temperateForest";
    BiomeType["MOUNTAINS"] = "mountains";
    BiomeType["COAST"] = "coast";
})(BiomeType || (BiomeType = {}));
class BiomesModule extends _Module__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(realm) {
        super(realm);
    }
    run() {
        this.biomes = [];
        // Add a coast biome
        let remainingSize = this._realm.size.sizeIndex + 1;
        if (this._realm.tags.includes(BiomeType.COAST)) {
            const coastBiome = {
                type: BiomeType.COAST,
                size: _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].between(1, remainingSize, true),
                direction: this._realm.location.directionToCoast
            };
        }
        // Limit available biome types
        let availableBiomeTypes = Object.values(BiomeType).filter((biomeType) => {
            if (biomeType == BiomeType.COAST)
                return false;
            switch (this._realm.climate.humidity) {
                case _ClimateModule__WEBPACK_IMPORTED_MODULE_4__.Humidity.DRY:
                    // Dry? Remove boreal-forest and temperate-forest
                    return ![
                        BiomeType.BOREAL_FOREST,
                        BiomeType.TEMPERATE_FOREST
                    ].includes(biomeType);
                    break;
                case _ClimateModule__WEBPACK_IMPORTED_MODULE_4__.Humidity.WET:
                    // Wet? Remove grassland and tundra
                    return ![BiomeType.GRASSLAND, BiomeType.TUNDRA].includes(biomeType);
                    break;
            }
            if (this._realm.climate.temperature == _ClimateModule__WEBPACK_IMPORTED_MODULE_4__.Temperature.WARM) {
                // Warm? Remove boreal-forest and tundra
                return ![BiomeType.BOREAL_FOREST, BiomeType.TUNDRA].includes(biomeType);
            }
            return true;
        });
        // Cannot be a combined direction like north-east or south-west, must be one of the four cardinal directions or 'middle'
        let availableDirections = Object.values(_general_LocationModule__WEBPACK_IMPORTED_MODULE_3__.Direction).filter((d) => d.split('-').length == 1);
        // Create some number of biomes
        while (remainingSize > 0 && availableBiomeTypes.length > 0) {
            let biomeSize = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].between(1, remainingSize, true);
            remainingSize -= biomeSize;
            let biomeType = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(availableBiomeTypes);
            availableBiomeTypes = _Util__WEBPACK_IMPORTED_MODULE_2__["default"].arrayRemove(availableBiomeTypes, biomeType);
            let biomeDirection = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(availableDirections);
            availableDirections = _Util__WEBPACK_IMPORTED_MODULE_2__["default"].arrayRemove(availableDirections, biomeDirection);
            const biome = {
                type: biomeType,
                size: biomeSize,
                direction: biomeDirection
            };
            this.biomes.push(biome);
            this._realm.addTag(biomeType);
        }
    }
}


/***/ }),

/***/ "./src/modules/geography/ClimateModule.ts":
/*!************************************************!*\
  !*** ./src/modules/geography/ClimateModule.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Temperature": () => (/* binding */ Temperature),
/* harmony export */   "Humidity": () => (/* binding */ Humidity),
/* harmony export */   "default": () => (/* binding */ ClimateModule)
/* harmony export */ });
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Rand */ "./src/Rand.ts");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Util */ "./src/Util.ts");
/* harmony import */ var _general_LocationModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../general/LocationModule */ "./src/modules/general/LocationModule.ts");
/* harmony import */ var _season_descriptions_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./season-descriptions.json */ "./src/modules/geography/season-descriptions.json");





var Temperature;
(function (Temperature) {
    Temperature["COLD"] = "cold";
    Temperature["TEMPERATE"] = "temperate";
    Temperature["WARM"] = "warm";
})(Temperature || (Temperature = {}));
var Humidity;
(function (Humidity) {
    Humidity["WET"] = "wet";
    Humidity["DRY"] = "dry";
})(Humidity || (Humidity = {}));
class ClimateModule extends _Module__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(realm) {
        super(realm);
        this.summerAdjectives = [];
        this.winterAdjectives = [];
    }
    run() {
        // Temperature: Default is TEMPERATE
        // If location is in the north, 60% chance COLD
        // If location is in the south, 60% chance WARM
        if (this._realm.location.locationWithinParentEntity.includes(_general_LocationModule__WEBPACK_IMPORTED_MODULE_3__.Direction.NORTH)) {
            this.temperature =
                _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].next() < 0.6 ? Temperature.COLD : Temperature.TEMPERATE;
        }
        else if (this._realm.location.locationWithinParentEntity.includes(_general_LocationModule__WEBPACK_IMPORTED_MODULE_3__.Direction.SOUTH)) {
            this.temperature =
                _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].next() < 0.6 ? Temperature.WARM : Temperature.TEMPERATE;
        }
        else {
            this.temperature = Temperature.TEMPERATE;
        }
        this._realm.addTag(this.temperature);
        // Humidity
        if (this._realm.tags.includes('coast')) {
            this.humidity = Humidity.WET;
        }
        else {
            this.humidity = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(Object.values(Humidity));
        }
        this._realm.addTag(this.humidity);
        // Choose words to describe summer and winter
        this.summerAdjectives = this.chooseSeasonAdjectives(_season_descriptions_json__WEBPACK_IMPORTED_MODULE_4__.summer[this.temperature].concat(_season_descriptions_json__WEBPACK_IMPORTED_MODULE_4__.summer[this.humidity]));
        this.winterAdjectives = this.chooseSeasonAdjectives(_season_descriptions_json__WEBPACK_IMPORTED_MODULE_4__.winter[this.temperature].concat(_season_descriptions_json__WEBPACK_IMPORTED_MODULE_4__.winter[this.humidity]));
    }
    chooseSeasonAdjectives(adjectives) {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            const adjective = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(adjectives);
            arr.push(adjective);
            adjectives = _Util__WEBPACK_IMPORTED_MODULE_2__["default"].arrayRemove(adjectives, adjective);
            //  If the word is longer than 6 letters, step out of the loop
            //  Otherwise, 50% chance to step out of the loop
            if (_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].next() < 0.5 || adjective.length > 6)
                break;
        }
        return arr;
    }
}


/***/ }),

/***/ "./src/modules/geography/ParentEntityModule.ts":
/*!*****************************************************!*\
  !*** ./src/modules/geography/ParentEntityModule.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ParentEntityModule)
/* harmony export */ });
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Rand */ "./src/Rand.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _parent_entity_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parent-entity.json */ "./src/modules/geography/parent-entity.json");



class ParentEntityModule extends _Module__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(realm) {
        super(realm);
    }
    run() {
        const template = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(_parent_entity_json__WEBPACK_IMPORTED_MODULE_2__.templates);
        this.adjective = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(_parent_entity_json__WEBPACK_IMPORTED_MODULE_2__.adjectives);
        this.government = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(_parent_entity_json__WEBPACK_IMPORTED_MODULE_2__.governments);
        const adjective = this.adjective;
        const government = this.government.noun;
        this.name = eval(template);
    }
}


/***/ }),

/***/ "./src/modules/geography/RiversModule.ts":
/*!***********************************************!*\
  !*** ./src/modules/geography/RiversModule.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RiversModule)
/* harmony export */ });
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Rand */ "./src/Rand.ts");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Util */ "./src/Util.ts");
/* harmony import */ var _general_LocationModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../general/LocationModule */ "./src/modules/general/LocationModule.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _BiomesModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BiomesModule */ "./src/modules/geography/BiomesModule.ts");
/* harmony import */ var _ClimateModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ClimateModule */ "./src/modules/geography/ClimateModule.ts");
/* harmony import */ var _river_names_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./river-names.json */ "./src/modules/geography/river-names.json");







class RiversModule extends _Module__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor(realm) {
        super(realm);
    }
    run() {
        this.rivers = [];
        this.tributaries = [];
        // Pick a number of rivers
        let riverCount = 0;
        switch (this._realm.climate.humidity) {
            case _ClimateModule__WEBPACK_IMPORTED_MODULE_5__.Humidity.DRY:
                riverCount = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].between(0, 2, true);
                break;
            case _ClimateModule__WEBPACK_IMPORTED_MODULE_5__.Humidity.WET:
                riverCount = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].between(2, 4, true);
        }
        // For small realms, there should only be one river
        if (this._realm.size.sizeIndex < 2) {
            riverCount = 1;
        }
        // Add rivers
        for (let i = 0; i < riverCount; i++)
            this.addNewRiver();
    }
    addNewRiver() {
        // Determine the directions (to and from) the river will flow
        // Rivers tend to flow from mountains towards coasts, so factor this in if those biomes are present
        const mountains = this._realm.biomes.biomes.find((b) => b.type == _BiomesModule__WEBPACK_IMPORTED_MODULE_4__.BiomeType.MOUNTAINS) ||
            null;
        const coast = this._realm.biomes.biomes.find((b) => b.type == _BiomesModule__WEBPACK_IMPORTED_MODULE_4__.BiomeType.COAST) || null;
        // Only use cardinal directions
        let availableDirections = Object.values(_general_LocationModule__WEBPACK_IMPORTED_MODULE_2__.Direction).filter((d) => _general_LocationModule__WEBPACK_IMPORTED_MODULE_2__["default"].isCardinalDirection(d) &&
            (!coast || d != coast.direction) &&
            (!mountains || d != mountains.direction));
        let flowsFrom = mountains && _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.8
            ? mountains.direction
            : _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(availableDirections);
        // Rivers can't flow to the same place they're flowing from
        _Util__WEBPACK_IMPORTED_MODULE_1__["default"].arrayRemove(availableDirections, flowsFrom);
        let flowsTo = coast
            ? coast.direction
            : _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(availableDirections);
        const riverName = this.getRiverName();
        const tributaries = this.getTributaries(riverName);
        let river = {
            name: riverName,
            flowsTo: flowsTo,
            flowsFrom: flowsFrom,
            flowsToCoast: coast,
            flowsFromMountains: mountains,
            tributaries: tributaries
        };
        this.rivers.push(river);
    }
    getRiverName() {
        // Roots cannot be used by an existing river
        let validRoots = _river_names_json__WEBPACK_IMPORTED_MODULE_6__.roots.filter((p) => this.rivers.every((r) => r.name.root.text != p.text) &&
            this._realm.evaluateCondition(p.condition));
        let validSuffixes = _river_names_json__WEBPACK_IMPORTED_MODULE_6__.riverSuffixes.filter((p) => this._realm.evaluateCondition(p.condition));
        let riverName;
        do {
            let root = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(validRoots, (item) => item.points);
            let suffix = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(validSuffixes, (item) => item.points);
            riverName = { root: root, suffix: suffix };
        } while (!this.isValidRiverName(riverName));
        return riverName;
    }
    getTributaries(riverName) {
        let tributaries = [];
        const tributaryCount = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].between(0, 3);
        for (let i = 0; i < tributaryCount; i++) {
            const tributaryName = i == 0 && _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.6 ? riverName : this.getRiverName();
            // If the tributary name is the same as the stem, choose a tributary prefix and/or suffix
            let prefix = null;
            let suffix = null;
            do {
                if (riverName == tributaryName) {
                    do {
                        if (_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.3)
                            prefix = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(_river_names_json__WEBPACK_IMPORTED_MODULE_6__.tributaryPrefixes, (item) => item.points);
                        if (_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.3)
                            suffix = _Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(_river_names_json__WEBPACK_IMPORTED_MODULE_6__.tributarySuffixes, (item) => item.points);
                    } while (!prefix && !suffix);
                }
            } while (!this.isValidRiverName(tributaryName));
            let tributary = {
                name: tributaryName,
                prefix: prefix,
                suffix: suffix,
                stem: null
            };
            // The more tributaries there are the lower the chance is to add a new one
            const max = 5;
            const remaining = max - this.tributaries.length;
            const chance = remaining * (1 / max) + 0.1; // Always give it +10% chance
            if (_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() >= chance)
                continue;
            // Push to river tributary array (gets returned)
            tributaries.push(tributary);
            // Push to top level tributary array (of all tributaries)
            this.tributaries.push(tributary);
        }
        return tributaries;
    }
    isValidRiverName(riverName) {
        // Can't have two vowels next to each other
        if (_Util__WEBPACK_IMPORTED_MODULE_1__["default"].endsWithVowel(riverName.root.text) &&
            _Util__WEBPACK_IMPORTED_MODULE_1__["default"].startsWithVowel(riverName.suffix.text)) {
            return false;
        }
        // No two rivers or tributaries can have the same name
        const riverAndTributaryNames = this.tributaries
            .map((t) => t.name)
            .concat(this.rivers.map((r) => r.name));
        if (riverAndTributaryNames.includes(riverName)) {
            return false;
        }
        // Rivers' roots cannot end in their suffix (Hennen-en, Frau-au, etc.)
        if (riverName.root.text.indexOf(riverName.suffix.text) ==
            riverName.root.text.length - riverName.suffix.text.length) {
            return false;
        }
        return true;
    }
}


/***/ }),

/***/ "./src/modules/geography/SizeModule.ts":
/*!*********************************************!*\
  !*** ./src/modules/geography/SizeModule.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Size": () => (/* binding */ Size),
/* harmony export */   "default": () => (/* binding */ SizeModule)
/* harmony export */ });
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Rand */ "./src/Rand.ts");


var Size;
(function (Size) {
    Size["VERY_SMALL"] = "very small";
    Size["SMALL"] = "small";
    Size["MEDIUM"] = "medium";
    Size["LARGE"] = "large";
    Size["VERY_LARGE"] = "very large";
})(Size || (Size = {}));
class SizeModule extends _Module__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(realm) {
        super(realm);
    }
    run() {
        this.size = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(Object.values(Size));
        this._realm.addTag(this.size == Size.VERY_SMALL ? 'city' : 'region');
    }
    get sizeIndex() {
        return Object.values(Size).indexOf(this.size);
    }
}


/***/ }),

/***/ "./src/realm/Realm.ts":
/*!****************************!*\
  !*** ./src/realm/Realm.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Realm)
/* harmony export */ });
/* harmony import */ var _modules_geography_SizeModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/geography/SizeModule */ "./src/modules/geography/SizeModule.ts");
/* harmony import */ var _modules_general_LocationModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/general/LocationModule */ "./src/modules/general/LocationModule.ts");
/* harmony import */ var _modules_geography_ParentEntityModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/geography/ParentEntityModule */ "./src/modules/geography/ParentEntityModule.ts");
/* harmony import */ var _modules_geography_ClimateModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/geography/ClimateModule */ "./src/modules/geography/ClimateModule.ts");
/* harmony import */ var _modules_geography_BiomesModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/geography/BiomesModule */ "./src/modules/geography/BiomesModule.ts");
/* harmony import */ var _modules_geography_RiversModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/geography/RiversModule */ "./src/modules/geography/RiversModule.ts");






class Realm {
    constructor() {
        // public heraldry!: HeraldryModule;
        // public government!: GovernmentModule;
        // Tags
        this._tags = [];
        this.runModuleSequence();
    }
    runModuleSequence() {
        console.log(' === Running Module Sequence === ');
        this.size = new _modules_geography_SizeModule__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        this.location = new _modules_general_LocationModule__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        this.parentEntity = new _modules_geography_ParentEntityModule__WEBPACK_IMPORTED_MODULE_2__["default"](this);
        this.climate = new _modules_geography_ClimateModule__WEBPACK_IMPORTED_MODULE_3__["default"](this);
        this.biomes = new _modules_geography_BiomesModule__WEBPACK_IMPORTED_MODULE_4__["default"](this);
        this.rivers = new _modules_geography_RiversModule__WEBPACK_IMPORTED_MODULE_5__["default"](this);
        // this.heraldry = new HeraldryModule(this);
    }
    addTag(tag) {
        this._tags.push(tag);
    }
    get tags() {
        return this._tags;
    }
    evaluateCondition(condition) {
        if (condition == '')
            return true;
        let u = {};
        this.tags.forEach((t) => (u[t] = true));
        return new ConditionEvaluator().run(condition, u);
    }
}
class ConditionEvaluator {
    constructor() { }
    run(condition, t) {
        // Regex instead?
        const result = eval(`(${condition})`) ? true : false;
        return result;
    }
}


/***/ }),

/***/ "./src/modules/geography/parent-entity.json":
/*!**************************************************!*\
  !*** ./src/modules/geography/parent-entity.json ***!
  \**************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"templates":["`the ${adjective} ${government}`"],"adjectives":["divine","holy","royal"],"governments":[{"noun":"empire","adj":"imperial"},{"noun":"kingdom","adj":"royal"},{"noun":"imperium","adj":"imperial"},{"noun":"dominion","adj":"dominion"},{"noun":"commonwealth","adj":"commonwealth"}]}');

/***/ }),

/***/ "./src/modules/geography/river-names.json":
/*!************************************************!*\
  !*** ./src/modules/geography/river-names.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"tributaryPrefixes":[{"text":"heller","condition":"","points":10},{"text":"dunkler","condition":"","points":10},{"text":"kleiner","condition":"","points":10}],"tributarySuffixes":[{"text":"enbach","condition":"","points":10}],"roots":[{"text":"reg","condition":"","points":10},{"text":"don","condition":"","points":10},{"text":"donner","condition":"","points":10},{"text":"erden","condition":"","points":10},{"text":"weiß","condition":"","points":10},{"text":"wald","condition":"t.borealForest || t.temperateForest","points":10},{"text":"walden","condition":"t.borealForest || t.temperateForest","points":10},{"text":"vald","condition":"t.borealForest || t.temperateForest","points":10},{"text":"val","condition":"t.borealForest || t.temperateForest","points":10}],"riverSuffixes":[{"text":"au","condition":"","points":10},{"text":"en","condition":"","points":10}]}');

/***/ }),

/***/ "./src/modules/geography/season-descriptions.json":
/*!********************************************************!*\
  !*** ./src/modules/geography/season-descriptions.json ***!
  \********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"summer":{"warm":["hot","blistering","stifling","long","sweltering"],"cold":["cool","mild"],"wet":["humid"],"dry":["arid"],"temperate":["pleasant","agreeable","balmy"]},"winter":{"warm":["mild","short"],"cold":["harsh","cold","brisk","biting","chilly","freezing","icy"],"wet":["snowy","damp"],"dry":["crisp","cloudless"],"temperate":["mild","pleasant"]}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rand */ "./src/Rand.ts");
/* harmony import */ var _realm_Realm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./realm/Realm */ "./src/realm/Realm.ts");


_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seed = Math.floor(Math.random() * 999).toString();
// Rand.seed = '490';
console.log(`Seed: ${_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seed}`);
_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seedRandomNumberGenerator();
let realm = new _realm_Realm__WEBPACK_IMPORTED_MODULE_1__["default"]();
console.log('----------------', realm);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map