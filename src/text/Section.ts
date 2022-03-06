import Realm from '../realm/Realm';

export default class Section {
  protected realm: Realm;
  protected name: string;

  constructor(realm: Realm, name: string) {
    this.realm = realm;
    this.name = name;
  }

  public render(): HTMLElement {
    const el: HTMLElement = document.createElement('li');
    const titleEl: HTMLElement = document.createElement('h3');
    titleEl.textContent = this.name;
    el.appendChild(titleEl);

    return el;
  }
}
