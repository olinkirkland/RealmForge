import Module from '../Module';
import Realm from '../../realm/Realm';
import { governments } from './governments.json';
import Rand from '../../Rand';

export type Government = { rank: string; ruler: string; size: number[] };

export default class GovernmentModule extends Module {
  public rank!: string;
  public ruler!: string;

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    // Government
    let government!: Government;
    do {
      government = Rand.pick(governments);
    } while (!government.size.includes(this.realm.size.sizeIndex));

    this.rank = government.rank;
    this.ruler = government.ruler;

    this.realm.tags.push(this.rank);
  }
}
