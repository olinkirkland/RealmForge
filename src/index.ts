import { Util } from './util';
import { Data } from './data';
import { Realm } from './realm';

/**
 * Hint: Use 'npm run build' from console to compile + watch the TS code on save
 */

// Delay intro animations
const sectionEls: NodeList = document.querySelectorAll('.container');
sectionEls.forEach((node: Node, index: number) => {
  const el: HTMLElement = node as HTMLElement;
  setTimeout(() => {
    el.classList.add('fade-in');
  }, 250 * index);
});

// Handle start button
const btnStart: HTMLButtonElement = document.getElementById(
  'btnStart'
)! as HTMLButtonElement;
btnStart.addEventListener('click', generateSeedAndStart);

// Load data
Data.setup(() => {
  // Does the url contain a seed (query)?
  // www.google.com?foo
  //    -> foo
  // www.google.com?bar#
  //    -> bar

  const url = window.location.href;
  const arr = url.match(/\?([a-z0-9,-]+)/);
  if (arr && arr.length > 1) {
    Util.seed = arr[1];
    start();
  } else {
    generateSeedAndStart();
  }
});

// Initialize variables
let realm: Realm;

function generateSeedAndStart() {
  Util.generateSeed();
  const url: string = 'http://127.0.0.1:5501/public/index.html?';
  window.location.replace(url + Util.seed);
}

// Start the generation process
function start() {
  console.log('=== Start ===');
  Util.seedRandomNumberGenerator();
  realm = new Realm();
  updateView();
}

function updateView() {
  // Choose a photo for the hero
  const heroEl: HTMLDivElement = document.getElementById(
    'hero'
  )! as HTMLDivElement;
  heroEl.setAttribute(
    'style',
    `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${determineHeroImageUrl()})`
  );

  // Apply values to view
  applyText('name', realm.name);
  applyText('government-rank', realm.governmentRank);
  applyText('parent-entity', realm.parentEntityName);
  applyText('parent-entity-adj', realm.parentEntityAdj);
  applyText(
    'direction-within-parent-entity',
    realm.directionWithinParentEntity
  );
  applyText(
    'direction-adj-within-parent-entity',
    realm.directionAdjWithinParentEntity
  );
  applyText('capital-city', realm.capitalCityName);
  applyText('sigil-name', realm.sigilName);
  applyText('sigil-meaning', realm.sigilMeaning);

  applyText('size', realm.size);

  applyText('climate', realm.temperature);
  applyText('season-summer', realm.seasonSummer.join(', '));
  applyText('season-winter', realm.seasonWinter.join(', '));

  applyText('biomes-blurb', realm.biomesBlurb());

  applyIcon('sigil', realm.sigilIcon);
}

function determineHeroImageUrl(): string {
  // Todo use realm information to determine the image
  return Util.randomValue(Data.images);
}

function applyText(query: string, text: string) {
  const els: NodeList = document.querySelectorAll('span.' + query);
  els.forEach((node: Node) => {
    const el: HTMLElement = node as HTMLElement;
    el.classList.add('keyword');

    if (el.classList.contains('prepend-article')) {
      el.textContent = Util.aOrAn(text) + ' ' + text;
    } else {
      el.textContent = text;
    }
  });
}

function applyIcon(query: string, icon: string) {
  const els: NodeList = document.querySelectorAll('i.' + query);
  els.forEach((node: Node) => {
    const el: HTMLElement = node as HTMLElement;

    // Remove the previous icon
    el.classList.forEach((className) => {
      if (className.includes('fa-') && className !== 'fa-2x') {
        el.classList.remove(className);
      }
    });

    el.classList.add('fa-' + icon);
  });
}
