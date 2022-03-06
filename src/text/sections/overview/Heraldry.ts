import Realm from '../../../realm/Realm';
import Lang from '../../../util/Lang';
import Section from '../Section';

export default class Heraldry extends Section {
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

    // "The sigil of Nordland is a cross, which symbolizes piety."
    textEl.innerHTML = `<i class="fas fa-cross inline-icon"></i>`;

    textEl.innerHTML += `The sigil of ${Lang.capitalize(
      Lang.readWord(this.realm.realmName.name)
    )} is a ${this.realm.heraldry.sigil.name}, which symbolizes ${
      this.realm.heraldry.sigil.meaning
    }.`;

    el.append(textEl);
    return el;
  }
}
