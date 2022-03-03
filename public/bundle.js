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
    run() {
        console.log('module base');
    }
}


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
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Rand */ "./src/Rand.ts");


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
class LocationModule extends _Module__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(realm) {
        super(realm);
        this.locationWithinParentEntity = Direction.NORTH;
        this.directionToCoast = null;
    }
    run() {
        this.locationWithinParentEntity = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(Object.values(Direction));
        // Add direction tags south-west => south, west
        this._realm.addTag(this.locationWithinParentEntity);
        // 40% chance to be coastal
        if (_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].next() < 0.4) {
            this.directionToCoast = this.locationWithinParentEntity;
            this._realm.addTag('coastal');
        }
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
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Rand */ "./src/Rand.ts");
/* harmony import */ var _parent_entity_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parent-entity.json */ "./src/modules/geography/parent-entity.json");



class ParentEntityModule extends _Module__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(realm) {
        super(realm);
    }
    run() {
        const template = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(_parent_entity_json__WEBPACK_IMPORTED_MODULE_2__.templates);
        this.adjective = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(_parent_entity_json__WEBPACK_IMPORTED_MODULE_2__.adjectives);
        this.government = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(_parent_entity_json__WEBPACK_IMPORTED_MODULE_2__.governments);
        const adjective = this.adjective;
        const government = this.government.noun;
        this.name = eval(template);
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
    Size["MEDIUM_SIZED"] = "medium-sized";
    Size["LARGE"] = "large";
    Size["VERY_LARGE"] = "very large";
})(Size || (Size = {}));
class SizeModule extends _Module__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(realm) {
        super(realm);
        this.size = Size.SMALL;
    }
    run() {
        this.size = _Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(Object.keys(Size));
        this._realm.addTag(this.size == Size.VERY_SMALL ? 'city' : 'region');
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
/* harmony import */ var _modules_general_LocationModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/general/LocationModule */ "./src/modules/general/LocationModule.ts");
/* harmony import */ var _modules_geography_ParentEntityModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/geography/ParentEntityModule */ "./src/modules/geography/ParentEntityModule.ts");
/* harmony import */ var _modules_geography_SizeModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/geography/SizeModule */ "./src/modules/geography/SizeModule.ts");



class Realm {
    constructor() {
        // public climate = new ClimateModule(this);
        // public biomes = new BiomesModule(this);
        // public rivers = new RiversModule(this);
        // public heraldry = new HeraldryModule(this);
        // public government = new GovernmentModule(this);
        // Tags
        this._tags = [];
        this.runModuleSequence();
    }
    runModuleSequence() {
        console.log(' === Running Module Sequence === ');
        this.size = new _modules_geography_SizeModule__WEBPACK_IMPORTED_MODULE_2__["default"](this);
        this.direction = new _modules_general_LocationModule__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        this.parentEntity = new _modules_geography_ParentEntityModule__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    }
    addTag(tag) {
        this._tags.push(tag);
    }
    get tags() {
        return this._tags;
    }
}


/***/ }),

/***/ "./src/modules/geography/parent-entity.json":
/*!**************************************************!*\
  !*** ./src/modules/geography/parent-entity.json ***!
  \**************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"templates":["`the ${adjective} ${government}`"],"adjectives":["divine","holy","royal"],"governments":[{"noun":"empire","adj":"imperial"},{"noun":"kingdom","adj":"royal"},{"noun":"imperium","adj":"imperial"},{"noun":"dominion","adj":"dominion"},{"noun":"commonwealth","adj":"commonwealth"}]}');

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


_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seed = Math.random().toString();
_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seedRandomNumberGenerator();
let realm = new _realm_Realm__WEBPACK_IMPORTED_MODULE_1__["default"]();
console.log(realm);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map