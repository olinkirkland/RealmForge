import Module from '../Module';
import Realm from '../../realm/Realm';
import Rand from '../../Rand';

export enum Size {
  VERY_SMALL = 'very small',
  SMALL = 'small',
  MEDIUM_SIZED = 'medium-sized',
  LARGE = 'large',
  VERY_LARGE = 'very large'
}

export class SizeModule extends Module {
  size: Size = Size.SMALL;

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    this.size = Rand.pick(Object.keys(Size));
    this._realm.addTag(this.size == Size.VERY_SMALL ? 'city' : 'region');
  }
}
