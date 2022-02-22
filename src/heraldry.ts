import { Ordinary, Tincture } from './data';
import { Realm } from './realm';

export class CoatOfArms {
  // public ordinary: Ordinary;
  // public tinctures: Tincture[];

  constructor() {}

  static generate(realm: Realm): CoatOfArms {
    let c: CoatOfArms = new CoatOfArms();

    return c;
  }
}
