import Realm from '../../realm/Realm';
import Lang, { Word, WordPart } from '../../util/Lang';
import Rand from '../../util/Rand';
import Util from '../../util/Util';
import LocationModule, { Direction } from '../general/LocationModule';
import Module from '../Module';
import { Biome, BiomeType } from './BiomesModule';
import { Humidity } from './ClimateModule';
import {
  riverSuffixes,
  roots,
  tributaryPrefixes,
  tributarySuffixes
} from './river-names.json';

export type River = {
  name: Word;
  flowsTo: Direction;
  flowsFrom: Direction;
  flowsToCoast: Biome | null;
  flowsFromMountains: Biome | null;
  tributaries: Tributary[];
};

export type Tributary = {
  name: Word;
  stem: River | null;
  prefix: WordPart | null;
  suffix: WordPart | null;
};

export default class RiversModule extends Module {
  public rivers!: River[];
  public tributaries!: Tributary[];

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    this.rivers = [];
    this.tributaries = [];

    // Pick a number of rivers
    let riverCount: number = 0;
    switch (this.realm.climate.humidity) {
      case Humidity.DRY:
        riverCount = Rand.between(0, 2, true);
        break;
      case Humidity.WET:
        riverCount = Rand.between(2, 4, true);
    }

    // For small realms, there should only be one river
    if (this.realm.size.sizeIndex < 2) {
      riverCount = 1;
    }

    // Add rivers
    for (let i = 0; i < riverCount; i++) this.addNewRiver();
  }

  private addNewRiver() {
    // Determine the directions (to and from) the river will flow
    // Rivers tend to flow from mountains towards coasts, so factor this in if those biomes are present
    const mountains: Biome | null =
      this.realm.biomes.biomes.find((b) => b.type == BiomeType.MOUNTAINS) ||
      null;

    const coast: Biome | null =
      this.realm.biomes.biomes.find((b) => b.type == BiomeType.COAST) || null;

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

    const riverName: Word = this.getRiverName();
    const tributaries: Tributary[] = this.getTributaries(riverName);

    let river: River = {
      name: riverName,
      flowsTo: flowsTo,
      flowsFrom: flowsFrom,
      flowsToCoast: coast,
      flowsFromMountains: mountains,
      tributaries: tributaries
    };

    this.rivers.push(river);
  }

  private getRiverName(): Word {
    // Roots cannot be used by an existing river
    let validRoots: WordPart[] = roots.filter(
      (p) =>
        this.rivers.every((r) => r.name.root.text != p.text) &&
        this.realm.evaluateCondition(p.condition)
    );

    let validSuffixes: WordPart[] = riverSuffixes.filter((p) =>
      this.realm.evaluateCondition(p.condition)
    );

    let riverName: Word;
    do {
      let root: WordPart = Rand.weightedPick(validRoots, (item) => item.points);
      let suffix: WordPart = Rand.weightedPick(
        validSuffixes,
        (item) => item.points
      );

      riverName = { root: root, suffix: suffix };
    } while (!this.isValidRiverName(riverName));

    return riverName;
  }

  private getTributaries(riverName: Word): Tributary[] {
    let tributaries: Tributary[] = [];
    const tributaryCount: number = Rand.between(0, 3);

    for (let i = 0; i < tributaryCount; i++) {
      const tributaryName: Word =
        i == 0 && Rand.next() < 0.6 ? riverName : this.getRiverName();

      // If the tributary name is the same as the stem, choose a tributary prefix and/or suffix
      let prefix: WordPart | null = null;
      let suffix: WordPart | null = null;
      do {
        if (riverName == tributaryName) {
          do {
            if (Rand.next() < 0.3)
              prefix = Rand.weightedPick(
                tributaryPrefixes,
                (item) => item.points
              );
            if (Rand.next() < 0.3)
              suffix = Rand.weightedPick(
                tributarySuffixes,
                (item) => item.points
              );
          } while (!prefix && !suffix);
        }
      } while (!this.isValidRiverName(tributaryName));

      let tributary: Tributary = {
        name: tributaryName,
        prefix: prefix,
        suffix: suffix,
        stem: null
      };

      // The more tributaries there are the lower the chance is to add a new one
      const max: number = 5;
      const remaining: number = max - this.tributaries.length;
      const chance: number = remaining * (1 / max) + 0.1; // Always give it +10% chance
      if (Rand.next() >= chance) continue;

      // Push to river tributary array (gets returned)
      tributaries.push(tributary);

      // Push to top level tributary array (of all tributaries)
      this.tributaries.push(tributary);
    }
    return tributaries;
  }

  private isValidRiverName(riverName: Word): boolean {
    // Can't have two vowels next to each other
    if (
      Lang.endsWithVowel(riverName.root.text) &&
      Lang.startsWithVowel(riverName.suffix.text)
    ) {
      return false;
    }

    // No two rivers or tributaries can have the same name
    const riverAndTributaryNames: Word[] = this.tributaries
      .map((t) => t.name)
      .concat(this.rivers.map((r) => r.name));

    if (riverAndTributaryNames.includes(riverName)) {
      return false;
    }

    // Rivers' roots cannot end in their suffix (Hennen-en, Frau-au, etc.)
    if (
      riverName.root.text.indexOf(riverName.suffix.text) ==
      riverName.root.text.length - riverName.suffix.text.length
    ) {
      return false;
    }

    return true;
  }
}
