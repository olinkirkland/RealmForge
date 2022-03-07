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