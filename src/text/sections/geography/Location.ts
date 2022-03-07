import BiomesModule, {
  BiomeType
} from '../../../modules/geography/BiomesModule';
import Realm from '../../../realm/Realm';
import Lang from '../../../util/Lang';
import Section from '../Section';

export default class LocationSection extends Section {
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

    // "Nordland is a very small free city located on the coast in the north-eastern part of the Holy Empire."
    textEl.innerHTML = `${Lang.capitalize(
      Lang.readWord(this.realm.realmName.name)
    )} is a ${this.realm.size.size} ${Lang.capitalize(
      this.realm.government.rank
    )} located ${
      this.realm.tags.includes(BiomeType.COAST) ? `on the coast ` : ``
    }in the ${
      this.realm.location.locationWithinParentEntity
    }ern part of the ${Lang.capitalize(this.realm.parentEntity.name)}.`;

    el.append(textEl);
    return el;
  }
}
