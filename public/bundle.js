/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data.ts":
/*!*********************!*\
  !*** ./src/data.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Data\": () => (/* binding */ Data)\n/* harmony export */ });\nclass Data {\r\n    static setup(callback) {\r\n        // Load names\r\n        fetch('./assets/data/content.json')\r\n            .then((response) => {\r\n            return response.json();\r\n        })\r\n            .then((data) => {\r\n            Data.parse(data);\r\n            callback();\r\n        });\r\n    }\r\n    static parse(u) {\r\n        Data.biomes = u.biomes;\r\n        Data.directions = u.directions;\r\n        Data.images = u.images;\r\n        Data.governmentRanks = u.governmentRanks;\r\n        Data.sigils = u.sigils;\r\n        Data.parentEntityDescriptorsBefore = u.parentEntities.descriptorsBefore;\r\n        Data.parentEntityDescriptorsAfter = u.parentEntities.descriptorsAfter;\r\n        Data.parentEntityGovernments = u.parentEntities.governments;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/data.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.ts\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./src/data.ts\");\n/* harmony import */ var _realm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./realm */ \"./src/realm.ts\");\n\r\n\r\n\r\n/**\r\n * Hint: Use 'npm run build' from console to compile + watch the TS code on save\r\n */\r\n// Handle start button\r\nconst btnStart = document.getElementById('btnStart');\r\nbtnStart.addEventListener('click', start);\r\n// Load data\r\n_data__WEBPACK_IMPORTED_MODULE_1__.Data.setup(start);\r\n// Initialize variables\r\nlet realm;\r\n// Start the generation process\r\nfunction start() {\r\n    realm = new _realm__WEBPACK_IMPORTED_MODULE_2__.Realm();\r\n    updateView();\r\n}\r\nfunction updateView() {\r\n    // Choose a photo for the hero\r\n    const heroEl = document.getElementById('hero');\r\n    heroEl.setAttribute('style', `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${determineHeroImageUrl()})`);\r\n    // Apply values to view\r\n    applyText('name', realm.name);\r\n    applyText('government-rank', realm.governmentRank);\r\n    applyText('parent-entity', realm.parentEntityName);\r\n    applyText('direction-within-parent-entity', realm.directionAdjWithinParentEntity);\r\n    applyText('capital-city', realm.capitalCityName);\r\n    applyText('sigil-name', realm.sigilName);\r\n    applyText('sigil-meaning', realm.sigilMeaning);\r\n    applyIcon('sigil', realm.sigilIcon);\r\n    // Show the content and scroll to it\r\n    const contentEl = document.getElementById('content');\r\n    contentEl.classList.remove('d-none');\r\n    contentEl.scrollIntoView({ behavior: 'smooth' });\r\n    // Change dice icon\r\n    const dice = ['one', 'two', 'three', 'four', 'five', 'six'];\r\n    const iconEl = document.querySelector('#btnStart > i');\r\n    dice.forEach((str) => {\r\n        iconEl.classList.remove('fa-dice-' + str);\r\n    });\r\n    iconEl.classList.add('fa-dice-' + dice[Math.floor(Math.random() * dice.length)]);\r\n}\r\nfunction determineHeroImageUrl() {\r\n    // Todo use realm information to determine the image\r\n    return _util__WEBPACK_IMPORTED_MODULE_0__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_1__.Data.images);\r\n}\r\nfunction applyText(query, text) {\r\n    const els = document.querySelectorAll('span.' + query);\r\n    els.forEach((node) => {\r\n        const el = node;\r\n        el.classList.add('keyword');\r\n        if (el.classList.contains('prepend-article'))\r\n            text = _util__WEBPACK_IMPORTED_MODULE_0__.Util.aOrAn(text) + ' ' + text;\r\n        el.textContent = text;\r\n    });\r\n}\r\nfunction applyIcon(query, icon) {\r\n    const els = document.querySelectorAll('i.' + query);\r\n    els.forEach((node) => {\r\n        const el = node;\r\n        // Remove the previous icon\r\n        el.classList.forEach((className) => {\r\n            if (className.includes('fa-') && className !== 'fa-2x') {\r\n                el.classList.remove(className);\r\n            }\r\n        });\r\n        el.classList.add('fa-' + icon);\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/index.ts?");

/***/ }),

/***/ "./src/realm.ts":
/*!**********************!*\
  !*** ./src/realm.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Realm\": () => (/* binding */ Realm)\n/* harmony export */ });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.ts\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.ts\");\n\r\n\r\nclass Realm {\r\n    constructor() {\r\n        this.name = 'oldmarch';\r\n        this.adj = 'oldmarch';\r\n        this.capitalCityName = 'highbridge';\r\n        this.governmentRank = 'territory';\r\n        this.leaderTitle = 'lord';\r\n        this.parentEntityName = 'the empire';\r\n        this.parentEntityAdj = 'imperial';\r\n        this.directionWithinParentEntity = 'south';\r\n        this.directionAdjWithinParentEntity = 'south';\r\n        this.climate = 'temperate';\r\n        this.season = 'varied';\r\n        this.seasonSummer = ['long', 'harsh'];\r\n        this.seasonWinter = ['long', 'mild'];\r\n        this.regions = [];\r\n        this.coastal = false;\r\n        this.sigilName = 'dove';\r\n        this.sigilIcon = 'dove';\r\n        this.sigilMeaning = 'peace';\r\n        this.determineParentEntity();\r\n        this.determineDirection();\r\n        this.determineGovernmentRank();\r\n        this.determineSigil();\r\n        // Choose geography and climate based on the direction\r\n        if (this.directionWithinParentEntity.includes('north')) {\r\n            this.climate = 'cold';\r\n        }\r\n        else if (this.directionWithinParentEntity.includes('south')) {\r\n            this.climate = 'warm';\r\n        }\r\n        else {\r\n            this.climate = 'temperate';\r\n        }\r\n    }\r\n    determineParentEntity() {\r\n        let arr = ['the'];\r\n        if (Math.random() < 0.8) {\r\n            let firstDescriptor = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityDescriptorsBefore);\r\n            arr.push(firstDescriptor);\r\n            if (Math.random() < 0.2) {\r\n                let secondDescriptor = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityDescriptorsBefore);\r\n                if (secondDescriptor != firstDescriptor)\r\n                    arr.push(secondDescriptor);\r\n            }\r\n        }\r\n        let government = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityGovernments);\r\n        this.parentEntityAdj = _data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityGovernments[government];\r\n        arr.push(government);\r\n        if (Math.random() < 0.1) {\r\n            arr.push(_util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.parentEntityDescriptorsAfter));\r\n        }\r\n        this.parentEntityName = arr.join(' ');\r\n    }\r\n    determineDirection() {\r\n        this.directionWithinParentEntity = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.directions);\r\n        this.directionAdjWithinParentEntity =\r\n            _data__WEBPACK_IMPORTED_MODULE_0__.Data.directions[this.directionWithinParentEntity];\r\n    }\r\n    determineGovernmentRank() {\r\n        this.governmentRank = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.governmentRanks);\r\n        this.leaderTitle = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.governmentRanks);\r\n    }\r\n    determineSigil() {\r\n        this.sigilName = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomKey(_data__WEBPACK_IMPORTED_MODULE_0__.Data.sigils);\r\n        this.sigilIcon = _data__WEBPACK_IMPORTED_MODULE_0__.Data.sigils[this.sigilName].icon;\r\n        this.sigilMeaning = _util__WEBPACK_IMPORTED_MODULE_1__.Util.randomValue(_data__WEBPACK_IMPORTED_MODULE_0__.Data.sigils[this.sigilName].meanings);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/realm.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Util\": () => (/* binding */ Util)\n/* harmony export */ });\nclass Util {\r\n    static randomKey(u) {\r\n        let keys = Object.keys(u);\r\n        let k = keys[Math.floor(Math.random() * keys.length)];\r\n        return k;\r\n    }\r\n    static randomValue(u) {\r\n        return u[Util.randomKey(u)];\r\n    }\r\n    static aOrAn(str) {\r\n        const regex = new RegExp('^[aeiou].*', 'i');\r\n        return regex.test(str) ? 'an' : 'a';\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/util.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;