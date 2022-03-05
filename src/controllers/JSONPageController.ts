import PageController from "./PageController";

export default class JSONPageController extends PageController {
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