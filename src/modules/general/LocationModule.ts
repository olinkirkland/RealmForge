import Module from '../Module';
import Util from '../../Util';
import Rand from '../../Rand';
import Realm from '../../realm/Realm';

export enum Direction {
  NORTH = 'north',
  NORTH_EAST = 'north-east',
  EAST = 'east',
  SOUTH_EAST = 'south-east',
  SOUTH = 'south',
  SOUTH_WEST = 'south-west',
  WEST = 'west',
  NORTH_WEST = 'north-west'
}

export default class LocationModule extends Module {
  locationWithinParentEntity: Direction = Direction.NORTH;
  directionToCoast: Direction | null = null;

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    this.locationWithinParentEntity = Rand.pick(Object.values(Direction));

    // Add direction tags south-west => south, west
    this._realm.addTag(this.locationWithinParentEntity);

    // 40% chance to be coastal

    if (Rand.next() < 0.4) {
      this.directionToCoast = this.locationWithinParentEntity;
      this._realm.addTag('coast');
    }
  }
}
