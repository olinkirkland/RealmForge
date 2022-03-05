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

    // Update favorites
    const favoritesEl: HTMLElement = document.getElementById('favorites')!;
    favoritesEl.addEventListener('click', (event) => {
      const key: string | null = (event.target as HTMLElement).getAttribute(
        'key'
      );
      if (key) {
        favorites = favorites.filter((f) => f.id != key);
        event.preventDefault();
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavorites();
      }
    });

    const btnFavorite: HTMLButtonElement = document.getElementById(
      'btnFavorite'
    )! as HTMLButtonElement;

    const btnFavoriteIcon: HTMLElement =
      document.querySelector('#btnFavorite i')!;
    const btnFavoriteText: HTMLElement =
      document.querySelector('#btnFavorite span')!;

    function updateFavorites() {
      // Update the favorites button
      btnFavoriteIcon.classList.remove('fa-solid', 'fa-regular', 'selected');

      const isFavorite: boolean = favorites.some((f) => f.id == Util.seed);
      btnFavoriteIcon.classList.add(isFavorite ? 'fa-solid' : 'fa-regular');
      btnFavoriteText.innerHTML = isFavorite
        ? 'This is one of your favorites'
        : 'Add this Realm to your favorites';

      favoritesEl.innerHTML = '';
      favorites.forEach((f) => {
        let url: string = window.location.href;
        url = url.substring(0, url.indexOf('?')) + '?' + f.id;

        favoritesEl.innerHTML += `
  <li class="favorite-badge">
    <a href="${url}" target="_self" class="btn btn--icon capitalized">${f.name}</a>
    <a class="btn btn--icon delete-favorite">
      <i class="fa-solid fa-xmark" key="${f.id}"></i>
    </a>
  </li>`;
      });
    }
  }
}
