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
btnStart.addEventListener('click', start);

// Load data
Data.setup(() => {
  realm = new Realm();
  updateView();
});

// Initialize variables
let realm: Realm;

// Start the generation process
function start() {
  realm = new Realm();
  updateView();

  // Scroll to the content
  const contentEl: HTMLDivElement = document.getElementById(
    'content'
  )! as HTMLDivElement;
  contentEl.scrollIntoView({ behavior: 'smooth' });
}

function updateView() {
  // Show the content
  const contentEl: HTMLDivElement = document.getElementById(
    'content'
  )! as HTMLDivElement;
  contentEl.classList.remove('d-none');

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
  applyText(
    'direction-within-parent-entity',
    realm.directionAdjWithinParentEntity
  );
  applyText('capital-city', realm.capitalCityName);
  applyText('sigil-name', realm.sigilName);
  applyText('sigil-meaning', realm.sigilMeaning);

  applyIcon('sigil', realm.sigilIcon);

  // Change dice icon
  const dice: string[] = ['one', 'two', 'three', 'four', 'five', 'six'];
  const iconEl: HTMLElement = document.querySelector(
    '#btnStart > i'
  )! as HTMLElement;
  dice.forEach((str) => {
    iconEl.classList.remove('fa-dice-' + str);
  });
  iconEl.classList.add(
    'fa-dice-' + dice[Math.floor(Math.random() * dice.length)]
  );
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
    if (el.classList.contains('prepend-article'))
      text = Util.aOrAn(text) + ' ' + text;
    el.textContent = text;
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
