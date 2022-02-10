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
let realm;

// Start the generation process
function start() {
  realm = new Realm();

  updateView();
}

function updateView() {
  // // Add the correct nation name
  // const nationNameEls: NodeList = document.querySelectorAll('span.realm-name');
  // nationNameEls.forEach((el) => {
  //   el.textContent = realm.name;
  // });

  // Show the content and scroll to it
  const contentEl: HTMLDivElement = document.getElementById(
    'content'
  )! as HTMLDivElement;
  contentEl.classList.remove('d-none');
  contentEl.scrollIntoView({ behavior: 'smooth' });
}
