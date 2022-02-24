import { Ordinary, Tincture } from './data';
import { Util } from './util';

export class Coat {
  public ordinary: Ordinary;
  public tinctures: Tincture[];
  public charge: string | null;
  // public chargeArrangement: string;

  constructor(ordinary: Ordinary, tinctures: Tincture[]) {
    this.ordinary = ordinary;
    this.tinctures = tinctures;

    this.charge = Util.rand() < 0.2 ? 'horse' : null;
  }
}
