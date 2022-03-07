import { River } from '../../../modules/geography/RiversModule';
import Realm from '../../../realm/Realm';
import Lang from '../../../util/Lang';
import Util from '../../../util/Util';
import Section from '../Section';

export default class RiversSection extends Section {
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

    // "Two rivers pass through Nordland: the Holz and the Schwanau. Notable tributaries include the rivers Dunkler Holz, Stuten, and Schwan."
    let text: string = '';

    if (this.realm.rivers.rivers.length == 0) {
      // No rivers
      text = `No notable rivers pass through ${this.realm.name}.`;
    } else if (this.realm.rivers.rivers.length == 1) {
      // One river
      let r: River = this.realm.rivers.rivers[0];
      text = `The main river that flows through ${
        this.realm.name
      } is the ${Lang.capitalize(Lang.readWord(r.name))}. `;

      // Flows from...
      text += `The ${Lang.capitalize(Lang.readWord(r.name))} `;
      if (r.flowsFromMountains) {
        text += `begins in the ${r.flowsFrom} mountains `;
      } else {
        text += `enters ${this.realm.name} in the ${r.flowsFrom} `;
      }

      // Flows to...
      if (r.flowsToCoast) {
        text += `and forms an estuary on the ${r.flowsTo} coast. `;
      } else {
        text += `and flows toward the ${r.flowsTo}. `;
      }
    } else {
      // More than one river
      text = `${Lang.capitalize(
        Lang.wordFromNumber(this.realm.rivers.rivers.length)
      )} rivers pass through ${this.realm.name}: ${Lang.joinArrayWithAnd(
        this.realm.rivers.rivers.map((r) => {
          return `the ${Lang.capitalize(Lang.readWord(r.name))}</span>`;
        })
      )}. `;
    }

    if (this.realm.rivers.tributaries.length > 0) {
      text +=
        'Notable tributaries include the rivers ' +
        Lang.joinArrayWithAnd(
          this.realm.rivers.tributaries.map((t) => {
            if (t.prefix)
              return `${Lang.capitalize(t.prefix.text)} ${Lang.capitalize(
                Lang.readWord(t.name)
              )}`;
            else return `${Lang.capitalize(Lang.readWord(t.name))}`;
          }),
          ', ',
          ', and the '
        ) +
        '.';
    }

    textEl.innerHTML = text;

    el.append(textEl);
    return el;
  }
}
