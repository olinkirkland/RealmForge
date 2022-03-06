import Realm from '../../../realm/Realm';
import Lang from '../../../util/Lang';
import Section from '../Section';

export default class Basics extends Section {
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

    // "Nordland is an imperial principality."
    textEl.innerHTML = `${Lang.capitalize(
      Lang.readWord(this.realm.realmName.name)
    )} is ${Lang.prependArticle(
      Lang.capitalize(this.realm.parentEntity.government.adj)
    )} ${Lang.capitalize(this.realm.government.rank)}.`;

    el.append(textEl);
    return el;
  }
}
