/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

/**
 * Hint: Use 'npm run build' from console to compile + watch the TS code on save
 */
// Delay intro animations
const sectionEls = document.querySelectorAll('.container');
sectionEls.forEach((node, index) => {
    const el = node;
    setTimeout(() => {
        el.classList.add('fade-in');
    }, 100 * index);
});
const home = new HomePage();

/******/ })()
;
//# sourceMappingURL=bundle.js.map