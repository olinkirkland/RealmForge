import { Util } from './util';
import { Data } from './data';
import { Realm } from './realm';

/**
 * Hint: Use 'npm run build' from console to compile + watch the TS code on save
 */

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

  const url: string = window.location.href;
  const arr: RegExpMatchArray | null = url.match(/\?([a-z0-9,-]+)/);
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

  let url: string = window.location.href;
  url = url.substring(0, url.indexOf('?'));

  if (window.location.href) window.location.replace(url + '?' + Util.seed);
}

// Start the generation process
function start() {
  Util.seedRandomNumberGenerator();
  realm = new Realm();
  updateView();
  // Delay intro animations
  const sectionEls: NodeList = document.querySelectorAll('.container');
  sectionEls.forEach((node: Node, index: number) => {
    const el: HTMLElement = node as HTMLElement;
    setTimeout(() => {
      el.classList.add('fade-in');
    }, 250 * index);
  });
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

  applyText('biomes-blurb', writeBiomesBlurb());

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

function writeBiomesBlurb(): string {
  let arr: string[] = [];

  realm.biomes.forEach((biome) => {
    arr.push(`${biome.size} ${biome.type} in the ${biome.direction.noun}`);
  });

  return arr.join(' and ');
}
