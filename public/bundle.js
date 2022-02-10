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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Data\": () => (/* binding */ Data)\n/* harmony export */ });\nclass Data {\r\n    static setup() {\r\n        // Load names\r\n        fetch('./assets/presets/lang.json')\r\n            .then((response) => {\r\n            return response.json();\r\n        })\r\n            .then((data) => {\r\n            Data.lang = data;\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/data.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.ts\");\n/* harmony import */ var _realm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./realm */ \"./src/realm.ts\");\n\r\n\r\n/**\r\n * Hint: Use 'npm run build' from console to compile + watch the TS code on save\r\n */\r\n// Handle start button\r\nconst btnStart = document.getElementById('btnStart');\r\nbtnStart.addEventListener('click', start);\r\n// Load data\r\n_data__WEBPACK_IMPORTED_MODULE_0__.Data.setup();\r\n// Initialize variables\r\nlet realm;\r\n// Start the generation process\r\nfunction start() {\r\n    realm = new _realm__WEBPACK_IMPORTED_MODULE_1__.Realm();\r\n    updateView();\r\n}\r\nfunction updateView() {\r\n    // // Add the correct nation name\r\n    // const nationNameEls: NodeList = document.querySelectorAll('span.realm-name');\r\n    // nationNameEls.forEach((el) => {\r\n    //   el.textContent = realm.name;\r\n    // });\r\n    // Show the content and scroll to it\r\n    const contentEl = document.getElementById('content');\r\n    contentEl.classList.remove('d-none');\r\n    contentEl.scrollIntoView({ behavior: 'smooth' });\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/index.ts?");

/***/ }),

/***/ "./src/realm.ts":
/*!**********************!*\
  !*** ./src/realm.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Realm\": () => (/* binding */ Realm)\n/* harmony export */ });\nclass Realm {\r\n    constructor() {\r\n        this.name = 'green hollow';\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://ts-webpack/./src/realm.ts?");

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