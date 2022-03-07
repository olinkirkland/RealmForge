import { Size } from '../../../modules/geography/SizeModule';
import Realm from '../../../realm/Realm';
import Lang from '../../../util/Lang';
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
      textEl.innerHTML = `${this.realm.name} consists entirely of ${this.realm.biomes.biomes[0].name}.`;
    } else {
      textEl.innerHTML = `The ecoregions of ${this.realm.name} include `;
      // todo: sort by size
      const arr: string[] = this.realm.biomes.biomes.map((b) => {
        if (b.size == Size.MEDIUM)
          return `${Lang.prependArticle(b.name)} in the ${b.direction}`;
        else
          return `${Lang.prependArticle(b.size)} ${b.name} in the ${
            b.direction
          }`;
      });

      textEl.innerHTML += `${Lang.joinArrayWithAnd(arr)}.`;
    }

    el.append(textEl);
    return el;
  }
}
