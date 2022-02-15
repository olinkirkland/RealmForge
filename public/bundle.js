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
        let loadList = [
            { propertyName: 'content', url: 'content.json', loaded: false },
            { propertyName: 'words', url: 'words.json', loaded: false },
            {
                propertyName: 'placeNameParts',
                url: 'place-name-parts.json',
                loaded: false
            },
            {
                propertyName: 'riverNameParts',
                url: 'river-name-parts.json',
                loaded: false
            }
        ];
        loadList.forEach((item) => {
            const url = `./assets/data/${item.url}`;
            fetch(url)
                .then((response) => {
                return response.json();
            })
                .then((loadedContent) => {
                Object.getPrototypeOf(Data)[item.propertyName] =
                    loadedContent;
                item.loaded = true;
                console.log(`Loaded ${item.url}`);
                if (loadList.every((t) => {
                    return t.loaded;
                })) {
                    Data.parse();
                    callback();
                }
            });
        });
    }
    static parse() {
        const u = Data.content;
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
        this.sizeIndex = 0;
        this.size = 'small';
        this.governmentRank = 'territory';
        this.leaderTitle = 'lord';
        this.parentEntityName = 'the empire';
        this.parentEntityAdj = 'imperial';
        this.directionWithinParentEntity = 'south';
        this.directionAdjWithinParentEntity = 'south';
        this.temperature = 'temperate';
        this.humidity = 'wet';
        this.seasonSummer = ['long', 'harsh'];
        this.seasonWinter = ['long', 'mild'];
        this.biomes = [];
        this.rivers = [];
        this.coastal = false;
        this.sigilName = 'dove';
        this.sigilIcon = 'dove';
        this.sigilMeaning = 'peace';
        this.sigilPresentOnHeraldry = false;
        this.determineParentEntity();
        this.determineDirection();
        this.determineSize();
        this.determineGovernmentRank();
        this.determineClimate();
        this.determineBiomes();
        this.determineRivers();
        this.determineSigil();
        this.determineHeraldry();
    }
    determineParentEntity() {
        let arr = ['the'];
        if (_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() < 0.8) {
            let firstDescriptor = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityDescriptorsBefore);
            arr.push(firstDescriptor);
            if (_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() < 0.2) {
                let secondDescriptor = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityDescriptorsBefore);
                if (secondDescriptor != firstDescriptor)
                    arr.push(secondDescriptor);
            }
        }
        let government = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityGovernments);
        this.parentEntityName = government.noun;
        this.parentEntityAdj = government.adj;
        arr.push(this.parentEntityName);
        if (_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() < 0.1) {
            arr.push(_util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityDescriptorsAfter));
        }
        this.parentEntityName = arr.join(' ');
    }
    determineDirection() {
        const dir = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.directions);
        this.directionWithinParentEntity = dir.noun;
        this.directionAdjWithinParentEntity = dir.adj;
        // 40% chance to be coastal, 0% if location is middle
        this.coastal =
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() < 0.4 && this.directionWithinParentEntity != 'middle';
    }
    determineSize() {
        this.sizeIndex = Math.floor(_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() * _data__WEBPACK_IMPORTED_MODULE_0__.Data.sizes.length);
        this.size = _data__WEBPACK_IMPORTED_MODULE_0__.Data.sizes[this.sizeIndex];
    }
    determineGovernmentRank() {
        let govt;
        do {
            govt = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.governmentRanks);
        } while (!govt.size.includes(this.sizeIndex));
        this.governmentRank = govt.rank;
        this.leaderTitle = govt.ruler;
    }
    determineSigil() {
        let sigil = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.sigils);
        this.sigilName = sigil.name;
        this.sigilIcon = sigil.icon;
        this.sigilMeaning = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(sigil.meanings);
        this.sigilPresentOnHeraldry = _util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() < 0.2;
    }
    determineHeraldry() {
        // Choose heraldry based on biomes and animals among other things
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
            if (_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() < 0.5)
                break;
        }
        // Description of summer
        this.seasonSummer = [];
        const summer = _data__WEBPACK_IMPORTED_MODULE_0__.Data.seasonDescriptors.summer;
        let availableSummerDescriptors = summer[this.humidity].concat(summer[this.temperature]);
        for (let i = 0; i < 2; i++) {
            const d = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(availableSummerDescriptors);
            if (this.seasonWinter.includes(d)) {
                continue;
            }
            this.seasonSummer.push(d);
            availableSummerDescriptors = _util__WEBPACK_IMPORTED_MODULE_1__.Util.arrayRemove(availableSummerDescriptors, d);
            if (_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() < 0.5)
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
        let b = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(availableBiomes);
        if (b == 'mountains')
            b = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(availableBiomes);
        availableBiomes = _util__WEBPACK_IMPORTED_MODULE_1__.Util.arrayRemove(availableBiomes, b);
        let availableSizeIndex = _data__WEBPACK_IMPORTED_MODULE_0__.Data.sizes.indexOf(this.size) * 2;
        let sizeIndex = Math.floor(_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() * availableSizeIndex);
        availableSizeIndex -= sizeIndex;
        let primaryBiome = {
            type: b,
            size: _data__WEBPACK_IMPORTED_MODULE_0__.Data.sizes[Math.max(1, sizeIndex)],
            direction: _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.directions)
        };
        this.biomes.push(primaryBiome);
        if (_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() < 0.6) {
            // Choose a direction that isn't the same direction as the primary Biome's direction
            // Also cannot be a combined direction like north-east or south-west, must be one of the four cardinal directions or 'middle'
            let secondaryDirection;
            do {
                secondaryDirection = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.directions);
            } while (secondaryDirection.noun == primaryBiome.direction.noun ||
                secondaryDirection.noun.includes('-'));
            let secondaryBiome = {
                type: _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(availableBiomes),
                size: _data__WEBPACK_IMPORTED_MODULE_0__.Data.sizes[Math.floor(_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() * availableSizeIndex)],
                direction: secondaryDirection
            };
            // Add a second biome
            this.biomes.push(secondaryBiome);
        }
    }
    determineRivers() {
        let riverMinMax = [0, 0];
        switch (this.humidity) {
            case 'dry':
                riverMinMax = [0, 1];
                break;
            case 'temperate':
                riverMinMax = [1, 3];
                break;
            case 'wet':
                riverMinMax = [2, 3];
                break;
        }
        let riverCount = Math.floor(_util__WEBPACK_IMPORTED_MODULE_1__.Util.rand() * (riverMinMax[1] - riverMinMax[0]) + riverMinMax[0]);
        // For small realms (less than 3 on the sizeIndex) there shouldn't be more than two rivers passing through
        if (this.sizeIndex < 3) {
            riverCount = Math.min(riverCount, 2);
        }
        // Add rivers
        console.log('river count: ' + riverCount);
        for (let i = 0; i < riverCount; i++) {
            // If the realm contains a mountain biome, rivers should flow from it
            let flowsFrom = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.directions);
            // If the realm contains a coast, rivers should flow to it
            let flowsTo = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.directions);
            this.rivers.push({
                name: this.determineRiverName(),
                flowsTo: flowsTo,
                flowsFrom: flowsFrom,
                tributaries: []
            });
        }
    }
    determineRiverName() {
        let riverName = { root: 'Reg', suffix: 'en' };
        return riverName;
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
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.ts");

class Util {
    static generateSeed() {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            arr.push(Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.words, false));
        }
        Util.seed = arr.join('-');
        Util.seedRandomNumberGenerator();
    }
    static seedRandomNumberGenerator() {
        let h = 1779033703 ^ Util.seed.length;
        for (var i = 0; i < Util.seed.length; i++) {
            h = Math.imul(h ^ Util.seed.charCodeAt(i), 3432918353);
            h = (h << 13) | (h >>> 19);
        }
        Util.m_w = (123456789 + h) & Util.mask;
        Util.m_z = (987654321 - h) & Util.mask;
    }
    static rand() {
        Util.m_z = (36969 * (Util.m_z & 65535) + (Util.m_z >> 16)) & Util.mask;
        Util.m_w = (18000 * (Util.m_w & 65535) + (Util.m_w >> 16)) & Util.mask;
        let result = ((Util.m_z << 16) + (Util.m_w & 65535)) >>> 0;
        return result / 4294967296;
    }
    static arrayRemove(arr, elementToRemove) {
        return arr.filter(function (element) {
            return element != elementToRemove;
        });
    }
    // Returns a random value from an array
    static randomValue(u, seeded = true) {
        return seeded
            ? u[Math.floor(Util.rand() * u.length)]
            : u[Math.floor(Math.random() * u.length)];
    }
    // Returns 'a' or 'an' if str's first char is a consonant or a vowel
    static aOrAn(str) {
        return Util.startsWithVowel(str) ? 'an' : 'a';
    }
    // Returns true if the string starts with a vowel
    static startsWithVowel(str) {
        const regex = new RegExp('^[aeiou].*', 'i');
        return regex.test(str);
    }
    // Returns true if the string starts with a vowel
    static endsWithVowel(str) {
        const regex = new RegExp('.*^[aeiou]', 'i');
        return regex.test(str);
    }
    // Returns a string joining an array of at least two entries
    // with commas and the word 'and' between the last two entries
    static joinArrayWithAnd(arr) {
        const last = arr.pop();
        let str = arr.join(', ');
        str += ', and ' + last;
        return str;
    }
    // Tweet a realm
    static shareByTweet(realm) {
        let tweet = `Explore ${Util.capitalize(realm.name)}, a ${realm.size} ${realm.parentEntityAdj} ${realm.governmentRank}.`;
        window.open('https://twitter.com/intent/tweet?url=' +
            window.location.href +
            '&text=' +
            tweet, '_blank');
    }
    // Capitalize first letter
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
    static readWord(word) {
        return word.root + word.suffix;
    }
}
Util.m_w = 123456789;
Util.m_z = 987654321;
Util.mask = 4294967295;


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
btnStart.addEventListener('click', generateSeedAndStart);
// Handle tweet button
const btnShareTwitter = document.getElementById('btnShareTwitter');
btnShareTwitter.addEventListener('click', () => {
    _util__WEBPACK_IMPORTED_MODULE_0__.Util.shareByTweet(realm);
});
// Load data
_data__WEBPACK_IMPORTED_MODULE_1__.Data.setup(() => {
    // Does the url contain a seed (query)?
    // www.google.com?foo
    //    -> foo
    // www.google.com?bar#
    //    -> bar
    const url = window.location.href;
    const arr = url.match(/\?([a-z0-9,-]+)/);
    if (arr && arr.length > 1) {
        _util__WEBPACK_IMPORTED_MODULE_0__.Util.seed = arr[1];
        start();
    }
    else {
        generateSeedAndStart();
    }
});
// Initialize variables
let realm;
function generateSeedAndStart() {
    _util__WEBPACK_IMPORTED_MODULE_0__.Util.generateSeed();
    let url = window.location.href;
    url = url.substring(0, url.indexOf('?'));
    if (window.location.href)
        window.location.replace(url + '?' + _util__WEBPACK_IMPORTED_MODULE_0__.Util.seed);
}
// Start the generation process
function start() {
    _util__WEBPACK_IMPORTED_MODULE_0__.Util.seedRandomNumberGenerator();
    realm = new _realm__WEBPACK_IMPORTED_MODULE_2__.Realm();
    updateView();
    // Delay intro animations
    const sectionEls = document.querySelectorAll('.container');
    sectionEls.forEach((node, index) => {
        const el = node;
        setTimeout(() => {
            el.classList.add('fade-in');
        }, 250 * index);
    });
}
function updateView() {
    // Choose a photo for the hero
    const heroEl = document.getElementById('hero');
    heroEl.setAttribute('style', `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${determineHeroImageUrl()})`);
    // Blurbs
    applyBiomesBlurb();
    applyRiversBlurb();
    toggleVisibility('sigil-present-on-heraldry', realm.sigilPresentOnHeraldry);
    // Words
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
    applyIcon('sigil', realm.sigilIcon);
}
function determineHeroImageUrl() {
    // Todo use realm information to determine the image
    return _util__WEBPACK_IMPORTED_MODULE_0__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.images);
}
function applyText(query, text) {
    const els = document.querySelectorAll('span.' + query);
    els.forEach((node) => {
        const el = node;
        if (el.classList.contains('prepend-article')) {
            el.textContent = _util__WEBPACK_IMPORTED_MODULE_0__.Util.aOrAn(text) + ' ' + text;
        }
        else {
            el.textContent = text;
        }
    });
}
function toggleVisibility(query, visible) {
    const els = document.querySelectorAll('span.' + query);
    els.forEach((node) => {
        const el = node;
        if (visible) {
            el.classList.remove('hidden');
        }
        else {
            el.classList.add('hidden');
        }
    });
}
function applyIcon(query, icon) {
    const els = document.querySelectorAll('i.' + query);
    els.forEach((node) => {
        const el = node;
        // Remove the previous icon
        el.classList.forEach((className) => {
            let text = '';
            if (className.includes('fa-') && className !== 'fa-2x') {
                el.classList.remove(className);
            }
        });
        el.classList.add('fa-' + icon);
    });
}
function applyBiomesBlurb() {
    let text = '';
    if (realm.biomes.length == 1) {
        let b = realm.biomes[0];
        text = `<span class="name"></span> is made up of ${b.type}.`;
    }
    else if (realm.biomes.length == 2) {
        let b1 = realm.biomes[0];
        let b2 = realm.biomes[1];
        text = `The ecoregions of <span class="name"></span> consist mostly of ${b1.type} with a ${b2.size} ${b2.type} region in the ${b2.direction.noun}.`;
    }
    const el = document.querySelector('.biomes-blurb');
    el.innerHTML = text;
}
function applyRiversBlurb() {
    let text = '';
    if (realm.rivers.length == 0) {
        text = `No notable rivers pass through <span class="name"></span>.`;
    }
    else if (realm.rivers.length == 1) {
        let r = realm.rivers[0];
        text = `The main river that flows through <span class="name"></span> is the ${_util__WEBPACK_IMPORTED_MODULE_0__.Util.readWord(r.name)}. The ${_util__WEBPACK_IMPORTED_MODULE_0__.Util.readWord(r.name)} starts in the ${r.flowsFrom} and flows toward the ${r.flowsTo}.`;
        if (r.tributaries.length > 0) {
            text +=
                '<br>Its main tributaries are the ' +
                    _util__WEBPACK_IMPORTED_MODULE_0__.Util.joinArrayWithAnd(r.tributaries);
        }
    }
    else {
        text = `<span class="name"></span> contains several rivers:<ul>${realm.rivers
            .map((river) => {
            return `<li>${_util__WEBPACK_IMPORTED_MODULE_0__.Util.readWord(river.name)}</li>`;
        })
            .join(' ')}</ul>`;
    }
    const el = document.querySelector('.rivers-blurb');
    el.innerHTML = text;
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map