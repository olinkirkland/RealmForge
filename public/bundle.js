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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Data\": () => (/* binding */ Data)\n/* harmony export */ });\nclass Data {\r\n    static setup() {\r\n        // Load names\r\n        fetch('./assets/data/content.json')\r\n            .then((response) => {\r\n            return response.json();\r\n        })\r\n            .then((data) => {\r\n            Data.content = data;\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/data.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.ts\");\n/* harmony import */ var _realm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./realm */ \"./src/realm.ts\");\n\r\n\r\n/**\r\n * Hint: Use 'npm run build' from console to compile + watch the TS code on save\r\n */\r\n// Handle start button\r\nconst btnStart = document.getElementById('btnStart');\r\nbtnStart.addEventListener('click', start);\r\n// Load data\r\n_data__WEBPACK_IMPORTED_MODULE_0__.Data.setup();\r\n// Initialize variables\r\nlet realm;\r\nstart();\r\n// Start the generation process\r\nfunction start() {\r\n    realm = new _realm__WEBPACK_IMPORTED_MODULE_1__.Realm();\r\n    updateView();\r\n}\r\nfunction updateView() {\r\n    // Apply values to view\r\n    applyText('name', realm.name);\r\n    applyText('government-rank', realm.governmentRank);\r\n    applyText('parent-entity', realm.parentEntityName);\r\n    applyText('direction-within-parent-entity', realm.directionWithinParentEntity);\r\n    applyText('capital-city', realm.capitalCityName);\r\n    // Show the content and scroll to it\r\n    const contentEl = document.getElementById('content');\r\n    contentEl.classList.remove('d-none');\r\n    contentEl.scrollIntoView({ behavior: 'smooth' });\r\n    // Change dice icon\r\n    const dice = ['one', 'two', 'three', 'four', 'five', 'six'];\r\n    const iconEl = document.querySelector('#btnStart > i');\r\n    dice.forEach((str) => {\r\n        iconEl.classList.remove('fa-dice-' + str);\r\n    });\r\n    iconEl.classList.add('fa-dice-' + dice[Math.floor(Math.random() * dice.length)]);\r\n}\r\nfunction applyText(query, text) {\r\n    const nationNameEls = document.querySelectorAll('span.' + query);\r\n    nationNameEls.forEach((node) => {\r\n        const el = node;\r\n        el.classList.add('keyword');\r\n        el.textContent = text;\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/index.ts?");

/***/ }),

/***/ "./src/realm.ts":
/*!**********************!*\
  !*** ./src/realm.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Realm\": () => (/* binding */ Realm)\n/* harmony export */ });\nclass Realm {\r\n    constructor() {\r\n        this.name = 'oldmarch';\r\n        this.adj = 'oldmarch';\r\n        this.capitalCityName = 'highbridge';\r\n        this.governmentRank = 'territory';\r\n        this.parentEntityName = 'the divine empire';\r\n        this.parentEntityAdj = 'imperial';\r\n        this.directionWithinParentEntity = 'south';\r\n        this.climate = 'temperate';\r\n        this.season = 'varied';\r\n        this.seasonSummer = ['long', 'harsh'];\r\n        this.seasonWinter = ['long', 'mild'];\r\n        this.regions = [];\r\n        this.coastal = false;\r\n        const directions = [\r\n            'north',\r\n            'east',\r\n            'south',\r\n            'west',\r\n            'north-east',\r\n            'south-east',\r\n            'north-west',\r\n            'south-west'\r\n        ];\r\n        this.directionWithinParentEntity =\r\n            directions[Math.floor(Math.random() * directions.length)];\r\n        // Choose geography and climate based on the direction\r\n        if (this.directionWithinParentEntity.includes('north')) {\r\n            this.climate = 'cold';\r\n        }\r\n        if (this.directionWithinParentEntity.includes('south')) {\r\n            this.climate = 'warm';\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/realm.ts?");

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