import Rand from '../Rand';
import Language from '../toponymy/Language';
import Util from '../Util';
import PageController from './PageController';

export default class HomePageController extends PageController {
  constructor() {
    super();

    // UI & Controls
    this.handleFavorites();
    this.handleNewRealmButton();
    this.handleCopyLinkButton();
    this.handleTweetButton();
    this.handleJSONButton();

    // Apply Content
    this.applyHeroImage();
    this.writeSections();
  }

  applyHeroImage() {
    // Choose a photo for the hero
    const heroEl: HTMLDivElement = document.getElementById(
      'hero'
    )! as HTMLDivElement;
    heroEl.setAttribute(
      'style',
      `background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${this.realm.heroImageUrl})`
    );
  }

  writeSections() {}

  handleNewRealmButton() {
    const btnStart: HTMLButtonElement = document.getElementById(
      'btnStart'
    )! as HTMLButtonElement;
    btnStart.addEventListener('click', () => {
      // This will refresh the page
      Rand.generateSeed();
      console.log(Rand.seed);
      let url: string = window.location.href;
      url = url.substring(0, url.indexOf('?'));
      if (window.location.href) window.location.replace(url + '?' + Rand.seed);
    });
  }

  handleCopyLinkButton() {
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
    btnCopyLink.addEventListener('mouseout', this.fadeOutShareLabel);
  }

  handleTweetButton() {
    const btnShareTwitter: HTMLButtonElement = document.getElementById(
      'btnShareTwitter'
    )! as HTMLButtonElement;
    btnShareTwitter.addEventListener('click', () => {
      Util.shareByTweet(this.realm);
    });
    btnShareTwitter.addEventListener('mouseover', () => {
      if (btnShareTwitter.hasAttribute('disabled')) return;
      document.getElementById('labelShare')!.innerHTML =
        'Share this Realm on Twitter';
      document.getElementById('labelShare')!.style.top = '0';
      document.getElementById('labelShare')!.style.opacity = '1';
    });
    btnShareTwitter.addEventListener('mouseout', this.fadeOutShareLabel);
  }

  handleJSONButton() {
    const btnJson: HTMLButtonElement = document.getElementById(
      'btnJson'
    )! as HTMLButtonElement;
    btnJson.addEventListener('click', () => {
      const url: string = window.location.href.replace(
        /(?<=.*)realm.html(?=.*)/,
        'json.html'
      );
      window.open(url, '_self');
    });

    btnJson.addEventListener('mouseover', () => {
      if (btnJson.hasAttribute('disabled')) return;
      document.getElementById('labelShare')!.innerHTML =
        "View this Realm's JSON data";
      document.getElementById('labelShare')!.style.top = '0';
      document.getElementById('labelShare')!.style.opacity = '1';
    });
    btnJson.addEventListener('mouseout', this.fadeOutShareLabel);
  }

  fadeInShareLabel() {
    document.getElementById('labelShare')!.style.top = '0';
    document.getElementById('labelShare')!.style.opacity = '1';
  }

  fadeOutShareLabel() {
    document.getElementById('labelShare')!.style.top = '0.4rem';
    document.getElementById('labelShare')!.style.opacity = '0';
  }

  handleFavorites() {
    // Get favorites from local storage
    if (!localStorage.getItem('favorites'))
      localStorage.setItem('favorites', JSON.stringify([]));
    let favorites: { name: string; id: string }[] = JSON.parse(
      localStorage.getItem('favorites')!
    );

    // Handle the favorites badges
    const favoritesEl: HTMLElement = document.getElementById('favorites')!;
    favoritesEl.addEventListener('click', (event) => {
      const removeId: string | null = (
        event.target as HTMLElement
      ).getAttribute('removeId');
      if (removeId) {
        favorites = favorites.filter((f) => f.id != removeId);
        event.preventDefault();
        localStorage.setItem('favorites', JSON.stringify(favorites));
        refreshFavorites();
      }
    });

    const btnFavorite: HTMLButtonElement = document.getElementById(
      'btnFavorite'
    )! as HTMLButtonElement;

    btnFavorite.addEventListener('click', () => {
      const f: { id: string; name: string } = {
        id: Rand.seed,
        name: Language.readWord(this.realm.realmName.name)
      };

      if (!favorites.some((v) => f.id == v.id)) {
        favorites.push(f);
      } else {
        favorites = favorites.filter((v) => v.id != f.id);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      refreshFavorites();
    });

    const btnFavoriteIcon: HTMLElement =
      document.querySelector('#btnFavorite i')!;
    const btnFavoriteText: HTMLElement =
      document.querySelector('#btnFavorite span')!;

    function refreshFavorites() {
      btnFavoriteIcon.classList.remove('fa-solid', 'fa-regular', 'selected');

      // Is the current realm already favorited?
      const isFavorite: boolean = favorites.some((f) => f.id == Rand.seed);
      btnFavoriteIcon.classList.add(isFavorite ? 'fa-solid' : 'fa-regular');
      btnFavoriteText.innerHTML = isFavorite
        ? 'This is one of your favorites'
        : 'Add this Realm to your favorites';

      // Create favorite badges
      favoritesEl.innerHTML = '';
      favorites.forEach((f) => {
        let url: string = window.location.href;
        url = url.substring(0, url.indexOf('?')) + '?' + f.id;

        favoritesEl.innerHTML += `
  <li class="favorite-badge">
    <a href="${url}" target="_self" class="btn btn--icon capitalized">${f.name}</a>
    <a class="btn btn--icon delete-favorite">
      <i class="fa-solid fa-xmark" removeId="${f.id}"></i>
    </a>
  </li>`;
      });
    }
  }
}
