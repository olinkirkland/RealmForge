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
Data.setup(start);

// Initialize variables
let realm: Realm;

// Start the generation process
function start() {
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
  applyText(
    'direction-within-parent-entity',
    realm.directionAdjWithinParentEntity
  );
  applyText('capital-city', realm.capitalCityName);

  // Show the content and scroll to it
  const contentEl: HTMLDivElement = document.getElementById(
    'content'
  )! as HTMLDivElement;
  contentEl.classList.remove('d-none');
  contentEl.scrollIntoView({ behavior: 'smooth' });

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
  const nationNameEls: NodeList = document.querySelectorAll('span.' + query);
  nationNameEls.forEach((node: Node) => {
    const el: HTMLElement = node as HTMLElement;
    el.classList.add('keyword');
    if (el.classList.contains('prepend-article'))
      text = Util.aOrAn(text) + ' ' + text;
    el.textContent = text;
  });
}
