import Rand from '../../Rand';
import Realm from '../../realm/Realm';
import { Word, WordPart } from '../../toponymy/Language';
import Util from '../../Util';
import LocationModule, { Direction } from '../general/LocationModule';
import Module from '../Module';
import { Biome, BiomeType } from './BiomesModule';
import { Humidity } from './ClimateModule';
import { roots, suffixes } from './river-names.json';
import { Size } from './SizeModule';

export type River = {
  name: Word;
  flowsTo: Direction;
  flowsFrom: Direction;
  flowsToCoast: Biome | undefined;
  flowsFromMountains: Biome | undefined;
  tributaries: River[];
  prefix: WordPart | undefined;
  stem: River | undefined;
};

export default class RiversModule extends Module {
  public rivers!: River[];

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    this.rivers = [];

    // Pick a number of rivers
    let riverCount: number = 0;
    switch (this._realm.climate.humidity) {
      case Humidity.DRY:
        riverCount = Rand.between(0, 2, true);
        break;
      case Humidity.WET:
        riverCount = Rand.between(2, 4, true);
    }

    // For small realms, there should only be one river
    if (this._realm.size.sizeIndex < 2) {
      riverCount = 1;
    }

    // Add rivers
    console.log(`Add ${riverCount} rivers`);
    for (let i = 0; i < riverCount; i++) {
      this.addRiver();
    }
  }

  private addRiver() {
    // Determine the directions (to and from) the river will flow
    // Rivers tend to flow from mountains towards coasts, so factor this in if those biomes are present
    const mountains: Biome | undefined = this._realm.biomes.biomes.find(
      (b) => b.type == BiomeType.MOUNTAINS
    );

    const coast: Biome | undefined = this._realm.biomes.biomes.find(
      (b) => b.type == BiomeType.COAST
    );

    // Only use cardinal directions
    let availableDirections: Direction[] = Object.values(Direction).filter(
      (d) =>
        LocationModule.isCardinalDirection(d) &&
        (!coast || d != coast.direction) &&
        (!mountains || d != mountains.direction)
    );

    let flowsFrom: Direction =
      mountains && Rand.next() < 0.8
        ? mountains.direction
        : Rand.pick(availableDirections);

    // Rivers can't flow to the same place they're flowing from
    Util.arrayRemove(availableDirections, flowsFrom);

    let flowsTo: Direction = coast
      ? coast.direction
      : Rand.pick(availableDirections);

    const riverName = this.getRiverName();

    let river: River = {
      name: riverName,
      flowsTo: flowsTo,
      flowsFrom: flowsFrom,
      flowsToCoast: coast,
      flowsFromMountains: mountains,
      tributaries: [],
      prefix: undefined,
      stem: undefined
    };

    console.log(river);
  }

  private getRiverName(): Word {
    // Roots cannot be used by an existing river
    let validRoots: WordPart[] = roots.filter(
      (p) =>
        this.rivers.every((r) => r.name.root.text != p.text) &&
        this._realm.evaluateCondition(p.condition)
    );

    let validSuffixes: WordPart[] = suffixes.filter((p) =>
      this._realm.evaluateCondition(p.condition)
    );

    return { root: validRoots[0], suffix: validSuffixes[0] };
  }
}
