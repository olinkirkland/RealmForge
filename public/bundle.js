/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/coat.ts":
/*!*********************!*\
  !*** ./src/coat.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Coat": () => (/* binding */ Coat)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");

class Coat {
    // public chargeArrangement: string;
    constructor(ordinary, tinctures) {
        this.ordinary = ordinary;
        this.tinctures = tinctures;
        this.charge = _util__WEBPACK_IMPORTED_MODULE_0__.Util.rand() < 0.2 ? 'horse' : null;
    }
}


/***/ }),

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
                url: 'lang/places.json',
                loaded: false
            },
            {
                propertyName: 'riverNameParts',
                url: 'lang/rivers.json',
                loaded: false
            },
            {
                propertyName: 'tributaryNameParts',
                url: 'lang/tributaries.json',
                loaded: false
            },
            {
                propertyName: 'faunaNameParts',
                url: 'lang/fauna.json',
                loaded: false
            },
            {
                propertyName: 'floraNameParts',
                url: 'lang/flora.json',
                loaded: false
            },
            {
                propertyName: 'rulersNameParts',
                url: 'lang/rulers.json',
                loaded: false
            },
            {
                propertyName: 'personNameParts',
                url: 'lang/persons.json',
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
        Data.heroImages = u.heroImages.map((heroImage) => {
            heroImage.url = './assets/images/hero_images/' + heroImage.url;
            return heroImage;
        });
        Data.governmentRanks = u.governmentRanks;
        Data.sigils = u.sigils;
        Data.sizes = u.sizes;
        Data.seasonDescriptors = u.seasons;
        Data.parentEntityDescriptorsBefore = u.parentEntities.descriptorsBefore;
        Data.parentEntityDescriptorsAfter = u.parentEntities.descriptorsAfter;
        Data.parentEntityGovernments = u.parentEntities.governments;
        // Apply heraldry
        Data.ordinaries = u.heraldry.ordinaries;
        Data.tinctures = u.heraldry.tinctures;
        // Apply defaults to nameParts
        Data.placeNameParts
            .concat(Data.riverNameParts)
            .concat(Data.tributaryNameParts)
            .concat(Data.faunaNameParts)
            .concat(Data.floraNameParts)
            .concat(Data.rulersNameParts)
            // .concat(Data.personsNameParts)
            .forEach((namePart) => {
            if (!namePart.tagRule) {
                namePart.tagRule = 'OR';
            }
        });
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
/* harmony import */ var _coat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coat */ "./src/coat.ts");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.ts");



class Realm {
    constructor() {
        this.tags = ['any'];
        this.seasonSummer = [];
        this.seasonWinter = [];
        this.biomes = [];
        this.rivers = [];
        this.tributaries = [];
        this.coast = false;
        this.countRiverValidLoop = 0;
        this.determineParentEntity();
        this.determineDirection();
        this.determineSize();
        this.determineGovernmentRank();
        this.determineClimate();
        this.determineBiomes();
        this.determineRivers();
        this.determineSigil();
        this.determineRealmName();
        this.determineCities();
        this.determineCoat();
        // console.log(this.tags);
    }
    determineParentEntity() {
        let arr = ['the'];
        if (_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.8) {
            let firstDescriptor = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.parentEntityDescriptorsBefore);
            arr.push(firstDescriptor);
            if (_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.2) {
                let secondDescriptor = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.parentEntityDescriptorsBefore);
                if (secondDescriptor != firstDescriptor)
                    arr.push(secondDescriptor);
            }
        }
        let government = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.parentEntityGovernments);
        this.parentEntityName = government.noun;
        this.parentEntityAdj = government.adj;
        arr.push(this.parentEntityName);
        if (_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.1) {
            arr.push(_util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.parentEntityDescriptorsAfter));
        }
        this.parentEntityName = arr.join(' ');
    }
    determineDirection() {
        const dir = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.directions);
        this.directionWithinParentEntity = dir;
        // Add direction tags south-west => south, west
        this.tags.push(...this.directionWithinParentEntity.noun.split('-'));
        // 40% chance to be coastal, 0% if location is middle
        this.coastDirection = this.directionWithinParentEntity;
        if (_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.4 &&
            this.directionWithinParentEntity.noun != 'middle') {
            this.coast = true;
            while (!this.directionWithinParentEntity.noun
                .split('-')
                .includes(this.coastDirection.noun)) {
                this.coastDirection = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.directions);
            }
            this.tags.push('coast');
        }
    }
    determineSize() {
        this.sizeIndex = Math.floor(_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() * _data__WEBPACK_IMPORTED_MODULE_1__.Data.sizes.length);
        this.size = _data__WEBPACK_IMPORTED_MODULE_1__.Data.sizes[this.sizeIndex];
        if (this.sizeIndex == 0) {
            this.tags.push('city');
        }
        else {
            this.tags.push('region');
        }
    }
    determineGovernmentRank() {
        let govt;
        do {
            govt = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.governmentRanks);
        } while (!govt.size.includes(this.sizeIndex));
        this.governmentRank = govt.rank;
        this.tags.push(this.governmentRank);
        this.leaderTitle = govt.ruler;
    }
    determineSigil() {
        let sigil = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.sigils);
        this.sigilName = sigil.name;
        this.sigilIcon = sigil.icon;
        this.sigilMeaning = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(sigil.meanings);
    }
    determineCoat() {
        // Choose a coat of arms based on biomes and animals among other things
        // Choose an ordinary using chance as points
        let ordinary = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomWeightedValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.ordinaries, (item) => item.weight);
        // Choose exactly one metal and one color
        const metals = _data__WEBPACK_IMPORTED_MODULE_1__.Data.tinctures.filter((t) => t.type == 'metal');
        let tMetal = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomWeightedValue(metals, (item) => item.weight);
        const colors = _data__WEBPACK_IMPORTED_MODULE_1__.Data.tinctures.filter((t) => t.type == 'color');
        let tColor = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomWeightedValue(colors, (item) => item.weight);
        let tinctures = [tMetal, tColor].sort((t) => Math.random() > 0.5 ? 1 : -1);
        this.coat = new _coat__WEBPACK_IMPORTED_MODULE_0__.Coat(ordinary, tinctures);
        // todo set this correctly
        this.sigilPresentOnHeraldry = this.coat.charge != null;
    }
    // Choose geography and climate based on the direction
    determineClimate() {
        if (this.directionWithinParentEntity.noun.includes('north')) {
            this.temperature = 'cold';
        }
        else if (this.directionWithinParentEntity.noun.includes('south')) {
            this.temperature = 'warm';
        }
        else {
            this.temperature = 'temperate';
        }
        this.tags.push(this.temperature);
        this.humidity = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(['wet', 'dry']);
        if (this.coast) {
            this.humidity = 'wet';
        }
        this.tags.push(this.humidity);
        // Description of winter
        this.seasonWinter = [];
        const winter = _data__WEBPACK_IMPORTED_MODULE_1__.Data.seasonDescriptors.winter;
        let availableWinterDescriptors = winter[this.humidity].concat(winter[this.temperature]);
        for (let i = 0; i < 2; i++) {
            const d = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(availableWinterDescriptors);
            this.seasonWinter.push(d);
            availableWinterDescriptors = _util__WEBPACK_IMPORTED_MODULE_2__.Util.arrayRemove(availableWinterDescriptors, d);
            //  If the word is longer than 5 letters, 100% chance to step out of the loop
            //  Otherwise, 50% chance to step out of the loop
            if (_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.5 || d.length > 6)
                break;
        }
        // Description of summer
        this.seasonSummer = [];
        const summer = _data__WEBPACK_IMPORTED_MODULE_1__.Data.seasonDescriptors.summer;
        let availableSummerDescriptors = summer[this.humidity].concat(summer[this.temperature]);
        for (let i = 0; i < 2; i++) {
            const d = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(availableSummerDescriptors);
            if (this.seasonWinter.includes(d)) {
                continue;
            }
            this.seasonSummer.push(d);
            availableSummerDescriptors = _util__WEBPACK_IMPORTED_MODULE_2__.Util.arrayRemove(availableSummerDescriptors, d);
            if (_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.5)
                break;
        }
    }
    determineBiomes() {
        // mountain | boreal-forest | temperate-forest | grassland | tundra
        let availableBiomes = _data__WEBPACK_IMPORTED_MODULE_1__.Data.biomes.filter((str) => {
            switch (this.humidity) {
                case 'dry':
                    // Dry? Remove boreal-forest and temperate-forest
                    return !['boreal-forest', 'temperate-forest'].includes(str);
                    break;
                case 'wet':
                    // Wet? Remove grassland and tundra
                    return !['grassland', 'tundra'].includes(str);
                    break;
            }
            return true;
        });
        availableBiomes = availableBiomes.filter((str) => {
            switch (this.temperature) {
                case 'warm':
                    // Warm? Remove boreal-forest and tundra
                    return !['boreal-forest', 'tundra'].includes(str);
                    break;
            }
            return true;
        });
        // Add the primary biome
        let b = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(availableBiomes);
        // Reroll if mountains and larger than 1
        if (b == 'mountains' && this.sizeIndex > 1)
            b = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(availableBiomes);
        availableBiomes = _util__WEBPACK_IMPORTED_MODULE_2__.Util.arrayRemove(availableBiomes, b);
        let availableSizeIndex = _data__WEBPACK_IMPORTED_MODULE_1__.Data.sizes.indexOf(this.size) * 2;
        let sizeIndex = Math.floor(_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() * availableSizeIndex);
        availableSizeIndex -= sizeIndex;
        let primaryBiome = {
            type: b,
            size: _data__WEBPACK_IMPORTED_MODULE_1__.Data.sizes[Math.max(1, sizeIndex)],
            direction: _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.directions)
        };
        this.tags.push(primaryBiome.type);
        this.biomes.push(primaryBiome);
        if (_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.6) {
            // Choose a direction that isn't the same direction as the primary Biome's direction
            // Also cannot be a combined direction like north-east or south-west, must be one of the four cardinal directions or 'middle'
            let secondaryDirection;
            do {
                secondaryDirection = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.directions);
            } while (secondaryDirection.noun == primaryBiome.direction.noun ||
                secondaryDirection.noun.includes('-'));
            let secondaryBiome = {
                type: _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(availableBiomes),
                size: _data__WEBPACK_IMPORTED_MODULE_1__.Data.sizes[Math.floor(_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() * availableSizeIndex)],
                direction: secondaryDirection
            };
            // Add a second biome
            this.biomes.push(secondaryBiome);
            this.tags.push(secondaryBiome.type);
        }
    }
    determineRivers() {
        let pickRiverCount = { min: 0, max: 0 };
        switch (this.humidity) {
            case 'dry':
                pickRiverCount.min = 0;
                pickRiverCount.max = 2;
                break;
            case 'temperate':
                pickRiverCount.min = 1;
                pickRiverCount.max = 4;
                break;
            case 'wet':
                pickRiverCount.min = 3;
                pickRiverCount.max = 5;
                break;
        }
        let riverCount = Math.floor(_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand(pickRiverCount.min, pickRiverCount.max));
        // For small realms (less than 3 on the sizeIndex) there shouldn't be more than two rivers passing through
        if (this.sizeIndex < 3) {
            riverCount = Math.min(riverCount, 2);
        }
        // Add rivers
        for (let i = 0; i < riverCount; i++) {
            let flowsFrom;
            // If the realm contains a mountain biome, rivers should flow from it 60% of the time
            const mountainBiome = this.biomes.find((b) => b.type == 'mountains');
            if (mountainBiome && _util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.6) {
                flowsFrom = mountainBiome.direction;
            }
            let flowsTo;
            // If the realm contains a coast, rivers should flow to it 60% of the time
            if (this.coast && _util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.6) {
                flowsFrom = this.coastDirection;
            }
            do {
                flowsFrom = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.directions);
                flowsTo = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.directions);
            } while (flowsTo == flowsFrom ||
                flowsTo.noun == 'middle' ||
                flowsFrom.noun == 'middle');
            let riverName = this.determineRiverName();
            let tributaries = this.determineTributaries(riverName);
            let river = {
                name: riverName,
                flowsTo: flowsTo,
                flowsFrom: flowsFrom,
                tributaries: tributaries,
                prefix: null,
                stem: null
            };
            this.rivers.push(river);
        }
        let arr = [];
        for (let i = 0; i < 20; i++)
            arr.push(_util__WEBPACK_IMPORTED_MODULE_2__.Util.readWord(this.determineRiverName()));
    }
    determineTributaries(riverName) {
        let tributaries = [];
        const tributaryCount = Math.floor(_util__WEBPACK_IMPORTED_MODULE_2__.Util.rand(1, 4));
        for (let i = 0; i < tributaryCount; i++) {
            let tributary = {
                name: i == 0 && _util__WEBPACK_IMPORTED_MODULE_2__.Util.rand() < 0.6 ? riverName : this.determineRiverName(),
                flowsTo: _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.directions),
                flowsFrom: _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.directions),
                tributaries: [],
                prefix: null,
                stem: null
            };
            // If the tributary name is the same as the stem, choose a tributary prefix
            if (_util__WEBPACK_IMPORTED_MODULE_2__.Util.readWord(riverName) == _util__WEBPACK_IMPORTED_MODULE_2__.Util.readWord(tributary.name)) {
                tributary.prefix = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.tributaryNameParts.filter((namePart) => {
                    return namePart.tags.includes('tributary-prefix');
                }));
            }
            // Push to river tributary array (gets returned)
            tributaries.push(tributary);
            // Push to realm tributary array
            this.tributaries.push(tributary);
        }
        return tributaries;
    }
    areNamePartTagsValid(namePart) {
        let valid = true;
        // Have at least one matching tag if tagRule is OR
        if (namePart.tagRule == 'AND') {
            valid = namePart.tags.every((tag) => this.tags.includes(tag));
            if (!valid)
                return valid;
        }
        // Have all matching tags if tagRule is AND
        if (namePart.tagRule == 'OR') {
            valid = namePart.tags.some((tag) => this.tags.includes(tag));
            if (!valid)
                return valid;
        }
        return valid;
    }
    determineRiverName() {
        /**
         * Determine root
         */
        let validRoots = _data__WEBPACK_IMPORTED_MODULE_1__.Data.riverNameParts.concat(_data__WEBPACK_IMPORTED_MODULE_1__.Data.faunaNameParts)
            .concat(_data__WEBPACK_IMPORTED_MODULE_1__.Data.floraNameParts)
            .filter((namePart) => {
            // Root cannot be used by another river
            // Have at least one point as a root name part
            let valid = this.rivers.every((river) => river.name.root.name != namePart.name && namePart.asRoot > 0);
            if (!valid)
                return valid;
            valid = this.areNamePartTagsValid(namePart);
            if (!valid)
                return valid;
            return valid;
        });
        let root = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomWeightedValue(validRoots, (item) => item.asRoot);
        if (root.variations) {
            root.variations.push(root.name);
            root.name = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(root.variations);
        }
        /**
         * Determine suffix
         */
        let validSuffixes = _data__WEBPACK_IMPORTED_MODULE_1__.Data.riverNameParts.filter((namePart) => {
            // Have at least one point as a suffix name part
            // Have at least one matching tag
            return (namePart.asSuffix > 0 &&
                namePart.tags.some((tag) => this.tags.includes(tag)));
        });
        this.countRiverValidLoop = 0;
        let riverName;
        do {
            let suffix = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomWeightedValue(validSuffixes, (item) => item.asSuffix);
            if (suffix.variations) {
                suffix.variations.push(suffix.name);
                suffix.name = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(suffix.variations);
            }
            riverName = { root: root, suffix: suffix };
        } while (!this.isRiverNameValid(riverName));
        return riverName;
    }
    isRiverNameValid(r) {
        this.countRiverValidLoop++;
        if (this.countRiverValidLoop > 200) {
            // If you've tried 200 times to get a valid river name with the same root, abandon the root and start over
            console.log(`No valid river name found with root '${r.root.name}', rerolling root...`);
            return this.determineRiverName();
        }
        let valid = true;
        // Can't have two vowels next to each other
        if (_util__WEBPACK_IMPORTED_MODULE_2__.Util.endsWithVowel(r.root.name) &&
            _util__WEBPACK_IMPORTED_MODULE_2__.Util.startsWithVowel(r.suffix.name)) {
            valid = false;
        }
        // No two rivers or tributaries can have the same name
        const tributaryNames = this.tributaries
            .concat(this.rivers)
            .map((river) => _util__WEBPACK_IMPORTED_MODULE_2__.Util.readWord(river.name));
        if (tributaryNames.includes(_util__WEBPACK_IMPORTED_MODULE_2__.Util.readWord(r))) {
            valid = false;
        }
        return valid;
    }
    determineRealmName() {
        /**
         * Determine root
         */
        let validRoots = _data__WEBPACK_IMPORTED_MODULE_1__.Data.placeNameParts.concat(_data__WEBPACK_IMPORTED_MODULE_1__.Data.rulersNameParts)
            .concat(_data__WEBPACK_IMPORTED_MODULE_1__.Data.faunaNameParts)
            .concat(_data__WEBPACK_IMPORTED_MODULE_1__.Data.floraNameParts)
            .filter((namePart) => {
            let valid = namePart.asRoot > 0 && this.areNamePartTagsValid(namePart);
            if (!valid)
                return valid;
            return valid;
        });
        let root = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomWeightedValue(validRoots, (item) => item.asRoot);
        if (root.variations) {
            root.variations.push(root.name);
            root.name = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(root.variations);
        }
        /**
         * Determine suffix
         */
        let validSuffixes = _data__WEBPACK_IMPORTED_MODULE_1__.Data.placeNameParts.filter((namePart) => {
            // Have at least one point as a suffix name part
            // Have at least one matching tag
            let valid = namePart.asSuffix > 0 && this.areNamePartTagsValid(namePart);
            if (!valid)
                return valid;
            return valid;
        });
        do {
            let suffix = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomWeightedValue(validSuffixes, (item) => item.asSuffix);
            if (suffix.variations) {
                suffix.variations.push(suffix.name);
                suffix.name = _util__WEBPACK_IMPORTED_MODULE_2__.Util.randomValue(suffix.variations);
            }
            this.realmName = { root: root, suffix: suffix };
        } while (!this.isRealmNameValid(this.realmName));
    }
    isRealmNameValid(word) {
        let valid = true;
        // Root and suffix can't be the same
        if (word.root == word.suffix)
            return false;
        return valid;
    }
    determineCities() { }
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
    static rand(min = 0, max = 1) {
        Util.m_z = (36969 * (Util.m_z & 65535) + (Util.m_z >> 16)) & Util.mask;
        Util.m_w = (18000 * (Util.m_w & 65535) + (Util.m_w >> 16)) & Util.mask;
        let result = ((Util.m_z << 16) + (Util.m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result * (max - min) + min;
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
    // Returns an item from an array
    // The weight value is determined using the accessor function
    // randomWeightedValue<NamePart>(nameParts, item => item.asRoot)
    static randomWeightedValue(arr, accessor, log = false) {
        if (log)
            console.log(arr);
        // Get the max weight
        const max = arr.reduce((total, item) => {
            return total + accessor(item);
        }, 0);
        // Calculate a random number on the scale of max
        let weight = Util.rand() * max;
        // For each item in the array, decrement max by that item's weight
        let result;
        arr.some((item) => {
            weight -= accessor(item);
            result = item;
            return weight < 0;
        });
        return result;
    }
    // Tweet a realm
    static shareByTweet(realm) {
        let tweet = `Explore ${Util.capitalize(Util.readWord(realm.realmName))}, a ${realm.size} ${realm.parentEntityAdj} ${realm.governmentRank}.`;
        window.open('https://twitter.com/intent/tweet?url=' +
            window.location.href +
            '&text=' +
            tweet, '_blank');
    }
    // Capitalize first letter
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
    // Combines word parts into a string
    static readWord(word) {
        return word.root.name + word.suffix.name;
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
// Initial local preferences
const darkModeAtStart = localStorage.getItem('darkMode');
const isDarkModeAtStart = darkModeAtStart != null && darkModeAtStart == 'true';
isDarkModeAtStart ? _util__WEBPACK_IMPORTED_MODULE_0__.Util.toggleDarkMode() : null;
// Handle dark mode button
const btnToggleDarkMode = document.getElementById('btnToggleDarkMode');
btnToggleDarkMode.addEventListener('click', () => {
    _util__WEBPACK_IMPORTED_MODULE_0__.Util.toggleDarkMode();
});
// Handle start button
const btnStart = document.getElementById('btnStart');
btnStart.addEventListener('click', generateSeedAndStart);
// Handle copy button
const btnCopyLink = document.getElementById('btnCopyLink');
btnCopyLink.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    // Play copied animation
    btnCopyLink.querySelector('i').classList.remove('fa-copy');
    btnCopyLink.querySelector('i').classList.add('fa-check');
    btnCopyLink.querySelector('span').innerHTML = 'Copied!';
    btnCopyLink.setAttribute('disabled', 'true');
    btnCopyLink.querySelector('i').style.color = '#17b664';
    document.getElementById('labelShare').style.opacity = '0';
    setTimeout(() => {
        // Play copied animation
        btnCopyLink.querySelector('i').classList.remove('fa-check');
        btnCopyLink.querySelector('i').classList.add('fa-copy');
        btnCopyLink.querySelector('i').style.color = getComputedStyle(document.documentElement).getPropertyValue('--dark-text');
        btnCopyLink.querySelector('span').innerHTML = 'Copy link';
        btnCopyLink.removeAttribute('disabled');
    }, 2000);
});
btnCopyLink.addEventListener('mouseover', () => {
    if (btnCopyLink.hasAttribute('disabled'))
        return;
    document.getElementById('labelShare').innerHTML = window.location.href;
    document.getElementById('labelShare').style.top = '0';
    document.getElementById('labelShare').style.opacity = '1';
});
btnCopyLink.addEventListener('mouseout', () => {
    document.getElementById('labelShare').style.top = '0.4rem';
    document.getElementById('labelShare').style.opacity = '0';
});
// Handle tweet button
const btnShareTwitter = document.getElementById('btnShareTwitter');
btnShareTwitter.addEventListener('click', () => {
    _util__WEBPACK_IMPORTED_MODULE_0__.Util.shareByTweet(realm);
});
btnShareTwitter.addEventListener('mouseover', () => {
    if (btnShareTwitter.hasAttribute('disabled'))
        return;
    document.getElementById('labelShare').innerHTML =
        'Share this Realm on Twitter';
    document.getElementById('labelShare').style.top = '0';
    document.getElementById('labelShare').style.opacity = '1';
});
btnShareTwitter.addEventListener('mouseout', () => {
    document.getElementById('labelShare').style.top = '0.4rem';
    document.getElementById('labelShare').style.opacity = '0';
});
// Handle JSON button
const btnJson = document.getElementById('btnJson');
btnJson.addEventListener('click', () => {
    window.open(window.location.href + '&json', '_blank');
});
btnJson.addEventListener('mouseover', () => {
    if (btnJson.hasAttribute('disabled'))
        return;
    document.getElementById('labelShare').innerHTML =
        "View this Realm's JSON (opens a new tab)";
    document.getElementById('labelShare').style.top = '0';
    document.getElementById('labelShare').style.opacity = '1';
});
btnJson.addEventListener('mouseout', () => {
    document.getElementById('labelShare').style.top = '0.4rem';
    document.getElementById('labelShare').style.opacity = '0';
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
    // Is it json?
    const arr = window.location.href.match(/\?[a-z0-9,-]+.*\&(json)/);
    if (arr && arr.length > 1) {
        // JSON mode
        document.querySelector('body').classList.add('json-format');
        document.querySelector('body').innerHTML = JSON.stringify(realm, null, '  ');
        return;
    }
    updateView();
    // Delay intro animations
    const sectionEls = document.querySelectorAll('.container');
    sectionEls.forEach((node, index) => {
        const el = node;
        setTimeout(() => {
            el.classList.add('fade-in');
        }, 250 * index);
    });
    // testSnippets();
}
function testSnippets() {
    // Test Util.endsWith function
    for (let i = 0; i < 10; i++) {
        let str = _util__WEBPACK_IMPORTED_MODULE_0__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.words);
        console.log(`${str} ends with t? ${_util__WEBPACK_IMPORTED_MODULE_0__.Util.endsWith(str, 't')}`);
    }
}
function updateView() {
    // Choose a photo for the hero
    const heroEl = document.getElementById('hero');
    heroEl.setAttribute('style', `background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${determineHeroImageUrl()})`);
    // Blurbs
    applyBiomesBlurb();
    applyRiversBlurb();
    applyCoatBlurb();
    toggleVisibility('sigil-present-on-heraldry', realm.sigilPresentOnHeraldry);
    toggleVisibility('on-the-coast', realm.coast);
    // Words
    applyText('name', _util__WEBPACK_IMPORTED_MODULE_0__.Util.readWord(realm.realmName));
    applyText('government-rank', realm.governmentRank);
    applyText('parent-entity', realm.parentEntityName);
    applyText('parent-entity-adj', realm.parentEntityAdj);
    applyText('direction-within-parent-entity', realm.directionWithinParentEntity.noun);
    applyText('direction-adj-within-parent-entity', realm.directionWithinParentEntity.adj);
    applyText('coast-direction', realm.coastDirection.adj);
    applyText('capital-city', realm.capitalCityName);
    applyText('sigil-name', realm.sigilName);
    applyText('sigil-meaning', realm.sigilMeaning);
    applyText('size', realm.size);
    applyText('temperature', realm.temperature);
    applyText('humidity', realm.humidity);
    applyText('season-summer', realm.seasonSummer.join(', '));
    applyText('season-winter', realm.seasonWinter.join(', '));
    applyText('tincture1', realm.coat.tinctures[0].name, ' <span class="tincture tincture1-color"></span>');
    applyText('tincture2', realm.coat.tinctures[1].name, ' <span class="tincture tincture2-color"></span>');
    applyTinctureColors();
    applyIcon('sigil', realm.sigilIcon);
    // Utility
    replaceNumbers();
}
function determineHeroImageUrl() {
    // Todo use realm information to determine the image
    const validImages = _data__WEBPACK_IMPORTED_MODULE_1__.Data.heroImages.filter((u) => {
        return u.tags.some((tag) => realm.tags.includes(tag));
    })
        .map((j) => {
        return j.url;
    });
    // console.log(validImages);
    const image = _util__WEBPACK_IMPORTED_MODULE_0__.Util.randomValue(validImages);
    return image;
}
function applyText(query, text, app = '') {
    const els = document.querySelectorAll('span.' + query);
    els.forEach((node) => {
        const el = node;
        if (el.classList.contains('prepend-article')) {
            el.textContent = _util__WEBPACK_IMPORTED_MODULE_0__.Util.aOrAn(text) + ' ' + text + app;
        }
        else {
            el.innerHTML = text + app;
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
        text = `Much of <span class="name"></span> is occupied by a ${b.type} ecoregion.`;
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
        text = `The main river that flows through <span class="name"></span> is the <span class="capitalized">${_util__WEBPACK_IMPORTED_MODULE_0__.Util.readWord(r.name)}</span>. The <span class="capitalized">${_util__WEBPACK_IMPORTED_MODULE_0__.Util.readWord(r.name)}</span> starts in the ${r.flowsFrom.noun} and flows toward the ${r.flowsTo.noun}.`;
    }
    else {
        text = `<span class="word-number capitalized">${realm.rivers.length}</span> rivers pass through <span class="name"></span>: ${_util__WEBPACK_IMPORTED_MODULE_0__.Util.joinArrayWithAnd(realm.rivers.map((river) => {
            return `the <span class="capitalized">${_util__WEBPACK_IMPORTED_MODULE_0__.Util.readWord(river.name)}</span>`;
        }))}.`;
    }
    if (realm.tributaries.length > 0) {
        text +=
            '<br>Notable tributaries include the rivers ' +
                _util__WEBPACK_IMPORTED_MODULE_0__.Util.joinArrayWithAnd(realm.tributaries.map((tributary) => {
                    let prefix = tributary.prefix != null ? tributary.prefix.name + ' ' : '';
                    return `<span class="capitalized">${prefix}</span><span class="capitalized">${_util__WEBPACK_IMPORTED_MODULE_0__.Util.readWord(tributary.name)}</span>`;
                })) +
                '.';
    }
    const el = document.querySelector('.rivers-blurb');
    el.innerHTML = text;
}
function applyCoatBlurb() {
    let text = '';
    text = `<span>The design of <span class="name"></span>'s coat of arms resembles `;
    text += realm.coat.ordinary.description + `</span>.`;
    const el = document.querySelector('.coat-of-arms-blurb');
    el.innerHTML = text;
}
function applyTinctureColors() {
    const el1 = document.querySelector('.tincture1-color');
    if (el1)
        el1.style.backgroundColor = realm.coat.tinctures[0].color;
    const el2 = document.querySelector('.tincture2-color');
    if (el2)
        el2.style.backgroundColor = realm.coat.tinctures[1].color;
}
function replaceNumbers() {
    const els = document.querySelectorAll('.word-number');
    els.forEach((node) => {
        const el = node;
        el.textContent = _util__WEBPACK_IMPORTED_MODULE_0__.Util.wordFromNumber(Number.parseInt(el.textContent ? el.textContent : '0'));
    });
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map