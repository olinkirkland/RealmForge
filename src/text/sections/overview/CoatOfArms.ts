import Realm from '../../../realm/Realm';
import Section from '../Section';

export default class CoatOfArms extends Section {
  constructor(realm: Realm, name: string) {
    super(realm, name);
  }

  public render(): HTMLElement {
    const el: HTMLElement = document.createElement('li');
    el.classList.add('li-coatOfArms');

    const artEl: HTMLElement = document.createElement('div');
    artEl.classList.add('coatOfArms');

    this.realm.heraldry.ordinary.svg.forEach((svg) => {
      // Draw layer
      artEl.innerHTML += `<svg
        xmlns="http://www.w3.org/2000/svg" fill="${
          this.realm.heraldry.tinctures[svg.tinctureIndex].color
        }" viewBox="0 0 12 12">
          <mask id="myMask">
            <path d="M 2 1 
            L 2 7
            c 0 6 8 6 8 0
            V 1 H 2" fill="white" />
          </mask>
          <path d="${svg.path}" mask="url(#myMask)" />
        </svg>`;
    });

    // Draw the charges
    if (this.realm.heraldry.chargeLayout) {
      let str: string = `<div class="charge-layout charge-layout-${this.realm.heraldry.chargeLayout.name}">`;
      for (let i: number = 0; i < this.realm.heraldry.chargeLayout.count; i++) {
        str += `<i class="fa-solid fa-${this.realm.heraldry.charge.url} ${
          'fa-' + this.realm.heraldry.chargeLayout.size
        }" style="color:${this.realm.heraldry.chargeTincture.color}"></i>`;
      }

      str += `</div>`;
      artEl.innerHTML += str;
    }

    el.appendChild(artEl);
    return el;
  }
}
