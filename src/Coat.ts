import { Charge, ChargeLayout, Data, Ordinary, Tincture } from './Data';
import Util from './Util';

export default class Coat {
  public ordinary: Ordinary;
  public tinctures: Tincture[];
  public chargeLayout: ChargeLayout | null;
  public chargeTincture!: Tincture | null;
  public charge!: Charge | null;

  constructor(ordinary: Ordinary, tinctures: Tincture[]) {
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
    }
  }
}
