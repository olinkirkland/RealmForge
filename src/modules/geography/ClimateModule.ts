import Module from '../Module';
import Realm from '../../realm/Realm';
import Rand from '../../util/Rand';
import Util from '../../util/Util';
import { Direction } from '../general/LocationModule';
import { summer, winter } from './season-descriptions.json';

export enum Temperature {
  COLD = 'cold',
  TEMPERATE = 'temperate',
  WARM = 'warm'
}

export enum Humidity {
  WET = 'wet',
  DRY = 'dry'
}

export default class ClimateModule extends Module {
  public temperature!: Temperature;
  public humidity!: Humidity;
  public summerAdjectives!: string[];
  public winterAdjectives!: string[];

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    // Temperature: Default is TEMPERATE
    // If location is in the north, 60% chance COLD
    // If location is in the south, 60% chance WARM
    if (
      this.realm.location.locationWithinParentEntity.includes(Direction.NORTH)
    ) {
      this.temperature =
        Rand.next() < 0.6 ? Temperature.COLD : Temperature.TEMPERATE;
    } else if (
      this.realm.location.locationWithinParentEntity.includes(Direction.SOUTH)
    ) {
      this.temperature =
        Rand.next() < 0.6 ? Temperature.WARM : Temperature.TEMPERATE;
    } else {
      this.temperature = Temperature.TEMPERATE;
    }

    this.realm.addTag(this.temperature);

    // Humidity
    if (this.realm.tags.includes('coast')) {
      this.humidity = Humidity.WET;
    } else {
      this.humidity = Rand.pick(Object.values(Humidity));
    }

    this.realm.addTag(this.humidity);

    // Choose words to describe summer and winter
    this.summerAdjectives = this.chooseSeasonAdjectives(
      summer[this.temperature].concat(summer[this.humidity])
    );
    this.winterAdjectives = this.chooseSeasonAdjectives(
      winter[this.temperature].concat(winter[this.humidity])
    );
  }

  private chooseSeasonAdjectives(adjectives: string[]): string[] {
    let arr: string[] = [];

    for (let i = 0; i < 2; i++) {
      const adjective: string = Rand.pick(adjectives);
      arr.push(adjective);
      adjectives = Util.arrayRemove(adjectives, adjective);

      //  If the word is longer than 6 letters, step out of the loop
      //  Otherwise, 50% chance to step out of the loop
      if (Rand.next() < 0.5 || adjective.length > 6) break;
    }

    return arr;
  }
}
