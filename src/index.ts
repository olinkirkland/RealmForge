import Util from './Util';
import { Data } from './Data';
import { Realm, Biome, River } from './Realm';
import Coat from './Coat';

/**
 * Hint: Use 'npm run build' from console to compile + watch the TS code on save
 */

// Initial local preferences
const darkModeAtStart: string | null = localStorage.getItem('darkMode');
const isDarkModeAtStart: boolean =
  darkModeAtStart != null && darkModeAtStart == 'true';
isDarkModeAtStart ? Util.toggleDarkMode() : null;

// Handle dark mode button
const btnToggleDarkMode: HTMLButtonElement = document.getElementById(
  'btnToggleDarkMode'
)! as HTMLButtonElement;
btnToggleDarkMode.addEventListener('click', () => {
  Util.toggleDarkMode();
});

// Handle start button
const btnStart: HTMLButtonElement = document.getElementById(
  'btnStart'
)! as HTMLButtonElement;
btnStart.addEventListener('click', generateSeedAndStart);

// Handle copy button
const btnCopyLink: HTMLButtonElement = document.getElementById(
  'btnCopyLink'
)! as HTMLButtonElement;
btnCopyLink.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href);

  // Play copied animation
  btnCopyLink.innerHTML = `<i class="fa-solid fa-check" style="color: #17b664"></i>Copied!`;
  btnCopyLink.setAttribute('disabled', 'true');
  document.getElementById('labelShare')!.style.opacity = '0';

  setTimeout(() => {
    // Play copied animation
    btnCopyLink.innerHTML = `<i class="fa-solid fa-copy"></i>Copy Link`;
    btnCopyLink.removeAttribute('disabled');
  }, 2000);
});
btnCopyLink.addEventListener('mouseover', () => {
  if (btnCopyLink.hasAttribute('disabled')) return;
  document.getElementById('labelShare')!.innerHTML = window.location.href;
  document.getElementById('labelShare')!.style.top = '0';
  document.getElementById('labelShare')!.style.opacity = '1';
});
btnCopyLink.addEventListener('mouseout', fadeOutShareLabel);

// Handle tweet button
const btnShareTwitter: HTMLButtonElement = document.getElementById(
  'btnShareTwitter'
)! as HTMLButtonElement;
btnShareTwitter.addEventListener('click', () => {
  Util.shareByTweet(realm);
});
btnShareTwitter.addEventListener('mouseover', () => {
  if (btnShareTwitter.hasAttribute('disabled')) return;
  document.getElementById('labelShare')!.innerHTML =
    'Share this Realm on Twitter';
  document.getElementById('labelShare')!.style.top = '0';
  document.getElementById('labelShare')!.style.opacity = '1';
});
btnShareTwitter.addEventListener('mouseout', fadeOutShareLabel);

// Handle JSON button
const btnJson: HTMLButtonElement = document.getElementById(
  'btnJson'
)! as HTMLButtonElement;
btnJson.addEventListener('click', () => {
  window.open(window.location.href + '&json', '_blank');
});

btnJson.addEventListener('mouseover', () => {
  if (btnJson.hasAttribute('disabled')) return;
  document.getElementById('labelShare')!.innerHTML =
    "View this Realm's JSON (opens a new tab)";
  document.getElementById('labelShare')!.style.top = '0';
  document.getElementById('labelShare')!.style.opacity = '1';
});
btnJson.addEventListener('mouseout', fadeOutShareLabel);

function fadeInShareLabel() {
  document.getElementById('labelShare')!.style.top = '0';
  document.getElementById('labelShare')!.style.opacity = '1';
}
function fadeOutShareLabel() {
  document.getElementById('labelShare')!.style.top = '0.4rem';
  document.getElementById('labelShare')!.style.opacity = '0';
}

function handleJsonButtons() {
  // Handle the Realm from JSON button
  const btnToRealm: HTMLButtonElement = document.getElementById(
    'btnToRealm'
  )! as HTMLButtonElement;
  btnToRealm.addEventListener('click', () => {
    const arr: RegExpMatchArray | null = window.location.href.match(
      /(.+\?[a-z0-9,-]+).*\&/
    );

    if (arr && arr.length > 1) {
      window.open(arr[1], '_blank');
    }
  });

  btnToRealm.addEventListener('mouseover', () => {
    if (btnJson.hasAttribute('disabled')) return;
    document.getElementById('labelJson')!.innerHTML =
      'View the Realm page (opens a new tab)';
    fadeInJsonLabel();
  });
  btnToRealm.addEventListener('mouseout', fadeOutJsonLabel);

  // Handle the Copy JSON button
  const btnCopyJson: HTMLButtonElement = document.getElementById(
    'btnCopyJson'
  )! as HTMLButtonElement;
  btnCopyJson.addEventListener('click', () => {
    // Play copied animation
    btnCopyJson.innerHTML = `<i class="fa-solid fa-check" style="color: orangered"></i>Copied!`;
    btnCopyJson.setAttribute('disabled', 'true');
    document.getElementById('labelJson')!.style.opacity = '0';

    navigator.clipboard.writeText(JSON.stringify(realm, null, '  '));

    setTimeout(() => {
      // Play copied animation
      btnCopyJson.innerHTML = `<i class="fa-solid fa-copy"></i>Copy JSON`;
      btnCopyJson.removeAttribute('disabled');
    }, 2000);
  });

  btnCopyJson.addEventListener('mouseover', () => {
    if (btnCopyJson.hasAttribute('disabled')) return;
    document.getElementById('labelJson')!.innerHTML =
      'Copy this JSON to your clipboard';
    fadeInJsonLabel();
  });
  btnCopyJson.addEventListener('mouseout', fadeOutJsonLabel);

  // Handle the Download JSON button
  const btnDownloadJson: HTMLButtonElement = document.getElementById(
    'btnDownloadJson'
  )! as HTMLButtonElement;
  btnDownloadJson.addEventListener('click', () => {});

  btnDownloadJson.addEventListener('mouseover', () => {
    if (btnDownloadJson.hasAttribute('disabled')) return;
    document.getElementById('labelJson')!.innerHTML =
      'Download this JSON to a .json file';
    fadeInJsonLabel();
  });
  btnDownloadJson.addEventListener('mouseout', fadeOutJsonLabel);

  function fadeInJsonLabel() {
    document.getElementById('labelJson')!.style.top = '0';
    document.getElementById('labelJson')!.style.opacity = '1';
  }
  function fadeOutJsonLabel() {
    document.getElementById('labelJson')!.style.top = '0.4rem';
    document.getElementById('labelJson')!.style.opacity = '0';
  }
}

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

  // Is it json?
  const arr: RegExpMatchArray | null = window.location.href.match(
    /\?[a-z0-9,-]+.*\&(json)/
  );

  const jsonContainer: HTMLElement =
    document.querySelector('.container--json')!;
  if (arr && arr.length > 1) {
    // Show JSON
    jsonContainer.classList.remove('hidden');
    const jsonContent: HTMLElement = document.querySelector('.json-content')!;
    jsonContent.innerHTML =
      '<pre class="json-format">' +
      JSON.stringify(realm, null, '  ') +
      '</pre>';

    handleJsonButtons();

    // Hide content
    const content: HTMLElement = document.querySelector('div.content')!;
    content.classList.add('hidden');
  } else {
    // Don't show JSON
    jsonContainer.innerHTML = '';
    updateView();
  }

  // Delay intro animations
  const sectionEls: NodeList = document.querySelectorAll('.container');
  sectionEls.forEach((node: Node, index: number) => {
    const el: HTMLElement = node as HTMLElement;
    setTimeout(() => {
      el.classList.add('fade-in');
    }, 250 * index);
  });

  // testSnippets();
}

function testSnippets() {
  // Test Util.endsWith function
  for (let i = 0; i < 10; i++) {
    let str: string = Util.randomValue(Data.words);
    console.log(`${str} ends with t? ${Util.endsWith(str, 't')}`);
  }
}

function updateView() {
  // Choose a photo for the hero
  const heroEl: HTMLDivElement = document.getElementById(
    'hero'
  )! as HTMLDivElement;
  heroEl.setAttribute(
    'style',
    `background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${determineHeroImageUrl()})`
  );

  // Blurbs
  applyBiomesBlurb();
  applyRiversBlurb();
  applyCoatBlurb();
  toggleVisibility('sigil-present-on-heraldry', realm.sigilPresentOnHeraldry);
  toggleVisibility('on-the-coast', realm.coast);

  // Words
  applyText('name', Util.readWord(realm.realmName));
  applyText('government-rank', realm.governmentRank);
  applyText('parent-entity', realm.parentEntityName);
  applyText('parent-entity-adj', realm.parentEntityAdj);
  applyText(
    'direction-within-parent-entity',
    realm.directionWithinParentEntity.noun
  );
  applyText(
    'direction-adj-within-parent-entity',
    realm.directionWithinParentEntity.adj
  );
  applyText('coast-direction', realm.coastDirection.adj);
  applyText('capital-city', realm.capitalCityName);
  applyText('sigil-name', realm.sigilName);
  applyText('sigil-meaning', realm.sigilMeaning);

  applyText('size', realm.size);

  applyText('temperature', realm.temperature);
  applyText('humidity', realm.humidity);
  applyText('season-summer', realm.seasonSummer.join(', '));
  applyText('season-winter', realm.seasonWinter.join(', '));

  applyText(
    'tincture1',
    realm.coat.tinctures[0].name,
    ' <span class="tincture tincture1-color"></span>'
  );
  applyText(
    'tincture2',
    realm.coat.tinctures[1].name,
    ' <span class="tincture tincture2-color"></span>'
  );

  applyTinctureColors();

  applyIcon('sigil', realm.sigilIcon);

  // Utility
  replaceNumbers();
}

function determineHeroImageUrl(): string {
  // Todo use realm information to determine the image
  const validImages: string[] = Data.heroImages
    .filter((u) => {
      return u.tags.some((tag) => realm.tags.includes(tag));
    })
    .map((j) => {
      return j.url;
    });

  // console.log(validImages);

  const image: string = Util.randomValue(validImages);
  return image;
}

function applyText(query: string, text: string, app: string = '') {
  const els: NodeList = document.querySelectorAll('span.' + query);
  els.forEach((node: Node) => {
    const el: HTMLElement = node as HTMLElement;
    if (el.classList.contains('prepend-article')) {
      el.textContent = Util.aOrAn(text) + ' ' + text + app;
    } else {
      el.innerHTML = text + app;
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
    text = `Much of <span class="name"></span> is occupied by a ${b.type} ecoregion.`;
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
    // No rivers
    text = `No notable rivers pass through <span class="name"></span>.`;
  } else if (realm.rivers.length == 1) {
    // One river
    let r: River = realm.rivers[0];
    text = `The main river that flows through <span class="name"></span> is the <span class="capitalized">${Util.readWord(
      r.name
    )}</span>. `;

    // Flows from...
    text += `The <span class="capitalized">${Util.readWord(r.name)}</span> `;
    if (r.flowsFromMountains) {
      text += `begins in the ${r.flowsFrom.adj} mountains `;
    } else {
      text += `enters <span class="name"></span> in the ${r.flowsFrom.noun} `;
    }

    // Flows to...
    if (r.flowsToCoast) {
      text += `and forms an estuary on the ${r.flowsTo.adj} coast. `;
    } else {
      text += `and flows toward the ${r.flowsTo.noun}. `;
    }
  } else {
    // More than one river
    text = `<span class="word-number capitalized">${
      realm.rivers.length
    }</span> rivers pass through <span class="name"></span>: ${Util.joinArrayWithAnd(
      realm.rivers.map((river) => {
        return `the <span class="capitalized">${Util.readWord(
          river.name
        )}</span>`;
      })
    )}. `;
  }

  if (realm.tributaries.length > 0) {
    text +=
      'Notable tributaries include the rivers ' +
      Util.joinArrayWithAnd(
        realm.tributaries.map((tributary) => {
          let prefix: string =
            tributary.prefix != null ? tributary.prefix.name + ' ' : '';
          return `<span class="capitalized">${prefix}</span><span class="capitalized">${Util.readWord(
            tributary.name
          )}</span>`;
        })
      ) +
      '.';
  }

  const el: HTMLElement = document.querySelector('.rivers-blurb')!;
  el.innerHTML = text;
}

function applyCoatBlurb() {
  let text: string = '';
  text = `<span>The design of <span class="name"></span>'s coat of arms resembles `;
  text += realm.coat.ordinary.description + `</span>.`;

  const el: HTMLElement = document.querySelector('.coat-of-arms-blurb')!;
  el.innerHTML = text;
}

function applyTinctureColors() {
  const el1: HTMLElement = document.querySelector('.tincture1-color')!;
  if (el1) el1.style.backgroundColor = realm.coat.tinctures[0].color;
  const el2: HTMLElement = document.querySelector('.tincture2-color')!;
  if (el2) el2.style.backgroundColor = realm.coat.tinctures[1].color;
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
