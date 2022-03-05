import Rand from '../Rand';
import Language from '../toponymy/Language';
import PageController from './PageController';

export default class HomePageController extends PageController {
  constructor() {
    super();

    this.handleControls();
    this.handleFavorites();
  }

  handleControls() {}

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
