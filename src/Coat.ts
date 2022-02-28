import { Charge, ChargeLayout, Data, Ordinary, Tincture } from './Data';
import { Realm } from './Realm';
import Util from './Util';

export default class Coat {
  public ordinary: Ordinary;
  public tinctures: Tincture[];
  public chargeLayout: ChargeLayout | null;
  public chargeTincture!: Tincture | null;
  public charge!: Charge | null;

  constructor(realm: Realm, ordinary: Ordinary, tinctures: Tincture[]) {
    this.ordinary = ordinary;
    this.tinctures = tinctures;

    const layouts: ChargeLayout[] = Data.chargeLayouts.filter((l) =>
      ordinary.layouts.some((m) => m.name == l.name)
    );

    this.chargeLayout =
      ordinary.layouts.length > 0
        ? Util.randomWeightedValue(layouts, (l) => l.weight)
        : null;

    if (this.chargeLayout) {
      // Determine the charge's tincture
      const availableTinctures: Tincture[] = Data.tinctures.filter((t) => {
        // Heraldic rule: Never put a color on another color
        // and never put a metal on top of another metal
        const tinctureOverlapIndexes: number[] = ordinary.layouts.find(
          (l) => l.name == this.chargeLayout!.name
        )!.overlap;

        if (tinctureOverlapIndexes.length > 0) {
          const overlapTincture: Tincture =
            tinctures[tinctureOverlapIndexes[0]];
          return t.type != overlapTincture.type && !tinctures.includes(t);
        }

        return false;
      });

      this.chargeTincture = Util.randomValue(availableTinctures);

      // Pick a charge
      this.charge = Util.randomWeightedValue(Data.charges, (c) => c.weight);

      if (this.chargeLayout.count < 3) {
        this.charge.name = realm.sigilName;
        this.charge.weight = 0;
        this.charge.url = realm.sigilIcon;
      }
    }
  }

  draw(el: Element) {
    el.innerHTML = '';

    this.ordinary.svg.forEach((svg) => {
      // Draw layer
      el.innerHTML += `<svg
      xmlns="http://www.w3.org/2000/svg" fill="${
        this.tinctures[svg.tinctureIndex].color
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
    if (this.chargeLayout) {
      let str: string = `<div class="charge-layout charge-layout-${this.chargeLayout.name}">`;
      for (let i: number = 0; i < this.chargeLayout.count; i++) {
        str += `<i class="fa-solid fa-${this.charge!.url} ${
          'fa-' + this.chargeLayout!.size
        }" style="color:${this.chargeTincture!.color}"></i>`;
      }

      str += `</div>`;
      el.innerHTML += str;
    }
  }
}
