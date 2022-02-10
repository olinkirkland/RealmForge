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
Data.setup();

// Initialize variables
let realm: Realm;

start();

// Start the generation process
function start() {
  realm = new Realm();

  updateView();
}

function updateView() {
  // Apply values to view
  applyText('name', realm.name);
  applyText('government-rank', realm.governmentRank);
  applyText('parent-entity', realm.parentEntityName);
  applyText(
    'direction-within-parent-entity',
    realm.directionWithinParentEntity
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

function applyText(query: string, text: string) {
  const nationNameEls: NodeList = document.querySelectorAll('span.' + query);
  nationNameEls.forEach((node: Node) => {
    const el: HTMLElement = node as HTMLElement;
    el.classList.add('keyword');
    el.textContent = text;
  });
}
