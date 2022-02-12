/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data.ts":
/*!*********************!*\
  !*** ./src/data.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Data": () => (/* binding */ Data)
/* harmony export */ });
class Data {
    static setup(callback) {
        // Load names
        fetch('./assets/data/content.json')
            .then((response) => {
            return response.json();
        })
            .then((data) => {
            Data.parse(data);
            callback();
        });
    }
    static parse(u) {
        Data.biomes = u.biomes;
        Data.directions = u.directions;
        Data.images = u.images;
        Data.governmentRanks = u.governmentRanks;
        Data.sigils = u.sigils;
        Data.sizes = u.sizes;
        Data.seasonDescriptors = u.seasons;
        Data.parentEntityDescriptorsBefore = u.parentEntities.descriptorsBefore;
        Data.parentEntityDescriptorsAfter = u.parentEntities.descriptorsAfter;
        Data.parentEntityGovernments = u.parentEntities.governments;
    }
}


/***/ }),

/***/ "./src/realm.ts":
/*!**********************!*\
  !*** ./src/realm.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Realm": () => (/* binding */ Realm)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");


class Realm {
    constructor() {
        this.name = 'oldmarch';
        this.adj = 'oldmarch';
        this.capitalCityName = 'highbridge';
        this.governmentRank = 'territory';
        this.leaderTitle = 'lord';
        this.parentEntityName = 'the empire';
        this.parentEntityAdj = 'imperial';
        this.directionWithinParentEntity = 'south';
        this.directionAdjWithinParentEntity = 'south';
        this.size = 'small';
        this.temperature = 'temperate';
        this.humidity = 'wet';
        this.seasonSummer = ['long', 'harsh'];
        this.seasonWinter = ['long', 'mild'];
        this.biomes = [];
        this.coastal = false;
        this.sigilName = 'dove';
        this.sigilIcon = 'dove';
        this.sigilMeaning = 'peace';
        this.determineParentEntity();
        this.determineDirection();
        this.determineSize();
        this.determineGovernmentRank();
        this.determineSigil();
        this.determineClimate();
        this.determineBiomes();
    }
    determineParentEntity() {
        let arr = ['the'];
        if (Math.random() < 0.8) {
            let firstDescriptor = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityDescriptorsBefore);
            arr.push(firstDescriptor);
            if (Math.random() < 0.2) {
                let secondDescriptor = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityDescriptorsBefore);
                if (secondDescriptor != firstDescriptor)
                    arr.push(secondDescriptor);
            }
        }
        let government = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityGovernments);
        this.parentEntityAdj = _data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityGovernments[government];
        arr.push(government);
        if (Math.random() < 0.1) {
            arr.push(_util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityDescriptorsAfter));
        }
        this.parentEntityName = arr.join(' ');
    }
    determineDirection() {
        this.directionWithinParentEntity = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.directions);
        this.directionAdjWithinParentEntity =
            _data__WEBPACK_IMPORTED_MODULE_0__.Data.directions[this.directionWithinParentEntity];
        // 40% chance to be coastal, 0% if location is middle
        this.coastal =
            Math.random() < 0.4 && this.directionWithinParentEntity != 'middle';
    }
    determineSize() {
        this.size = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.sizes);
    }
    determineGovernmentRank() {
        this.governmentRank = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.governmentRanks);
        this.leaderTitle = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.governmentRanks);
    }
    determineSigil() {
        this.sigilName = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.sigils);
        this.sigilIcon = _data__WEBPACK_IMPORTED_MODULE_0__.Data.sigils[this.sigilName].icon;
        this.sigilMeaning = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.sigils[this.sigilName].meanings);
    }
    determineClimate() {
        // Choose geography and climate based on the direction
        if (this.directionWithinParentEntity.includes('north')) {
            this.temperature = 'cold';
        }
        else if (this.directionWithinParentEntity.includes('south')) {
            this.temperature = 'warm';
        }
        else {
            this.temperature = 'temperate';
        }
        this.humidity = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(['wet', 'dry']);
        if (this.coastal) {
            this.humidity = 'wet';
        }
        // Description of winter
        this.seasonWinter = [];
        const winter = _data__WEBPACK_IMPORTED_MODULE_0__.Data.seasonDescriptors.winter;
        let availableWinterDescriptors = winter[this.humidity].concat(winter[this.temperature]);
        for (let i = 0; i < 2; i++) {
            const d = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(availableWinterDescriptors);
            this.seasonWinter.push(d);
            availableWinterDescriptors = _util__WEBPACK_IMPORTED_MODULE_1__.Util.arrayRemove(availableWinterDescriptors, d);
            if (Math.random() < 0.5)
                break;
        }
        // Description of summer
        this.seasonSummer = [];
        const summer = _data__WEBPACK_IMPORTED_MODULE_0__.Data.seasonDescriptors.summer;
        let availableSummerDescriptors = summer[this.humidity].concat(summer[this.temperature]);
        for (let i = 0; i < 2; i++) {
            const d = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(availableSummerDescriptors);
            if (this.seasonWinter.includes(d)) {
                i--;
                continue;
            }
            this.seasonSummer.push(d);
            availableSummerDescriptors = _util__WEBPACK_IMPORTED_MODULE_1__.Util.arrayRemove(availableSummerDescriptors, d);
            if (Math.random() < 0.5)
                break;
        }
    }
    determineBiomes() {
        // mountain | boreal-forest | temperate-forest | grassland | tundra
        let availableBiomes = _data__WEBPACK_IMPORTED_MODULE_0__.Data.biomes.filter((str) => {
            switch (this.humidity) {
                case 'dry':
                    // Dry? Remove boreal-forest and temperate-forest
                    return ['boreal-forest', 'temperate-forest'].includes(str);
                    break;
                case 'wet':
                    // Wet? Remove grassland and tundra
                    return ['grassland', 'tundra'].includes(str);
                    break;
            }
            return true;
        });
        // Add the primary biome, reroll once if mountains
        let b = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(availableBiomes);
        if (b == 'mountains')
            b = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(availableBiomes);
        _util__WEBPACK_IMPORTED_MODULE_1__.Util.arrayRemove(availableBiomes, b);
        let availableSizeIndex = _data__WEBPACK_IMPORTED_MODULE_0__.Data.sizes.indexOf(this.size);
        let sizeIndex = Math.floor(Math.random() * availableSizeIndex);
        availableSizeIndex -= sizeIndex;
        let primaryBiome = {
            biome: b,
            size: _data__WEBPACK_IMPORTED_MODULE_0__.Data.sizes[sizeIndex],
            direction: _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.directions)
        };
        this.biomes.push(primaryBiome);
        if (Math.random() < 0.6) {
            // Choose a direction that isn't the same direction as the primary Biome's direction
            // Also cannot be a combined direction like north-east or south-west, must be one of the four cardinal directions or 'middle'
            let secondaryDirection;
            do {
                secondaryDirection = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.directions);
            } while (secondaryDirection == primaryBiome.direction &&
                secondaryDirection.includes('-'));
            let secondaryBiome = {
                biome: _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(availableBiomes),
                size: _data__WEBPACK_IMPORTED_MODULE_0__.Data.sizes[Math.floor(Math.random() * availableSizeIndex)],
                direction: secondaryDirection
            };
            // Add a second biome
            this.biomes.push(secondaryBiome);
        }
    }
}


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Util": () => (/* binding */ Util)
/* harmony export */ });
class Util {
    static arrayRemove(arr, elementToRemove) {
        return arr.filter(function (element) {
            return element != elementToRemove;
        });
    }
    static randomKey(u) {
        let keys = Object.keys(u);
        let k = keys[Math.floor(Math.random() * keys.length)];
        return k;
    }
    static randomValue(u) {
        return u[Util.randomKey(u)];
    }
    static aOrAn(str) {
        const regex = new RegExp('^[aeiou].*', 'i');
        return regex.test(str) ? 'an' : 'a';
    }
}


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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.ts");
/* harmony import */ var _realm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./realm */ "./src/realm.ts");



/**
 * Hint: Use 'npm run build' from console to compile + watch the TS code on save
 */
// Handle start button
const btnStart = document.getElementById('btnStart');
btnStart.addEventListener('click', start);
// Load data
_data__WEBPACK_IMPORTED_MODULE_1__.Data.setup(() => {
    realm = new _realm__WEBPACK_IMPORTED_MODULE_2__.Realm();
    updateView();
});
// Initialize variables
let realm;
// Start the generation process
function start() {
    realm = new _realm__WEBPACK_IMPORTED_MODULE_2__.Realm();
    updateView();
}
function updateView() {
    // Choose a photo for the hero
    const heroEl = document.getElementById('hero');
    heroEl.setAttribute('style', `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${determineHeroImageUrl()})`);
    // Apply values to view
    applyText('name', realm.name);
    applyText('government-rank', realm.governmentRank);
    applyText('parent-entity', realm.parentEntityName);
    applyText('parent-entity-adj', realm.parentEntityAdj);
    applyText('direction-within-parent-entity', realm.directionWithinParentEntity);
    applyText('direction-adj-within-parent-entity', realm.directionAdjWithinParentEntity);
    applyText('capital-city', realm.capitalCityName);
    applyText('sigil-name', realm.sigilName);
    applyText('sigil-meaning', realm.sigilMeaning);
    applyText('size', realm.size);
    applyText('climate', realm.temperature);
    applyText('season-summer', realm.seasonSummer.join(', '));
    applyText('season-winter', realm.seasonWinter.join(', '));
    realm.biomes.forEach((biome) => {
        // if)
    });
    applyIcon('sigil', realm.sigilIcon);
    // Change dice icon
    const dice = ['one', 'two', 'three', 'four', 'five', 'six'];
    const iconEl = document.querySelector('#btnStart > i');
    dice.forEach((str) => {
        iconEl.classList.remove('fa-dice-' + str);
    });
    iconEl.classList.add('fa-dice-' + dice[Math.floor(Math.random() * dice.length)]);
}
function determineHeroImageUrl() {
    // Todo use realm information to determine the image
    return _util__WEBPACK_IMPORTED_MODULE_0__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.images);
}
function applyText(query, text) {
    const els = document.querySelectorAll('span.' + query);
    els.forEach((node) => {
        const el = node;
        el.classList.add('keyword');
        if (el.classList.contains('prepend-article')) {
            el.textContent = _util__WEBPACK_IMPORTED_MODULE_0__.Util.aOrAn(text) + ' ' + text;
        }
        else {
            el.textContent = text;
        }
    });
}
function applyIcon(query, icon) {
    const els = document.querySelectorAll('i.' + query);
    els.forEach((node) => {
        const el = node;
        // Remove the previous icon
        el.classList.forEach((className) => {
            if (className.includes('fa-') && className !== 'fa-2x') {
                el.classList.remove(className);
            }
        });
        el.classList.add('fa-' + icon);
    });
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map