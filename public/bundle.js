/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/HomePageController.ts":
/*!***********************************************!*\
  !*** ./src/controllers/HomePageController.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePageController)
/* harmony export */ });
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Rand */ "./src/util/Rand.ts");
/* harmony import */ var _util_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Lang */ "./src/util/Lang.ts");
/* harmony import */ var _util_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Util */ "./src/util/Util.ts");
/* harmony import */ var _PageController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PageController */ "./src/controllers/PageController.ts");
/* harmony import */ var _text_layout_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../text/layout.json */ "./src/text/layout.json");
/* harmony import */ var _text_Block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../text/Block */ "./src/text/Block.ts");






class HomePageController extends _PageController__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor() {
        super();
        // UI & Controls
        this.handleFavorites();
        this.handleNewRealmButton();
        this.handleCopyLinkButton();
        this.handleTweetButton();
        this.handleJSONButton();
        // Apply Content
        this.applyHeroImage();
        this.write();
    }
    applyHeroImage() {
        // Choose a photo for the hero
        const heroEl = document.getElementById('hero');
        heroEl.setAttribute('style', `background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${this.realm.heroImageUrl})`);
        // Apply the hero text
        const heroTextEl = document.querySelector('#hero > h2');
        heroTextEl.textContent = _util_Lang__WEBPACK_IMPORTED_MODULE_1__["default"].capitalize(_util_Lang__WEBPACK_IMPORTED_MODULE_1__["default"].readWord(this.realm.realmName.name));
    }
    write() {
        // Apply each block
        let blocks = [];
        _text_layout_json__WEBPACK_IMPORTED_MODULE_4__.forEach((b) => {
            blocks.push(new _text_Block__WEBPACK_IMPORTED_MODULE_5__["default"](this.realm, b.name, b.sections));
        });
        const el = document.getElementById('content');
        blocks.forEach((block) => {
            el.appendChild(block.render());
        });
    }
    handleNewRealmButton() {
        const btnStart = document.getElementById('btnStart');
        btnStart.addEventListener('click', () => {
            // This will refresh the page with a new seed
            _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].generateSeed();
            let url = window.location.href;
            url = url.substring(0, url.indexOf('?'));
            if (window.location.href)
                window.location.replace(url + '?' + _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seed);
        });
    }
    handleCopyLinkButton() {
        const btnCopyLink = document.getElementById('btnCopyLink');
        btnCopyLink.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            // Play copied animation
            btnCopyLink.innerHTML = `<i class="fa-solid fa-check" style="color: #17b664"></i>Copied!`;
            btnCopyLink.setAttribute('disabled', 'true');
            document.getElementById('labelShare').style.opacity = '0';
            setTimeout(() => {
                // Play copied animation
                btnCopyLink.innerHTML = `<i class="fa-solid fa-copy"></i>Copy Link`;
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
        btnCopyLink.addEventListener('mouseout', this.fadeOutShareLabel);
    }
    handleTweetButton() {
        const btnShareTwitter = document.getElementById('btnShareTwitter');
        btnShareTwitter.addEventListener('click', () => {
            _util_Util__WEBPACK_IMPORTED_MODULE_2__["default"].shareByTweet(this.realm);
        });
        btnShareTwitter.addEventListener('mouseover', () => {
            if (btnShareTwitter.hasAttribute('disabled'))
                return;
            document.getElementById('labelShare').innerHTML =
                'Share this Realm on Twitter';
            document.getElementById('labelShare').style.top = '0';
            document.getElementById('labelShare').style.opacity = '1';
        });
        btnShareTwitter.addEventListener('mouseout', this.fadeOutShareLabel);
    }
    handleJSONButton() {
        const btnJson = document.getElementById('btnJson');
        btnJson.addEventListener('click', () => {
            const url = window.location.href.replace(/(?<=.*)realm.html(?=.*)/, 'json.html');
            window.open(url, '_self');
        });
        btnJson.addEventListener('mouseover', () => {
            if (btnJson.hasAttribute('disabled'))
                return;
            document.getElementById('labelShare').innerHTML =
                "View this Realm's JSON data";
            document.getElementById('labelShare').style.top = '0';
            document.getElementById('labelShare').style.opacity = '1';
        });
        btnJson.addEventListener('mouseout', this.fadeOutShareLabel);
    }
    fadeInShareLabel() {
        document.getElementById('labelShare').style.top = '0';
        document.getElementById('labelShare').style.opacity = '1';
    }
    fadeOutShareLabel() {
        document.getElementById('labelShare').style.top = '0.4rem';
        document.getElementById('labelShare').style.opacity = '0';
    }
    handleFavorites() {
        // Get favorites from local storage
        if (!localStorage.getItem('favorites'))
            localStorage.setItem('favorites', JSON.stringify([]));
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        // Handle the favorites badges
        const favoritesEl = document.getElementById('favorites');
        favoritesEl.addEventListener('click', (event) => {
            const removeId = event.target.getAttribute('removeId');
            if (removeId) {
                favorites = favorites.filter((f) => f.id != removeId);
                event.preventDefault();
                localStorage.setItem('favorites', JSON.stringify(favorites));
                refreshFavorites();
            }
        });
        const btnFavorite = document.getElementById('btnFavorite');
        btnFavorite.addEventListener('click', () => {
            const f = {
                id: _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seed,
                name: _util_Lang__WEBPACK_IMPORTED_MODULE_1__["default"].readWord(this.realm.realmName.name)
            };
            if (!favorites.some((v) => f.id == v.id)) {
                favorites.push(f);
            }
            else {
                favorites = favorites.filter((v) => v.id != f.id);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            refreshFavorites();
        });
        const btnFavoriteIcon = document.querySelector('#btnFavorite i');
        const btnFavoriteText = document.querySelector('#btnFavorite span');
        // Do this the first time the page loads
        refreshFavorites();
        function refreshFavorites() {
            btnFavoriteIcon.classList.remove('fa-solid', 'fa-regular', 'selected');
            // Is the current realm already favorited?
            const isFavorite = favorites.some((f) => f.id == _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seed);
            btnFavoriteIcon.classList.add(isFavorite ? 'fa-solid' : 'fa-regular');
            btnFavoriteText.innerHTML = isFavorite
                ? 'This is one of your favorites'
                : 'Add this Realm to your favorites';
            // Create favorite badges
            favoritesEl.innerHTML = '';
            favorites.forEach((f) => {
                let url = window.location.href;
                url = url.substring(0, url.indexOf('?')) + '?' + f.id;
                favoritesEl.innerHTML += `
  <li class="favorite-badge">
    <a href="${url}" target="_self" class="btn btn--icon capitalized">${f.name}</a>
    <a class="btn btn--icon delete-favorite">
      <i class="fa-solid fa-xmark" removeId="${f.id}"></i>
    </a>
  </li>`;
            });
        }
    }
}


/***/ }),

/***/ "./src/controllers/JSONPageController.ts":
/*!***********************************************!*\
  !*** ./src/controllers/JSONPageController.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JSONPageController)
/* harmony export */ });
/* harmony import */ var _PageController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageController */ "./src/controllers/PageController.ts");

class JSONPageController extends _PageController__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
    }
}
// const jsonContainer: HTMLElement =
// document.querySelector('.container--json')!;
// if (arr && arr.length > 1) {
// // Show JSON
// jsonContainer.classList.remove('hidden');
// const jsonContent: HTMLElement = document.querySelector('.json-content')!;
// jsonContent.innerHTML =
//   '<pre class="json-format">' +
//   JSON.stringify(realm, null, '  ') +
//   '</pre>';
// handleJsonButtons();
// // Hide content
// const content: HTMLElement = document.querySelector('div.content')!;
// content.classList.add('hidden');
// applyText('name', Util.readWord(realm.realmName));
// } else {
// // Don't show JSON
// jsonContainer.innerHTML = '';
// updateView();
// }
// function handleJsonButtons() {
//   // Handle the Realm from JSON button
//   const btnToRealm: HTMLButtonElement = document.getElementById(
//     'btnToRealm'
//   )! as HTMLButtonElement;
//   btnToRealm.addEventListener('click', () => {
//     const arr: RegExpMatchArray | null = window.location.href.match(
//       /(.+\?[a-z0-9,-]+).*\&/
//     );
//     if (arr && arr.length > 1) {
//       window.open(arr[1], '_self');
//     }
//   });
//   btnToRealm.addEventListener('mouseover', () => {
//     if (btnJson.hasAttribute('disabled')) return;
//     document.getElementById('labelJson')!.innerHTML = 'View the Realm page';
//     fadeInJsonLabel();
//   });
//   btnToRealm.addEventListener('mouseout', fadeOutJsonLabel);
//   // Handle the Copy JSON button
//   const btnCopyJson: HTMLButtonElement = document.getElementById(
//     'btnCopyJson'
//   )! as HTMLButtonElement;
//   btnCopyJson.addEventListener('click', () => {
//     // Play copied animation
//     btnCopyJson.innerHTML = `<i class="fa-solid fa-check" style="color: orangered"></i>Copied!`;
//     btnCopyJson.setAttribute('disabled', 'true');
//     document.getElementById('labelJson')!.style.opacity = '0';
//     navigator.clipboard.writeText(JSON.stringify(realm, null, '  '));
//     setTimeout(() => {
//       // Play copied animation
//       btnCopyJson.innerHTML = `<i class="fa-solid fa-copy"></i>Copy JSON`;
//       btnCopyJson.removeAttribute('disabled');
//     }, 2000);
//   });
//   btnCopyJson.addEventListener('mouseover', () => {
//     if (btnCopyJson.hasAttribute('disabled')) return;
//     document.getElementById('labelJson')!.innerHTML =
//       'Copy this JSON to your clipboard';
//     fadeInJsonLabel();
//   });
//   btnCopyJson.addEventListener('mouseout', fadeOutJsonLabel);
//   // Handle the Download JSON button
//   const btnDownloadJson: HTMLButtonElement = document.getElementById(
//     'btnDownloadJson'
//   )! as HTMLButtonElement;
//   btnDownloadJson.addEventListener('click', () => {
//     var blob = new Blob([JSON.stringify(realm, null, '')], {
//       type: 'text/plain;charset=utf-8'
//     });
//     Util.download(
//       Util.readWord(realm.realmName) + '.json',
//       JSON.stringify(realm, null, '  ')
//     );
//   });
//   btnDownloadJson.addEventListener('mouseover', () => {
//     if (btnDownloadJson.hasAttribute('disabled')) return;
//     document.getElementById('labelJson')!.innerHTML =
//       'Download this JSON to a .json file';
//     fadeInJsonLabel();
//   });
//   btnDownloadJson.addEventListener('mouseout', fadeOutJsonLabel);
//   function fadeInJsonLabel() {
//     document.getElementById('labelJson')!.style.top = '0';
//     document.getElementById('labelJson')!.style.opacity = '1';
//   }
//   function fadeOutJsonLabel() {
//     document.getElementById('labelJson')!.style.top = '0.4rem';
//     document.getElementById('labelJson')!.style.opacity = '0';
//   }


/***/ }),

/***/ "./src/controllers/PageController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/PageController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PageController)
/* harmony export */ });
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Rand */ "./src/util/Rand.ts");
/* harmony import */ var _realm_Realm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../realm/Realm */ "./src/realm/Realm.ts");
/* harmony import */ var _util_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Util */ "./src/util/Util.ts");



class PageController {
    constructor() {
        this.handleDarkMode();
        this.handleSeed();
        // Realm generates itself
        this.realm = new _realm_Realm__WEBPACK_IMPORTED_MODULE_1__["default"]();
        console.log(this.realm);
        this.fadeInSections();
    }
    handleSeed() {
        const url = window.location.href;
        const arr = url.match(/\?([a-z0-9,-]+)/);
        if (arr && arr.length > 1) {
            _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seed = arr[1];
        }
        else {
            _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].generateSeed();
            let url = window.location.href;
            url = url.substring(0, url.indexOf('?'));
            if (window.location.href)
                window.location.replace(url + '?' + _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].seed);
            // Page refreshes here, forcing the first condition
        }
    }
    fadeInSections() {
        // Delay intro animations
        const sectionEls = document.querySelectorAll('.container');
        sectionEls.forEach((node, index) => {
            const el = node;
            setTimeout(() => {
                el.classList.add('fade-in');
            }, 100 * index);
        });
    }
    handleDarkMode() {
        // Initial local preferences
        const darkModeAtStart = localStorage.getItem('darkMode');
        const isDarkModeAtStart = darkModeAtStart != null && darkModeAtStart == 'true';
        isDarkModeAtStart ? _util_Util__WEBPACK_IMPORTED_MODULE_2__["default"].toggleDarkMode() : null;
        // Handle dark mode button
        const btnToggleDarkMode = document.getElementById('btnToggleDarkMode');
        btnToggleDarkMode.addEventListener('click', () => {
            _util_Util__WEBPACK_IMPORTED_MODULE_2__["default"].toggleDarkMode();
            // Add the background-transition class to the body if it's not already there
            const body = document.querySelector('body');
            if (!body.classList.contains('background-transition')) {
                body.classList.add('background-transition');
            }
        });
    }
}


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
        this.realm = realm;
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

/***/ "./src/modules/general/GovernmentModule.ts":
/*!*************************************************!*\
  !*** ./src/modules/general/GovernmentModule.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GovernmentModule)
/* harmony export */ });
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _governments_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./governments.json */ "./src/modules/general/governments.json");
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/Rand */ "./src/util/Rand.ts");



class GovernmentModule extends _Module__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(realm) {
        super(realm);
    }
    run() {
        // Government
        let government;
        do {
            government = _util_Rand__WEBPACK_IMPORTED_MODULE_2__["default"].pick(_governments_json__WEBPACK_IMPORTED_MODULE_1__.governments);
        } while (!government.size.includes(this.realm.size.sizeIndex));
        this.rank = government.rank;
        this.ruler = government.ruler;
        this.realm.tags.push(this.rank);
    }
}


/***/ }),

/***/ "./src/modules/general/HeraldryModule.ts":
/*!***********************************************!*\
  !*** ./src/modules/general/HeraldryModule.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HeraldryModule)
/* harmony export */ });
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _sigils_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sigils.json */ "./src/modules/general/sigils.json");
/* harmony import */ var _heraldry_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./heraldry.json */ "./src/modules/general/heraldry.json");
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Rand */ "./src/util/Rand.ts");




class HeraldryModule extends _Module__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(realm) {
        super(realm);
    }
    run() {
        // Sigil
        let sigil = _util_Rand__WEBPACK_IMPORTED_MODULE_3__["default"].pick(_sigils_json__WEBPACK_IMPORTED_MODULE_1__.sigils);
        sigil.meaning = _util_Rand__WEBPACK_IMPORTED_MODULE_3__["default"].pick(sigil.meaning);
        // Ordinary
        this.ordinary = _util_Rand__WEBPACK_IMPORTED_MODULE_3__["default"].weightedPick(_heraldry_json__WEBPACK_IMPORTED_MODULE_2__.ordinaries, (item) => item.points);
        // Choose exactly one metal tincture and one color tincture
        let metal = _util_Rand__WEBPACK_IMPORTED_MODULE_3__["default"].weightedPick(_heraldry_json__WEBPACK_IMPORTED_MODULE_2__.metalTinctures, (item) => item.points);
        let color = _util_Rand__WEBPACK_IMPORTED_MODULE_3__["default"].weightedPick(_heraldry_json__WEBPACK_IMPORTED_MODULE_2__.colorTinctures, (item) => item.points);
        this.tinctures = [metal, color].sort((t) => (_util_Rand__WEBPACK_IMPORTED_MODULE_3__["default"].next() > 0.5 ? 1 : -1));
        // Charge Layout
        const availableLayouts = _heraldry_json__WEBPACK_IMPORTED_MODULE_2__.layouts.filter((l) => this.ordinary.layouts.some((m) => m.name == l.name));
        this.chargeLayout =
            this.ordinary.layouts.length > 0
                ? _util_Rand__WEBPACK_IMPORTED_MODULE_3__["default"].weightedPick(availableLayouts, (l) => l.points)
                : null;
        if (!this.chargeLayout)
            return;
        // Charge tincture
        // Heraldic rule: Never put a color on another color
        // and never put a metal on top of another metal
        const tinctureOverlapIndexes = this.ordinary.layouts.find((l) => l.name == this.chargeLayout.name).overlap;
        let availableTinctures = _heraldry_json__WEBPACK_IMPORTED_MODULE_2__.metalTinctures;
        if (tinctureOverlapIndexes.length > 0) {
            const overlapTincture = this.tinctures[tinctureOverlapIndexes[0]];
            if (overlapTincture.type == 'color') {
                availableTinctures = _heraldry_json__WEBPACK_IMPORTED_MODULE_2__.colorTinctures;
            }
        }
        this.chargeTincture = _util_Rand__WEBPACK_IMPORTED_MODULE_3__["default"].pick(availableTinctures);
        // Pick a charge
        this.charge = _util_Rand__WEBPACK_IMPORTED_MODULE_3__["default"].weightedPick(_heraldry_json__WEBPACK_IMPORTED_MODULE_2__.charges, (item) => item.points);
        if (this.chargeLayout.count < 3) {
            this.charge = { name: sigil.name, points: 0, url: sigil.icon };
        }
        // Is it the sigil used on the heraldry? Add a tag if it is
        if (this.charge.name == sigil.name)
            this.realm.addTag('sigilAsCharge');
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
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/Rand */ "./src/util/Rand.ts");
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
        this.locationWithinParentEntity = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(Object.values(Direction));
        // Add direction tags south-west => south, west
        this.locationWithinParentEntity
            .split('-')
            .forEach((l) => this.realm.addTag(l));
        // 40% chance to be coastal
        if (_util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.4) {
            this.directionToCoast = this.locationWithinParentEntity;
            this.realm.addTag(_geography_BiomesModule__WEBPACK_IMPORTED_MODULE_1__.BiomeType.COAST);
        }
    }
    static isCardinalDirection(direction) {
        return !direction.includes('-');
    }
}


/***/ }),

/***/ "./src/modules/general/RealmNameModule.ts":
/*!************************************************!*\
  !*** ./src/modules/general/RealmNameModule.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RealmNameModule)
/* harmony export */ });
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/Rand */ "./src/util/Rand.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _place_names_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./place-names.json */ "./src/modules/general/place-names.json");



class RealmNameModule extends _Module__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(realm) {
        super(realm);
    }
    run() {
        // Roots cannot be used by an existing river
        const roots = [..._place_names_json__WEBPACK_IMPORTED_MODULE_2__.placeRoots];
        let validRoots = roots.filter((p) => this.realm.evaluateCondition(p.condition));
        const root = Object.assign({}, _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(validRoots, (item) => item.points));
        const suffixes = [..._place_names_json__WEBPACK_IMPORTED_MODULE_2__.placeSuffixes];
        let validSuffixes = suffixes.filter((p) => this.realm.evaluateCondition(p.condition));
        let suffix;
        do {
            suffix = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(validSuffixes, (item) => item.points);
            this.name = { root: root, suffix: suffix };
        } while (!this.isValidRealmName(this.name));
    }
    isValidRealmName(word) {
        let valid = true;
        // Root and suffix can't be the same
        if (word.root == word.suffix)
            return false;
        return valid;
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
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Rand */ "./src/util/Rand.ts");
/* harmony import */ var _util_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/Util */ "./src/util/Util.ts");
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
        let remainingSize = this.realm.size.sizeIndex + 1;
        if (this.realm.tags.includes(BiomeType.COAST)) {
            const coastBiome = {
                type: BiomeType.COAST,
                size: _util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].between(1, remainingSize, true),
                direction: this.realm.location.directionToCoast
            };
        }
        // Limit available biome types
        let availableBiomeTypes = Object.values(BiomeType).filter((biomeType) => {
            if (biomeType == BiomeType.COAST)
                return false;
            switch (this.realm.climate.humidity) {
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
            if (this.realm.climate.temperature == _ClimateModule__WEBPACK_IMPORTED_MODULE_4__.Temperature.WARM) {
                // Warm? Remove boreal-forest and tundra
                return ![BiomeType.BOREAL_FOREST, BiomeType.TUNDRA].includes(biomeType);
            }
            return true;
        });
        // Cannot be a combined direction like north-east or south-west, must be one of the four cardinal directions or 'middle'
        let availableDirections = Object.values(_general_LocationModule__WEBPACK_IMPORTED_MODULE_3__.Direction).filter((d) => d.split('-').length == 1);
        // Create some number of biomes
        while (remainingSize > 0 && availableBiomeTypes.length > 0) {
            let biomeSize = _util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].between(1, remainingSize, true);
            remainingSize -= biomeSize;
            let biomeType = _util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(availableBiomeTypes);
            availableBiomeTypes = _util_Util__WEBPACK_IMPORTED_MODULE_2__["default"].arrayRemove(availableBiomeTypes, biomeType);
            let biomeDirection = _util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(availableDirections);
            availableDirections = _util_Util__WEBPACK_IMPORTED_MODULE_2__["default"].arrayRemove(availableDirections, biomeDirection);
            const biome = {
                type: biomeType,
                size: biomeSize,
                direction: biomeDirection
            };
            this.biomes.push(biome);
            this.realm.addTag(biomeType);
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
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Rand */ "./src/util/Rand.ts");
/* harmony import */ var _util_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/Util */ "./src/util/Util.ts");
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
        if (this.realm.location.locationWithinParentEntity.includes(_general_LocationModule__WEBPACK_IMPORTED_MODULE_3__.Direction.NORTH)) {
            this.temperature =
                _util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].next() < 0.6 ? Temperature.COLD : Temperature.TEMPERATE;
        }
        else if (this.realm.location.locationWithinParentEntity.includes(_general_LocationModule__WEBPACK_IMPORTED_MODULE_3__.Direction.SOUTH)) {
            this.temperature =
                _util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].next() < 0.6 ? Temperature.WARM : Temperature.TEMPERATE;
        }
        else {
            this.temperature = Temperature.TEMPERATE;
        }
        this.realm.addTag(this.temperature);
        // Humidity
        if (this.realm.tags.includes('coast')) {
            this.humidity = Humidity.WET;
        }
        else {
            this.humidity = _util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(Object.values(Humidity));
        }
        this.realm.addTag(this.humidity);
        // Choose words to describe summer and winter
        this.summerAdjectives = this.chooseSeasonAdjectives(_season_descriptions_json__WEBPACK_IMPORTED_MODULE_4__.summer[this.temperature].concat(_season_descriptions_json__WEBPACK_IMPORTED_MODULE_4__.summer[this.humidity]));
        this.winterAdjectives = this.chooseSeasonAdjectives(_season_descriptions_json__WEBPACK_IMPORTED_MODULE_4__.winter[this.temperature].concat(_season_descriptions_json__WEBPACK_IMPORTED_MODULE_4__.winter[this.humidity]));
    }
    chooseSeasonAdjectives(adjectives) {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            const adjective = _util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(adjectives);
            arr.push(adjective);
            adjectives = _util_Util__WEBPACK_IMPORTED_MODULE_2__["default"].arrayRemove(adjectives, adjective);
            //  If the word is longer than 6 letters, step out of the loop
            //  Otherwise, 50% chance to step out of the loop
            if (_util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].next() < 0.5 || adjective.length > 6)
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
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/Rand */ "./src/util/Rand.ts");
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Module */ "./src/modules/Module.ts");
/* harmony import */ var _parent_entity_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parent-entity.json */ "./src/modules/geography/parent-entity.json");



class ParentEntityModule extends _Module__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(realm) {
        super(realm);
    }
    run() {
        const template = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(_parent_entity_json__WEBPACK_IMPORTED_MODULE_2__.templates);
        this.adjective = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(_parent_entity_json__WEBPACK_IMPORTED_MODULE_2__.adjectives);
        this.government = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(_parent_entity_json__WEBPACK_IMPORTED_MODULE_2__.governments);
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
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/Rand */ "./src/util/Rand.ts");
/* harmony import */ var _util_Util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Util */ "./src/util/Util.ts");
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
        switch (this.realm.climate.humidity) {
            case _ClimateModule__WEBPACK_IMPORTED_MODULE_5__.Humidity.DRY:
                riverCount = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].between(0, 2, true);
                break;
            case _ClimateModule__WEBPACK_IMPORTED_MODULE_5__.Humidity.WET:
                riverCount = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].between(2, 4, true);
        }
        // For small realms, there should only be one river
        if (this.realm.size.sizeIndex < 2) {
            riverCount = 1;
        }
        // Add rivers
        for (let i = 0; i < riverCount; i++)
            this.addNewRiver();
    }
    addNewRiver() {
        // Determine the directions (to and from) the river will flow
        // Rivers tend to flow from mountains towards coasts, so factor this in if those biomes are present
        const mountains = this.realm.biomes.biomes.find((b) => b.type == _BiomesModule__WEBPACK_IMPORTED_MODULE_4__.BiomeType.MOUNTAINS) ||
            null;
        const coast = this.realm.biomes.biomes.find((b) => b.type == _BiomesModule__WEBPACK_IMPORTED_MODULE_4__.BiomeType.COAST) || null;
        // Only use cardinal directions
        let availableDirections = Object.values(_general_LocationModule__WEBPACK_IMPORTED_MODULE_2__.Direction).filter((d) => _general_LocationModule__WEBPACK_IMPORTED_MODULE_2__["default"].isCardinalDirection(d) &&
            (!coast || d != coast.direction) &&
            (!mountains || d != mountains.direction));
        let flowsFrom = mountains && _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.8
            ? mountains.direction
            : _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(availableDirections);
        // Rivers can't flow to the same place they're flowing from
        _util_Util__WEBPACK_IMPORTED_MODULE_1__["default"].arrayRemove(availableDirections, flowsFrom);
        let flowsTo = coast
            ? coast.direction
            : _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].pick(availableDirections);
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
            this.realm.evaluateCondition(p.condition));
        let validSuffixes = _river_names_json__WEBPACK_IMPORTED_MODULE_6__.riverSuffixes.filter((p) => this.realm.evaluateCondition(p.condition));
        let riverName;
        do {
            let root = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(validRoots, (item) => item.points);
            let suffix = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(validSuffixes, (item) => item.points);
            riverName = { root: root, suffix: suffix };
        } while (!this.isValidRiverName(riverName));
        return riverName;
    }
    getTributaries(riverName) {
        let tributaries = [];
        const tributaryCount = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].between(0, 3);
        for (let i = 0; i < tributaryCount; i++) {
            const tributaryName = i == 0 && _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.6 ? riverName : this.getRiverName();
            // If the tributary name is the same as the stem, choose a tributary prefix and/or suffix
            let prefix = null;
            let suffix = null;
            do {
                if (riverName == tributaryName) {
                    do {
                        if (_util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.3)
                            prefix = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(_river_names_json__WEBPACK_IMPORTED_MODULE_6__.tributaryPrefixes, (item) => item.points);
                        if (_util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() < 0.3)
                            suffix = _util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].weightedPick(_river_names_json__WEBPACK_IMPORTED_MODULE_6__.tributarySuffixes, (item) => item.points);
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
            if (_util_Rand__WEBPACK_IMPORTED_MODULE_0__["default"].next() >= chance)
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
        if (_util_Util__WEBPACK_IMPORTED_MODULE_1__["default"].endsWithVowel(riverName.root.text) &&
            _util_Util__WEBPACK_IMPORTED_MODULE_1__["default"].startsWithVowel(riverName.suffix.text)) {
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
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Rand */ "./src/util/Rand.ts");


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
        this.size = _util_Rand__WEBPACK_IMPORTED_MODULE_1__["default"].pick(Object.values(Size));
        this.realm.addTag(this.size == Size.VERY_SMALL ? 'city' : 'region');
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
/* harmony import */ var _modules_general_HeraldryModule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/general/HeraldryModule */ "./src/modules/general/HeraldryModule.ts");
/* harmony import */ var _modules_general_GovernmentModule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../modules/general/GovernmentModule */ "./src/modules/general/GovernmentModule.ts");
/* harmony import */ var _modules_general_RealmNameModule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../modules/general/RealmNameModule */ "./src/modules/general/RealmNameModule.ts");
/* harmony import */ var _hero_images_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hero-images.json */ "./src/realm/hero-images.json");
/* harmony import */ var _util_Rand__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/Rand */ "./src/util/Rand.ts");











class Realm {
    constructor() {
        // Tags
        this._tags = [];
        this.runModules();
    }
    runModules() {
        console.log(_util_Rand__WEBPACK_IMPORTED_MODULE_10__["default"].next());
        this.size = new _modules_geography_SizeModule__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        this.location = new _modules_general_LocationModule__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        this.parentEntity = new _modules_geography_ParentEntityModule__WEBPACK_IMPORTED_MODULE_2__["default"](this);
        this.climate = new _modules_geography_ClimateModule__WEBPACK_IMPORTED_MODULE_3__["default"](this);
        this.biomes = new _modules_geography_BiomesModule__WEBPACK_IMPORTED_MODULE_4__["default"](this);
        this.rivers = new _modules_geography_RiversModule__WEBPACK_IMPORTED_MODULE_5__["default"](this);
        this.heraldry = new _modules_general_HeraldryModule__WEBPACK_IMPORTED_MODULE_6__["default"](this);
        this.government = new _modules_general_GovernmentModule__WEBPACK_IMPORTED_MODULE_7__["default"](this);
        this.realmName = new _modules_general_RealmNameModule__WEBPACK_IMPORTED_MODULE_8__["default"](this);
        this.heroImageUrl = this.pickHeroImage();
    }
    pickHeroImage() {
        const validImages = _hero_images_json__WEBPACK_IMPORTED_MODULE_9__.filter((u) => {
            return this.evaluateCondition(u.condition);
        });
        return 'assets/images/hero/' + _util_Rand__WEBPACK_IMPORTED_MODULE_10__["default"].pick(validImages).url;
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

/***/ "./src/text/Block.ts":
/*!***************************!*\
  !*** ./src/text/Block.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Block)
/* harmony export */ });
/* harmony import */ var _util_Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Lang */ "./src/util/Lang.ts");
/* harmony import */ var _Section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Section */ "./src/text/Section.ts");


class Block {
    constructor(realm, name, sectionNames) {
        this.realm = realm;
        this.name = name;
        this.sections = sectionNames.map((sectionName) => this.createSection(sectionName));
    }
    createSection(sectionName) {
        return new _Section__WEBPACK_IMPORTED_MODULE_1__["default"](this.realm, sectionName);
    }
    render() {
        const el = document.createElement('article');
        // Title
        const titleEl = document.createElement('h2');
        titleEl.textContent = _util_Lang__WEBPACK_IMPORTED_MODULE_0__["default"].capitalize(this.name);
        el.appendChild(titleEl);
        // Sections
        const sectionListEl = document.createElement('ul');
        el.appendChild(sectionListEl);
        this.sections.forEach((section) => {
            sectionListEl.appendChild(section.render());
        });
        return el;
    }
}


/***/ }),

/***/ "./src/text/Section.ts":
/*!*****************************!*\
  !*** ./src/text/Section.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Section)
/* harmony export */ });
/* harmony import */ var _util_Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Lang */ "./src/util/Lang.ts");

class Section {
    constructor(realm, name) {
        this.realm = realm;
        this.name = name;
    }
    render() {
        const el = document.createElement('li');
        // Title
        const titleEl = document.createElement('h3');
        titleEl.textContent = this.name;
        el.appendChild(titleEl);
        // Placeholder content
        const textEl = document.createElement('p');
        textEl.textContent = _util_Lang__WEBPACK_IMPORTED_MODULE_0__["default"].lorem();
        el.append(textEl);
        return el;
    }
}


/***/ }),

/***/ "./src/util/Lang.ts":
/*!**************************!*\
  !*** ./src/util/Lang.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

var _number_words_json__WEBPACK_IMPORTED_MODULE_1___namespace_cache;
var _lorem_words_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lang)
/* harmony export */ });
/* harmony import */ var _lorem_words_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lorem-words.json */ "./src/util/lorem-words.json");
/* harmony import */ var _number_words_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number-words.json */ "./src/util/number-words.json");
/* harmony import */ var _Rand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Rand */ "./src/util/Rand.ts");



class Lang {
    // Convert an instance of Word into a string
    static readWord(word) {
        return word.root.text + word.suffix.text;
    }
    // Capitalize first letter
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
    // Returns any number lower than 20 as a word ('one', 'two', ... 'nineteen')
    static wordFromNumber(n) {
        return n < _number_words_json__WEBPACK_IMPORTED_MODULE_1__.length ? /*#__PURE__*/ (_number_words_json__WEBPACK_IMPORTED_MODULE_1___namespace_cache || (_number_words_json__WEBPACK_IMPORTED_MODULE_1___namespace_cache = __webpack_require__.t(_number_words_json__WEBPACK_IMPORTED_MODULE_1__, 2)))[n] : n.toString();
    }
    // Quick and dirty placeholder text
    static lorem() {
        let str = '';
        for (let i = 1; i < 3; i++) {
            const words = _Rand__WEBPACK_IMPORTED_MODULE_2__["default"].between(3, 10);
            let arr = [];
            for (let j = 0; j < words; j++) {
                arr.push(_Rand__WEBPACK_IMPORTED_MODULE_2__["default"].pick(/*#__PURE__*/ (_lorem_words_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_lorem_words_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_lorem_words_json__WEBPACK_IMPORTED_MODULE_0__, 2)))));
            }
            str += [Lang.capitalize(_Rand__WEBPACK_IMPORTED_MODULE_2__["default"].pick(/*#__PURE__*/ (_lorem_words_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_lorem_words_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_lorem_words_json__WEBPACK_IMPORTED_MODULE_0__, 2))))), ...arr].join(' ') + '. ';
        }
        return str;
    }
}


/***/ }),

/***/ "./src/util/Rand.ts":
/*!**************************!*\
  !*** ./src/util/Rand.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

var _seed_words_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rand)
/* harmony export */ });
/* harmony import */ var _seed_words_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./seed-words.json */ "./src/util/seed-words.json");

class Rand {
    static generateSeed() {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            // Don't use a seeded value to generate the seed
            arr.push(/*#__PURE__*/ (_seed_words_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_seed_words_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_seed_words_json__WEBPACK_IMPORTED_MODULE_0__, 2)))[Math.floor(Math.random() * _seed_words_json__WEBPACK_IMPORTED_MODULE_0__.length)]);
        }
        Rand.seed = arr.join('-');
    }
    static get seed() {
        return this._seed;
    }
    static set seed(value) {
        this._seed = value;
        let h = 1779033703 ^ Rand.seed.length;
        for (var i = 0; i < Rand.seed.length; i++) {
            h = Math.imul(h ^ Rand.seed.charCodeAt(i), 3432918353);
            h = (h << 13) | (h >>> 19);
        }
        Rand.m_w = (123456789 + h) & Rand.mask;
        Rand.m_z = (987654321 - h) & Rand.mask;
    }
    static next() {
        return Rand.between(0, 1);
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

/***/ "./src/util/Util.ts":
/*!**************************!*\
  !*** ./src/util/Util.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/util/Lang.ts");

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
    static shareByTweet(realm) {
        let tweet = `Explore ${_Lang__WEBPACK_IMPORTED_MODULE_0__["default"].capitalize(_Lang__WEBPACK_IMPORTED_MODULE_0__["default"].readWord(realm.realmName.name))}, a ${realm.size} ${realm.parentEntity.adjective} ${realm.government.rank}.`;
        window.open('https://twitter.com/intent/tweet?url=' +
            window.location.href +
            '&text=' +
            tweet, '_blank');
    }
}
Util.isDarkMode = false;


/***/ }),

/***/ "./src/modules/general/governments.json":
/*!**********************************************!*\
  !*** ./src/modules/general/governments.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"governments":[{"rank":"free city","ruler":"mayor","size":[0]},{"rank":"lordship","ruler":"lord","size":[1]},{"rank":"county","ruler":"count","size":[1]},{"rank":"principality","ruler":"prince","size":[1,2]},{"rank":"duchy","ruler":"duke","size":[3,4]},{"rank":"territory","ruler":"lord","size":[4]},{"rank":"electorate","ruler":"elector","size":[4]}]}');

/***/ }),

/***/ "./src/modules/general/heraldry.json":
/*!*******************************************!*\
  !*** ./src/modules/general/heraldry.json ***!
  \*******************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"charges":[{"name":"ring","points":10,"url":"ring"},{"name":"flower","points":10,"url":"spa"},{"name":"cross","points":10,"url":"cross"},{"name":"star","points":10,"url":"star"},{"name":"tower","points":10,"url":"chess-rook"},{"name":"circle","points":10,"url":"circle"},{"name":"crown","points":10,"url":"chess-queen"},{"name":"apple","points":10,"url":"apple-whole"},{"name":"bell","points":10,"url":"bell"}],"layouts":[{"name":"single-center-lg","count":1,"size":"2xl","points":40,"description":"Positioned in the center is a large <span class=\\"tincture-charge\\"></span> <span class=\\"charge-name\\"></span>."},{"name":"single-center","count":1,"size":"","points":10,"description":"Positioned in the center is a <span class=\\"tincture-charge\\"></span> <span class=\\"charge-name\\"></span>."},{"name":"single-center-raised","count":1,"size":"","points":10,"description":"Positioned in the center is a <span class=\\"tincture-charge\\"></span> <span class=\\"charge-name\\"></span>."},{"name":"single-corner","count":1,"size":"","points":10,"description":"Positioned in the top-left corner is a <span class=\\"tincture-charge\\"></span> <span class=\\"charge-name\\"></span>."},{"name":"double","count":2,"size":"lg","points":10,"description":"Positioned in the center is a column containing two <span class=\\"tincture-charge\\"></span> <span class=\\"charge-name\\"></span>s."},{"name":"triple-spaced","count":3,"size":"","points":10,"description":"Three <span class=\\"tincture-charge\\"></span> <span class=\\"charge-name\\"></span>s are evenly spaced in the corners of the design."},{"name":"triple-top","count":3,"size":"","points":10,"description":"Three <span class=\\"tincture-charge\\"></span> <span class=\\"charge-name\\"></span>s are positioned in a row at the top of the design."},{"name":"triple-center-row","count":3,"size":"","points":10,"description":"Three <span class=\\"tincture-charge\\"></span> <span class=\\"charge-name\\"></span>s are positioned in a row at the center of the design."},{"name":"triple-center-col","count":3,"size":"","points":10,"description":"Three <span class=\\"tincture-charge\\"></span> <span class=\\"charge-name\\"></span>s are positioned in a column at the center of the design."}],"ordinaries":[{"name":"","points":10,"description":"a <span class=\\"tincture-primary\\"></span> field","layouts":[{"name":"single-center-lg","overlap":[0]},{"name":"double","overlap":[0]},{"name":"triple-spaced","overlap":[0]}],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0}]},{"name":"pale","points":10,"description":"a centered, vertical, <span class=\\"tincture-primary\\"></span> stripe on a <span class=\\"tincture-secondary\\"></span> field","layouts":[{"name":"single-center","overlap":[1]},{"name":"triple-center-col","overlap":[1]}],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0},{"path":"M 4.5 0 h 3 v 12 h -3 V 0","tinctureIndex":1}]},{"name":"fess","points":10,"description":"a centered, horizontal, <span class=\\"tincture-primary\\"></span> stripe on a <span class=\\"tincture-secondary\\"></span> field","layouts":[{"name":"single-center","overlap":[1]},{"name":"triple-center-row","overlap":[1]}],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0},{"path":"M 0 4.5 H 12 v 3 H 0 v -3","tinctureIndex":1}]},{"name":"chevron","points":10,"description":"a centered, <span class=\\"tincture-primary\\"></span> chevron on a <span class=\\"tincture-secondary\\"></span> field","layouts":[{"name":"triple-spaced","overlap":[0,1]}],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0},{"path":"M 0 6.7 l 6 -2 l 6 2 v 2 l -6 -2 l -6 2 v -2","tinctureIndex":1}]},{"name":"bend","points":10,"description":"a diagonal, <span class=\\"tincture-primary\\"></span> stripe on a <span class=\\"tincture-secondary\\"></span> field","layouts":[],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0},{"path":"M 0 0 H 3 L 12 10 h -3 L 0 0","tinctureIndex":1}]},{"name":"chief","points":10,"description":"a horizontal, <span class=\\"tincture-primary\\"></span> stripe positioned at the top of a <span class=\\"tincture-secondary\\"></span> field","layouts":[{"name":"triple-top","overlap":[0]}],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":1},{"path":"M 0 0 v 4.5 h 12 v -4.5 H 0","tinctureIndex":0}]},{"name":"per pale","points":10,"description":"a vertically partitioned, <span class=\\"tincture-primary\\"></span> and <span class=\\"tincture-secondary\\"></span> field","layouts":[{"name":"single-center-lg","overlap":[0,1]},{"name":"double","overlap":[0,1]}],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0},{"path":"M 6 0 H 12 V 12 h -6 V 0","tinctureIndex":1}]},{"name":"per fess","points":10,"description":"a horizontally partitioned, <span class=\\"tincture-primary\\"></span> and <span class=\\"tincture-secondary\\"></span> field","layouts":[{"name":"single-center-lg","overlap":[0,1]},{"name":"double","overlap":[0,1]}],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0},{"path":"M 0 6 H 12 v 6 H 0 v -6","tinctureIndex":1}]},{"name":"per chevron","points":10,"description":"a chevron-shaped, horizontally partitioned, <span class=\\"tincture-primary\\"></span> and <span class=\\"tincture-secondary\\"></span> field","layouts":[{"name":"single-center-lg","overlap":[1]},{"name":"triple-center-row","overlap":[1]}],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0},{"path":"M 0 6 L 6 3 L 12 6 v 9 H 0 V 6","tinctureIndex":1}]},{"name":"pile","points":10,"description":"an upside-down, <span class=\\"tincture-primary\\"></span> triangle positioned at the top of a <span class=\\"tincture-secondary\\"></span> field","layouts":[{"name":"single-center-raised","overlap":[1]}],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0},{"path":"M 2 0 L 6 10 L 10 0 H 2","tinctureIndex":1}]},{"name":"saltire","points":10,"description":"a <span class=\\"tincture-primary\\"></span> diagonal-cross on a <span class=\\"tincture-secondary\\"></span> field","layouts":[],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":1},{"path":"M 0 1 h 3 l 9 10 h -3 l -9 -10","tinctureIndex":0},{"path":"M 12 1 h -3 l -9 10 h 3 l 9 -10","tinctureIndex":0}]},{"name":"cross","points":10,"description":"a <span class=\\"tincture-primary\\"></span> cross on a <span class=\\"tincture-secondary\\"></span> field","layouts":[],"svg":[{"path":"M 0 0 H 12 V 12 H 0 V 0","tinctureIndex":0},{"path":"M 0 4 h 12 v 2 h -12 v -2","tinctureIndex":1},{"path":"M 5 0 h 2 v 12 h -2 v -12","tinctureIndex":1}]}],"metalTinctures":[{"type":"metal","name":"silver","color":"#dfe6d0","points":5},{"type":"metal","name":"gold","color":"#d5ab5b","points":5}],"colorTinctures":[{"type":"color","name":"red","color":"#e44747","points":5},{"type":"color","name":"black","color":"#454141","points":5},{"type":"color","name":"blue","color":"#6b75e2","points":5},{"type":"color","name":"violet","color":"#895cca","points":2},{"type":"color","name":"green","color":"#90ac5f","points":5},{"type":"color","name":"mulberry","color":"#d06ea3","points":1}]}');

/***/ }),

/***/ "./src/modules/general/place-names.json":
/*!**********************************************!*\
  !*** ./src/modules/general/place-names.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"placeRoots":[{"text":"blau","condition":"","points":1},{"text":"weißen","condition":"","points":1},{"text":"weiß","condition":"","points":1},{"text":"braun","condition":"","points":1},{"text":"schwarz","condition":"","points":1},{"text":"roth","condition":"","points":2},{"text":"rot","condition":"","points":2},{"text":"grün","condition":"","points":2},{"text":"hellen","condition":"","points":1},{"text":"hell","condition":"","points":1},{"text":"silber","condition":"","points":1},{"text":"gold","condition":"","points":2},{"text":"sieg","condition":"","points":1},{"text":"heu","condition":"","points":1},{"text":"frei","condition":"","points":10},{"text":"steig","condition":"","points":1},{"text":"straß","condition":"","points":1},{"text":"lauten","condition":"","points":3},{"text":"laut","condition":"","points":3},{"text":"glücks","condition":"","points":1},{"text":"glück","condition":"","points":1},{"text":"horn","condition":"","points":1},{"text":"lüben","condition":"","points":3},{"text":"lüb","condition":"","points":3},{"text":"alten","condition":"","points":10},{"text":"alt","condition":"","points":10},{"text":"neu","condition":"","points":10},{"text":"hohen","condition":"","points":3},{"text":"hoch","condition":"","points":3},{"text":"nieder","condition":"","points":5},{"text":"eng","condition":"","points":2},{"text":"breit","condition":"","points":1},{"text":"hart","condition":"","points":1},{"text":"nord","condition":"","points":10},{"text":"ost","condition":"","points":10},{"text":"süd","condition":"","points":10},{"text":"west","condition":"","points":10},{"text":"ober","condition":"","points":10},{"text":"unter","condition":"","points":10},{"text":"wald","condition":"","points":10},{"text":"berg","condition":"","points":10},{"text":"fels","condition":"","points":1},{"text":"stein","condition":"","points":6},{"text":"land","condition":"","points":6},{"text":"bach","condition":"","points":1},{"text":"feld","condition":"","points":2},{"text":"erz","condition":"","points":1},{"text":"weid","condition":"","points":3},{"text":"heid","condition":"","points":3},{"text":"furt","condition":"","points":1},{"text":"eisen","condition":"","points":10},{"text":"eis","condition":"","points":10},{"text":"becken","condition":"","points":1},{"text":"beck","condition":"","points":1},{"text":"brücken","condition":"","points":1},{"text":"bruck","condition":"","points":1},{"text":"mühl","condition":"","points":10},{"text":"burg","condition":"","points":10},{"text":"burg","condition":"","points":10},{"text":"markt","condition":"","points":3},{"text":"brunnen","condition":"","points":1},{"text":"brunn","condition":"","points":1},{"text":"kirch","condition":"","points":1},{"text":"kirchen","condition":"","points":1},{"text":"heim","condition":"","points":3},{"text":"hof","condition":"","points":10},{"text":"hall","condition":"","points":6},{"text":"eck","condition":"","points":5},{"text":"ing","condition":"","points":2},{"text":"zell","condition":"","points":2},{"text":"egg","condition":"","points":4}],"placeSuffixes":[{"text":"gold","condition":"","points":1},{"text":"horn","condition":"","points":10},{"text":"alten","condition":"","points":1},{"text":"alt","condition":"","points":1},{"text":"neu","condition":"","points":1},{"text":"eng","condition":"","points":1},{"text":"breit","condition":"","points":1},{"text":"hart","condition":"","points":1},{"text":"wald","condition":"","points":30},{"text":"berg","condition":"","points":20},{"text":"fels","condition":"","points":20},{"text":"stein","condition":"","points":20},{"text":"land","condition":"","points":2},{"text":"bach","condition":"","points":10},{"text":"feld","condition":"","points":3},{"text":"erz","condition":"","points":1},{"text":"weid","condition":"","points":1},{"text":"heid","condition":"","points":1},{"text":"tal","condition":"","points":10},{"text":"furt","condition":"","points":10},{"text":"eisen","condition":"","points":3},{"text":"eis","condition":"","points":3},{"text":"becken","condition":"","points":10},{"text":"beck","condition":"","points":10},{"text":"brücken","condition":"","points":4},{"text":"bruck","condition":"","points":4},{"text":"mühl","condition":"","points":20},{"text":"burg","condition":"","points":30},{"text":"burg","condition":"","points":3},{"text":"markt","condition":"","points":20},{"text":"stadt","condition":"","points":20},{"text":"brunnen","condition":"","points":10},{"text":"brunn","condition":"","points":10},{"text":"garten","condition":"","points":1},{"text":"kirch","condition":"","points":10},{"text":"kirchen","condition":"","points":10},{"text":"hafen","condition":"","points":50},{"text":"heim","condition":"","points":30},{"text":"hof","condition":"","points":10},{"text":"hall","condition":"","points":3},{"text":"eck","condition":"","points":10},{"text":"ing","condition":"","points":40},{"text":"ingen","condition":"","points":30},{"text":"zell","condition":"","points":10},{"text":"egg","condition":"","points":10},{"text":"dorf","condition":"","points":40},{"text":"hausen","condition":"","points":10}]}');

/***/ }),

/***/ "./src/modules/general/sigils.json":
/*!*****************************************!*\
  !*** ./src/modules/general/sigils.json ***!
  \*****************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"sigils":[{"name":"stallion","icon":"chess-knight","meaning":["strength","courage"]},{"name":"dove","icon":"dove","meaning":["peace","wisdom"]},{"name":"quill","icon":"feather-pointed","meaning":["loyalty","courage"]},{"name":"cat","icon":"cat","meaning":["sharp wits","ferocity"]},{"name":"cross","icon":"cross","meaning":["virtue","purity","piety"]},{"name":"eye","icon":"eye","meaning":["vigilance","perception"]},{"name":"tower","icon":"chess-rook","meaning":["strength","solidarity"]},{"name":"crown","icon":"chess-king","meaning":["loyalty","royal lineage"]},{"name":"holly plant","icon":"holly-berry","meaning":["heritage","family"]},{"name":"closed fist","icon":"hand-fist","meaning":["unity","willpower"]},{"name":"snowflake","icon":"snowflake","meaning":["beauty","charm"]},{"name":"heart","icon":"heart","meaning":["health","strength"]},{"name":"sun","icon":"sun","meaning":["harvest","honesty"]},{"name":"jewel","icon":"gem","meaning":["wealth","value"]},{"name":"skull","icon":"skull","meaning":["valor","ruthlessness"]}]}');

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

/***/ }),

/***/ "./src/realm/hero-images.json":
/*!************************************!*\
  !*** ./src/realm/hero-images.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"url":"boreal-forest-1.png","condition":"t.borealForest"},{"url":"boreal-forest-2.png","condition":"t.borealForest"},{"url":"temperate-forest-1.png","condition":"t.temperateForest"},{"url":"city-1.png","condition":""},{"url":"city-2.png","condition":""},{"url":"city-3.png","condition":""},{"url":"city-cold.png","condition":"t.cold"},{"url":"grassland-1.png","condition":"t.grassland"},{"url":"grassland-2.jpg","condition":"t.grassland"},{"url":"mountains-1.png","condition":"t.mountains"},{"url":"mountains-2.png","condition":"t.mountains"},{"url":"river-mountains.png","condition":"t.mountains"}]');

/***/ }),

/***/ "./src/text/layout.json":
/*!******************************!*\
  !*** ./src/text/layout.json ***!
  \******************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"name":"overview","sections":["basics","sigil","heraldry","heraldry-pattern"]},{"name":"geography","sections":["location","neighboring-realms","climate","ecoregions","rivers","biodiversity"]},{"name":"economy","sections":["infrastructure","natural-resouces"]},{"name":"government","sections":["government-structure","political-regions"]},{"name":"demographics","sections":["language","education","religion"]},{"name":"culture","sections":["landmarks","music-and-art","literature","cuisine","sports"]}]');

/***/ }),

/***/ "./src/util/lorem-words.json":
/*!***********************************!*\
  !*** ./src/util/lorem-words.json ***!
  \***********************************/
/***/ ((module) => {

module.exports = JSON.parse('["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","quisque","nisl","eros","pulvinar","facilisis","justo","mollis","auctor","consequat","urna","morbi","a","bibendum","metus","donec","scelerisque","sollicitudin","enim","eu","venenatis","duis","tincidunt","laoreet","ex","in","pretium","orci","vestibulum","eget","class","aptent","taciti","sociosqu","ad","litora","torquent","per","conubia","nostra","per","inceptos","himenaeos","duis","pharetra","luctus","lacus","ut","vestibulum","maecenas","ipsum","lacus","lacinia","quis","posuere","ut","pulvinar","vitae","dolor","integer","eu","nibh","at","nisi","ullamcorper","sagittis","id","vel","leo","integer","feugiat","faucibus","libero","at","maximus","nisl","suscipit","posuere","morbi","nec","enim","nunc","phasellus","bibendum","turpis","ut","ipsum","egestas","sed","sollicitudin","elit","convallis","cras","pharetra","mi","tristique","sapien","vestibulum","lobortis","nam","eget","bibendum","metus","non","dictum","mauris","nulla","at","tellus","sagittis","viverra","est","a","bibendum","metus"]');

/***/ }),

/***/ "./src/util/number-words.json":
/*!************************************!*\
  !*** ./src/util/number-words.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"]');

/***/ }),

/***/ "./src/util/seed-words.json":
/*!**********************************!*\
  !*** ./src/util/seed-words.json ***!
  \**********************************/
/***/ ((module) => {

module.exports = JSON.parse('["a","ability","able","about","above","abroad","absence","absent","absolute","accept","accident","accord","account","accuse","accustom","ache","across","act","action","active","actor","actress","actual","add","address","admire","admission","admit","adopt","adoption","advance","advantage","adventure","advertise","advice","advise","affair","afford","afraid","after","afternoon","again","against","age","agency","agent","ago","agree","agriculture","ahead","aim","air","airplane","alike","alive","all","allow","allowance","almost","alone","along","aloud","already","also","although","altogether","always","ambition","ambitious","among","amongst","amount","amuse","ancient","and","anger","angle","angry","animal","annoy","annoyance","another","answer","anxiety","anxious","any","anybody","anyhow","anyone","anything","anyway","anywhere","apart","apology","appear","appearance","applaud","applause","apple","application","apply","appoint","approve","arch","argue","arise","arm","army","around","arrange","arrest","arrive","arrow","art","article","artificial","as","ash","ashamed","aside","ask","asleep","association","astonish","at","attack","attempt","attend","attention","attentive","attract","attraction","attractive","audience","aunt","autumn","avenue","average","avoid","avoidance","awake","away","awkward","axe","baby","back","backward","bad","bag","baggage","bake","balance","ball","band","bank","bar","barber","bare","bargain","barrel","base","basic","basin","basis","basket","bath","bathe","battery","battle","bay","be","beak","beam","bean","bear","beard","beast","beat","beauty","because","become","bed","bedroom","before","beg","begin","behave","behavior","behind","being","belief","believe","bell","belong","below","belt","bend","beneath","berry","beside","besides","best","better","between","beyond","bicycle","big","bill","bind","bird","birth","bit","bite","bitter","black","blade","blame","bleed","bless","blind","block","blood","blow","blue","board","boast","boat","body","boil","bold","bone","book","border","borrow","both","bottle","bottom","bound","boundary","bow","bowl","box","boy","brain","branch","brass","brave","bravery","bread","breadth","break","breakfast","breath","breathe","bribe","bribery","brick","bridge","bright","brighten","bring","broad","broadcast","brother","brown","brush","bucket","build","bunch","bundle","burn","burst","bury","bus","bush","business","businesslike","businessman","busy","but","butter","button","buy","by","cage","cake","calculate","calculation","calculator","call","calm","camera","camp","can","canal","cap","cape","capital","captain","car","card","care","carriage","carry","cart","case","castle","cat","catch","cattle","cause","caution","cautious","cave","cent","center","century","ceremony","certain","certainty","chain","chair","chairman","chalk","chance","change","character","charge","charm","cheap","cheat","check","cheer","cheese","chest","chicken","chief","child","childhood","chimney","choice","choose","christmas","church","circle","circular","citizen","city","civilize","claim","class","classification","classify","clay","clean","clear","clerk","clever","cliff","climb","clock","close","cloth","clothe","cloud","club","coal","coarse","coast","coat","coffee","coin","cold","collar","collect","collection","collector","college","colony","color","comb","combine","come","comfort","command","commerce","commercial","committee","common","companion","companionship","company","compare","comparison","compete","competition","competitor","complain","complaint","complete","completion","complicate","complication","compose","composition","concern","condition","confess","confession","confidence","confident","confidential","confuse","confusion","congratulate","congratulation","connect","connection","conquer","conqueror","conquest","conscience","conscious","consider","contain","content","continue","control","convenience","convenient","conversation","cook","cool","copper","copy","cork","corn","corner","correct","correction","cost","cottage","cotton","cough","could","council","count","country","courage","course","court","cousin","cover","cow","coward","cowardice","crack","crash","cream","creature","creep","crime","criminal","critic","crop","cross","crowd","crown","cruel","crush","cry","cultivate","cultivation","cultivator","cup","cupboard","cure","curious","curl","current","curse","curtain","curve","cushion","custom","customary","customer","cut","daily","damage","damp","dance","danger","dare","dark","darken","date","daughter","day","daylight","dead","deaf","deafen","deal","dear","death","debt","decay","deceit","deceive","decide","decision","decisive","declare","decrease","deed","deep","deepen","deer","defeat","defend","defendant","defense","degree","delay","delicate","delight","deliver","delivery","demand","department","depend","dependence","dependent","depth","descend","descendant","descent","describe","description","desert","deserve","desire","desk","despair","destroy","destruction","destructive","detail","determine","develop","devil","diamond","dictionary","die","difference","different","difficult","difficulty","dig","dine","dinner","dip","direct","direction","director","dirt","disagree","disappear","disappearance","disappoint","disapprove","discipline","discomfort","discontent","discover","discovery","discuss","discussion","disease","disgust","dish","dismiss","disregard","disrespect","dissatisfaction","dissatisfy","distance","distant","distinguish","district","disturb","ditch","dive","divide","division","do","doctor","dog","dollar","donkey","door","dot","double","doubt","down","dozen","drag","draw","drawer","dream","dress","drink","drive","drop","drown","drum","dry","duck","due","dull","during","dust","duty","each","eager","ear","early","earn","earnest","earth","ease","east","eastern","easy","eat","edge","educate","education","educator","effect","effective","efficiency","efficient","effort","egg","either","elastic","elder","elect","election","electric","electrician","elephant","else","elsewhere","empire","employ","employee","empty","enclose","enclosure","encourage","end","enemy","engine","engineer","english","enjoy","enough","enter","entertain","entire","entrance","envelope","envy","equal","escape","especially","essence","essential","even","evening","event","ever","everlasting","every","everybody","everyday","everyone","everything","everywhere","evil","exact","examine","example","excellence","excellent","except","exception","excess","excessive","exchange","excite","excuse","exercise","exist","existence","expect","expense","expensive","experience","experiment","explain","explode","explore","explosion","explosive","express","expression","extend","extension","extensive","extent","extra","extraordinary","extreme","eye","face","fact","factory","fade","fail","failure","faint","fair","faith","fall","FALSE","fame","familiar","family","fan","fancy","far","farm","fashion","fast","fasten","fat","fate","father","fatten","fault","favor","favorite","fear","feast","feather","feed","feel","fellow","fellowship","female","fence","fever","few","field","fierce","fight","figure","fill","film","find","fine","finger","finish","fire","firm","first","fish","fit","fix","flag","flame","flash","flat","flatten","flavor","flesh","float","flood","floor","flour","flow","flower","fly","fold","follow","fond","food","fool","foot","for","forbid","force","foreign","forest","forget","forgive","fork","form","formal","former","forth","fortunate","fortune","forward","frame","framework","free","freedom","freeze","frequency","frequent","fresh","friend","friendly","friendship","fright","frighten","from","front","fruit","fry","full","fun","funeral","funny","fur","furnish","furniture","further","future","gaiety","gain","gallon","game","gap","garage","garden","gas","gate","gather","gay","general","generous","gentle","gentleman","get","gift","girl","give","glad","glass","glory","go","goat","god","gold","golden","good","govern","governor","grace","gradual","grain","grammar","grammatical","grand","grass","grateful","grave","gray","grease","great","greed","green","greet","grind","ground","group","grow","growth","guard","guess","guest","guide","guilt","gun","habit","hair","half","hall","hammer","hand","handkerchief","handle","handshake","handwriting","hang","happen","happy","harbor","hard","harden","hardly","harm","harvest","haste","hasten","hat","hate","hatred","have","hay","he","head","headache","headdress","heal","health","heap","hear","heart","heat","heaven","heavenly","heavy","height","heighten","hello","help","here","hesitate","hesitation","hide","high","highway","hill","hinder","hindrance","hire","history","hit","hold","hole","holiday","hollow","holy","home","homecoming","homemade","homework","honest","honesty","honor","hook","hope","horizon","horizontal","horse","hospital","host","hot","hotel","hour","house","how","however","human","humble","hunger","hunt","hurrah","hurry","hurt","husband","hut","I","ice","idea","ideal","idle","if","ill","imaginary","imaginative","imagine","imitate","imitation","immediate","immense","importance","important","impossible","improve","in","inch","include","inclusive","increase","indeed","indoor","industry","influence","influential","inform","ink","inn","inquire","inquiry","insect","inside","instant","instead","instrument","insult","insurance","insure","intend","intention","interest","interfere","interference","international","interrupt","interruption","into","introduce","introduction","invent","invention","inventor","invite","inward","iron","island","it","jaw","jealous","jealousy","jewel","join","joint","joke","journey","joy","judge","juice","jump","just","justice","keep","key","kick","kill","kind","king","kingdom","kiss","kitchen","knee","kneel","knife","knock","knot","know","knowledge","lack","ladder","lady","lake","lamp","land","landlord","language","large","last","late","lately","latter","laugh","laughter","law","lawyer","lay","lazy","lead","leadership","leaf","lean","learn","least","leather","leave","left","leg","lend","length","lengthen","less","lessen","lesson","let","letter","level","liar","liberty","librarian","library","lid","lie","life","lift","light","lighten","like","likely","limb","limit","line","lip","lipstick","liquid","list","listen","literary","literature","little","live","load","loaf","loan","local","lock","lodge","log","lonely","long","look","loose","loosen","lord","lose","loss","lot","loud","love","lovely","low","loyal","loyalty","luck","lump","lunch","lung","machine","machinery","mad","madden","mail","main","make","male","man","manage","mankind","manner","manufacture","many","map","march","mark","market","marriage","marry","mass","master","mat","match","material","matter","may","maybe","meal","mean","meantime","meanwhile","measure","meat","mechanic","mechanism","medical","medicine","meet","melt","member","membership","memory","mend","mention","merchant","mercy","mere","merry","message","messenger","metal","middle","might","mild","mile","milk","mill","mind","mine","mineral","minister","minute","miserable","misery","miss","mistake","mix","mixture","model","moderate","moderation","modern","modest","modesty","moment","momentary","money","monkey","month","moon","moonlight","moral","more","moreover","morning","most","mother","motherhood","motherly","motion","motor","mountain","mouse","mouth","move","much","mud","multiplication","multiply","murder","music","musician","must","mystery","nail","name","narrow","nation","native","nature","near","neat","necessary","necessity","neck","need","needle","neglect","neighbor","neighborhood","neither","nephew","nest","net","network","never","new","news","newspaper","next","nice","niece","night","no","noble","nobody","noise","none","noon","nor","north","northern","nose","not","note","notebook","nothing","notice","noun","now","nowadays","nowhere","nuisance","number","numerous","nurse","nursery","nut","oar","obedience","obedient","obey","object","objection","observe","occasion","ocean","of","off","offend","offense","offer","office","officer","official","often","oil","old","old-fashioned","omission","omit","on","once","one","only","onto","open","operate","operation","operator","opinion","opportunity","oppose","opposite","opposition","or","orange","order","ordinary","organ","organize","origin","ornament","other","otherwise","ought","ounce","out","outline","outside","outward","over","overcome","overflow","owe","own","ownership","pack","package","pad","page","pain","paint","pair","pale","pan","paper","parcel","pardon","parent","park","part","particle","particular","partner","party","pass","passage","passenger","past","paste","pastry","path","patience","patient","patriotic","pattern","pause","paw","pay","peace","pearl","peculiar","pen","pencil","penny","people","per","perfect","perfection","perform","performance","perhaps","permanent","permission","permit","person","persuade","persuasion","pet","photograph","photography","pick","picture","piece","pig","pigeon","pile","pin","pinch","pink","pint","pipe","pity","place","plain","plan","plant","plaster","plate","play","pleasant","please","pleasure","plenty","plow","plural","pocket","poem","poet","point","poison","police","polish","polite","political","politician","politics","pool","poor","popular","population","position","possess","possession","possessor","possible","post","postpone","pot","pound","pour","poverty","powder","power","practical","practice","praise","pray","preach","precious","prefer","preference","prejudice","prepare","presence","present","preserve","president","press","pressure","pretend","pretense","pretty","prevent","prevention","price","pride","priest","print","prison","private","prize","probable","problem","procession","produce","product","production","profession","profit","program","progress","promise","prompt","pronounce","pronunciation","proof","proper","property","proposal","propose","protect","protection","proud","prove","provide","public","pull","pump","punctual","punish","pupil","pure","purple","purpose","push","put","puzzle","qualification","qualify","quality","quantity","quarrel","quart","quarter","queen","question","quick","quiet","quite","rabbit","race","radio","rail","railroad","rain","raise","rake","rank","rapid","rare","rate","rather","raw","ray","razor","reach","read","ready","real","realize","reason","reasonable","receipt","receive","recent","recognition","recognize","recommend","record","red","redden","reduce","reduction","refer","reference","reflect","reflection","refresh","refuse","regard","regret","regular","rejoice","relate","relation","relative","relief","relieve","religion","remain","remark","remedy","remember","remind","rent","repair","repeat","repetition","replace","reply","report","represent","representative","reproduce","reproduction","republic","reputation","request","rescue","reserve","resign","resist","resistance","respect","responsible","rest","restaurant","result","retire","return","revenge","review","reward","ribbon","rice","rich","rid","ride","right","ring","ripe","ripen","rise","risk","rival","rivalry","river","road","roar","roast","rob","robbery","rock","rod","roll","roof","room","root","rope","rot","rotten","rough","round","row","royal","royalty","rub","rubber","rubbish","rude","rug","ruin","rule","run","rush","rust","sacred","sacrifice","sad","sadden","saddle","safe","safety","sail","sailor","sake","salary","sale","salesman","salt","same","sample","sand","satisfaction","satisfactory","satisfy","sauce","saucer","save","saw","say","scale","scarce","scatter","scene","scenery","scent","school","science","scientific","scientist","scissors","scold","scorn","scrape","scratch","screen","screw","sea","search","season","seat","second","secrecy","secret","secretary","see","seed","seem","seize","seldom","self","selfish","sell","send","sense","sensitive","sentence","separate","separation","serious","servant","serve","service","set","settle","several","severe","sew","shade","shadow","shake","shall","shallow","shame","shape","share","sharp","sharpen","shave","she","sheep","sheet","shelf","shell","shelter","shield","shilling","shine","ship","shirt","shock","shoe","shoot","shop","shore","short","shorten","should","shoulder","shout","show","shower","shut","sick","side","sight","sign","signal","signature","silence","silent","silk","silver","simple","simplicity","since","sincere","sing","single","sink","sir","sister","sit","situation","size","skill","skin","skirt","sky","slave","slavery","sleep","slide","slight","slip","slippery","slope","slow","small","smell","smile","smoke","smooth","snake","snow","so","soap","social","society","sock","soft","soften","soil","soldier","solemn","solid","solution","solve","some","somebody","somehow","someone","something","sometime","sometimes","somewhere","son","song","soon","sore","sorrow","sorry","sort","soul","sound","soup","sour","south","sow","space","spade","spare","speak","special","speech","speed","spell","spend","spill","spin","spirit","spit","spite","splendid","split","spoil","spoon","sport","spot","spread","spring","square","staff","stage","stain","stair","stamp","stand","standard","staple","star","start","state","station","stay","steady","steam","steel","steep","steer","stem","step","stick","stiff","stiffen","still","sting","stir","stock","stocking","stomach","stone","stop","store","storm","story","stove","straight","straighten","strange","strap","straw","stream","street","strength","strengthen","stretch","strict","strike","string","strip","stripe","stroke","strong","struggle","student","study","stuff","stupid","subject","substance","succeed","success","such","suck","sudden","suffer","sugar","suggest","suggestion","suit","summer","sun","supper","supply","support","suppose","sure","surface","surprise","surround","suspect","suspicion","suspicious","swallow","swear","sweat","sweep","sweet","sweeten","swell","swim","swing","sword","sympathetic","sympathy","system","table","tail","tailor","take","talk","tall","tame","tap","taste","tax","taxi","tea","teach","tear","telegraph","telephone","tell","temper","temperature","temple","tempt","tend","tender","tent","term","terrible","test","than","thank","that","the","theater","theatrical","then","there","therefore","these","they","thick","thicken","thief","thin","thing","think","thirst","this","thorn","thorough","those","though","thread","threat","threaten","throat","through","throw","thumb","thunder","thus","ticket","tide","tidy","tie","tight","tighten","till","time","tin","tip","tire","title","to","tobacco","today","toe","together","tomorrow","ton","tongue","tonight","too","tool","tooth","top","total","touch","tough","tour","toward","towel","tower","town","toy","track","trade","train","translate","translation","translator","trap","travel","tray","treasure","treasury","treat","tree","tremble","trial","tribe","trick","trip","trouble","true","trunk","trust","truth","try","tube","tune","turn","twist","type","ugly","umbrella","uncle","under","underneath","understand","union","unit","unite","unity","universal","universe","university","unless","until","up","upon","upper","uppermost","upright","upset","urge","urgent","use","usual","vain","valley","valuable","value","variety","various","veil","verb","verse","very","vessel","victory","view","village","violence","violent","virtue","visit","visitor","voice","vote","vowel","voyage","wage","waist","wait","waiter","wake","walk","wall","wander","want","war","warm","warmth","warn","wash","waste","watch","water","wave","wax","way","we","weak","weaken","wealth","weapon","wear","weather","weave","weed","week","weekday","weekend","weigh","weight","welcome","well","west","western","wet","what","whatever","wheat","wheel","when","whenever","where","wherever","whether","which","whichever","while","whip","whisper","whistle","white","whiten","who","whoever","whole","whom","whose","why","wicked","wide","widen","widow","widower","width","wife","wild","will","win","wind","window","wine","wing","winter","wipe","wire","wisdom","wise","wish","with","within","without","witness","woman","wonder","wood","wooden","wool","woolen","word","work","world","worm","worry","worse","worship","worth","would","wound","wrap","wreck","wrist","write","wrong","yard","year","yellow","yes","yesterday","yet","yield","you","young","youth","zero"]');

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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/* harmony import */ var _controllers_HomePageController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/HomePageController */ "./src/controllers/HomePageController.ts");
/* harmony import */ var _controllers_JSONPageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/JSONPageController */ "./src/controllers/JSONPageController.ts");
/**
 * Hint: Use 'npm run build' from console to compile + watch the TS code on save
 */


// Determine the html file name
const arr = window.location.href.match(/(?<=.*)(\w+)\.html(?=.*)/);
const file = arr && arr.length > 1 ? arr[1] : '';
let controller;
switch (file) {
    case 'realm':
        controller = new _controllers_HomePageController__WEBPACK_IMPORTED_MODULE_0__["default"]();
        break;
    case 'json':
        controller = new _controllers_JSONPageController__WEBPACK_IMPORTED_MODULE_1__["default"]();
        break;
    default:
        // Error!
        console.log('Error!');
        break;
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map