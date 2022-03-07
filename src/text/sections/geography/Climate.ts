import Realm from '../../../realm/Realm';
import Lang from '../../../util/Lang';
import Section from '../Section';

export default class ClimateSection extends Section {
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

    // "The climate of Nordland is cold and wet, with brisk winters and mild, cool summers."
    textEl.innerHTML = `The climate of ${this.realm.name} is ${
      this.realm.climate.temperature
    } and ${
      this.realm.climate.humidity
    }, with ${this.realm.climate.summerAdjectives.join(
      ', '
    )} summers and ${this.realm.climate.winterAdjectives.join(', ')} winters.`;

    el.append(textEl);
    return el;
  }
}
