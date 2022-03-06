import Realm from '../../realm/Realm';
import Rand from '../../util/Rand';
import Module from '../Module';
import {
  charges,
  colorTinctures,
  layouts,
  metalTinctures,
  ordinaries
} from './heraldry.json';
import { sigils } from './sigils.json';

export type Sigil = {
  name: string;
  icon: string;
  meaning: string[] | string;
};

export type Ordinary = {
  name: string;
  points: number;
  description: string;
  layouts: { name: string; overlap: number[] }[];
  svg: { tinctureIndex: number; path: string }[];
};

export type Tincture = {
  name: string;
  points: number;
  color: string;
  type: string;
};

export type ChargeLayout = {
  name: string;
  points: number;
  count: number;
  description: string;
  size: string;
};

export type Charge = {
  name: string;
  points: number;
  url: string;
};

export default class HeraldryModule extends Module {
  public sigil!: Sigil;
  public ordinary!: Ordinary;
  public tinctures!: Tincture[];
  public chargeLayout!: ChargeLayout | null;
  public charge!: Charge;
  public chargeTincture!: Tincture;

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    // Sigil
    this.sigil = Rand.pick(sigils);
    this.sigil.meaning = Rand.pick(this.sigil.meaning as string[]);

    // Ordinary
    this.ordinary = Rand.weightedPick(ordinaries, (item) => item.points);

    // Choose exactly one metal tincture and one color tincture
    let metal: Tincture = Rand.weightedPick(
      metalTinctures,
      (item) => item.points
    );

    let color: Tincture = Rand.weightedPick(
      colorTinctures,
      (item) => item.points
    );

    this.tinctures = [metal, color].sort((t) => (Rand.next() > 0.5 ? 1 : -1));

    // Charge Layout
    const availableLayouts: ChargeLayout[] = layouts.filter((l) =>
      this.ordinary.layouts.some((m) => m.name == l.name)
    );

    this.chargeLayout =
      this.ordinary.layouts.length > 0
        ? Rand.weightedPick(availableLayouts, (l) => l.points)
        : null;

    if (!this.chargeLayout) return;

    // Charge tincture
    // Heraldic rule: Never put a color on another color
    // and never put a metal on top of another metal
    const tinctureOverlapIndexes: number[] = this.ordinary.layouts.find(
      (l) => l.name == this.chargeLayout!.name
    )!.overlap;

    let availableTinctures: Tincture[] = metalTinctures;
    if (tinctureOverlapIndexes.length > 0) {
      const overlapTincture: Tincture =
        this.tinctures[tinctureOverlapIndexes[0]];
      if (overlapTincture.type == 'metal') {
        availableTinctures = colorTinctures;
      }
    }

    this.chargeTincture = Rand.pick(availableTinctures);

    // Pick a charge
    this.charge = Rand.weightedPick(charges, (item) => item.points);

    if (this.chargeLayout.count < 3) {
      this.charge = { name: this.sigil.name, points: 0, url: this.sigil.icon };
    }

    // Is it the sigil used on the heraldry? Add a tag if it is
    if (this.charge!.name == this.sigil.name && this.chargeLayout)
      this.realm.addTag('sigilAsCharge');
  }
}
