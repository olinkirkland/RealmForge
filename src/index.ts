import { Util } from './util';
import { Data } from './data';
import { Realm, Biome, River } from './realm';

/**
 * Hint: Use 'npm run build' from console to compile + watch the TS code on save
 */

// Handle start button
const btnStart: HTMLButtonElement = document.getElementById(
  'btnStart'
)! as HTMLButtonElement;
btnStart.addEventListener('click', generateSeedAndStart);

// Handle tweet button
const btnShareTwitter: HTMLButtonElement = document.getElementById(
  'btnShareTwitter'
)! as HTMLButtonElement;
btnShareTwitter.addEventListener('click', () => {
  Util.shareByTweet(realm);
});

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

  // Blurbs
  applyBiomesBlurb();
  applyRiversBlurb();
  toggleVisibility('sigil-present-on-heraldry', realm.sigilPresentOnHeraldry);

  // Words
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

  applyIcon('sigil', realm.sigilIcon);

  // Utility
  replaceNumbers();
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

function toggleVisibility(query: string, visible: boolean) {
  const els: NodeList = document.querySelectorAll('span.' + query);
  els.forEach((node: Node) => {
    const el: HTMLElement = node as HTMLElement;
    if (visible) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

function applyIcon(query: string, icon: string) {
  const els: NodeList = document.querySelectorAll('i.' + query);
  els.forEach((node: Node) => {
    const el: HTMLElement = node as HTMLElement;

    // Remove the previous icon
    el.classList.forEach((className) => {
      let text: string = '';
      if (className.includes('fa-') && className !== 'fa-2x') {
        el.classList.remove(className);
      }
    });

    el.classList.add('fa-' + icon);
  });
}

function applyBiomesBlurb() {
  let text: string = '';

  if (realm.biomes.length == 1) {
    let b: Biome = realm.biomes[0];
    text = `<span class="name"></span> is made up of ${b.type}.`;
  } else if (realm.biomes.length == 2) {
    let b1: Biome = realm.biomes[0];
    let b2: Biome = realm.biomes[1];
    text = `The ecoregions of <span class="name"></span> consist mostly of ${b1.type} with a ${b2.size} ${b2.type} region in the ${b2.direction.noun}.`;
  }

  const el: HTMLElement = document.querySelector('.biomes-blurb')!;
  el.innerHTML = text;
}

function applyRiversBlurb() {
  let text: string = '';

  if (realm.rivers.length == 0) {
    text = `No notable rivers pass through <span class="name"></span>.`;
  } else if (realm.rivers.length == 1) {
    let r: River = realm.rivers[0];
    text = `The main river that flows through <span class="name"></span> is the <span class="capitalized">${Util.readWord(
      r.name
    )}</span>. The <span class="capitalized">${Util.readWord(
      r.name
    )}</span> starts in the ${r.flowsFrom.noun} and flows toward the ${
      r.flowsTo.noun
    }.`;
  } else {
    text = `<span class="word-number capitalized">${
      realm.rivers.length
    }</span> rivers pass through <span class="name"></span>: ${Util.joinArrayWithAnd(
      realm.rivers.map((river) => {
        return `the <span class="capitalized">${Util.readWord(
          river.name
        )}</span>`;
      })
    )}.`;
  }

  if (realm.tributaries.length > 0) {
    text +=
      '<br>Notable tributaries include the ' +
      Util.joinArrayWithAnd(
        realm.tributaries.map((river) => Util.readWord(river.name))
      );
  }

  const el: HTMLElement = document.querySelector('.rivers-blurb')!;
  el.innerHTML = text;
}

function replaceNumbers() {
  const els: NodeList = document.querySelectorAll('.word-number');
  els.forEach((node: Node) => {
    const el: HTMLElement = node as HTMLElement;
    el.textContent = Util.wordFromNumber(
      Number.parseInt(el.textContent ? el.textContent : '0')
    );
  });
}
