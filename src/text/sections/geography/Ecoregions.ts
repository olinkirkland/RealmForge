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

    // ""
    textEl.innerHTML = ``;

    el.append(textEl);
    return el;
  }
}
