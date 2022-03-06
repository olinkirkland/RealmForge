import Realm from '../../realm/Realm';
import Lang from '../../util/Lang';

export default class Section {
  protected realm: Realm;
  protected name: string;

  constructor(realm: Realm, name: string) {
    this.realm = realm;
    this.name = name;
  }

  public render(): HTMLElement {
    const el: HTMLElement = document.createElement('li');

    // Title
    const titleEl: HTMLElement = document.createElement('h3');
    titleEl.textContent = this.name;
    el.appendChild(titleEl);

    // Placeholder content
    const textEl: HTMLElement = document.createElement('p');
    textEl.textContent = Lang.lorem();
    el.append(textEl);

    return el;
  }
}
