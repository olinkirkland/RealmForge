import Realm from '../../../realm/Realm';
import Section from '../Section';

export default class EcoregionsSection extends Section {
  constructor(realm: Realm, name: string) {
    super(realm, name);
  }

  public render(): HTMLElement {
    const el: HTMLElement = document.createElement('li');

    // Title
    const titleEl: HTMLElement = document.createElement('h3');
    titleEl.textContent = this.name;
    el.appendChild(titleEl);

    // Content
    const textEl: HTMLElement = document.createElement('p');

    // "The ecoregions of Nordland consist mostly of boreal-forest with a very small temperate-forest region in the west."
    if (this.realm.biomes.biomes.length == 1) {
      textEl.innerHTML = `The ecoregions of ${this.realm.name}`;
    } else {
    }

    el.append(textEl);
    return el;
  }
}
