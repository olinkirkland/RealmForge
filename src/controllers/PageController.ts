import Rand from '../Rand';
import Realm from '../realm/Realm';
import Util from '../Util';

export default class PageController {
  protected realm!: Realm;

  constructor() {
    this.handleDarkMode();
    this.handleSeed();

    // Realm generates itself
    this.realm = new Realm();

    console.log(Rand.seed);
    console.log(this.realm);

    this.fadeInSections();
  }

  handleSeed() {
    const url: string = window.location.href;
    const arr: RegExpMatchArray | null = url.match(/\?([a-z0-9,-]+)/);
    if (arr && arr.length > 1) {
      Rand.seed = arr[1];
    } else {
      Rand.generateSeed();
      let url: string = window.location.href;
      url = url.substring(0, url.indexOf('?'));
      if (window.location.href) window.location.replace(url + '?' + Rand.seed);
      // Page refreshes here, forcing the first condition
    }
  }

  fadeInSections() {
    // Delay intro animations
    const sectionEls: NodeList = document.querySelectorAll('.container');
    sectionEls.forEach((node: Node, index: number) => {
      const el: HTMLElement = node as HTMLElement;
      setTimeout(() => {
        el.classList.add('fade-in');
      }, 100 * index);
    });
  }

  handleDarkMode() {
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

      // Add the background-transition class to the body if it's not already there
      const body = document.querySelector('body')!;
      if (!body.classList.contains('background-transition')) {
        body.classList.add('background-transition');
      }
    });
  }
}
