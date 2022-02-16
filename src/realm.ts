import { Data, Direction, NamePart } from './data';
import { Util } from './util';

export type Biome = {
  type: string;
  size: string;
  direction: Direction;
};

export type River = {
  name: Word;
  flowsTo: Direction;
  flowsFrom: Direction;
  tributaries: River[];
  prefix: NamePart | null;
  stem: River | null;
};

export type Word = {
  root: NamePart;
  suffix: NamePart;
};

export class Realm {
  private tags: string[] = ['any'];

  public realmName!: Word;
  public capitalCityName: string = 'highbridge';

  public sizeIndex: number = 0;
  public size: string = 'small';

  public governmentRank: string = 'territory';
  public leaderTitle: string = 'lord';

  public parentEntityName: string = 'the empire';
  public parentEntityAdj: string = 'imperial';

  public directionWithinParentEntity: string = 'south';
  public directionAdjWithinParentEntity: string = 'south';

  public temperature: string = 'temperate';
  public humidity: string = 'wet';

  public seasonSummer: string[] = ['long', 'harsh'];
  public seasonWinter: string[] = ['long', 'mild'];

  public biomes: Biome[] = [];
  public rivers: River[] = [];
  public tributaries: River[] = [];

  public coastal: boolean = false;

  public sigilName: string = 'dove';
  public sigilIcon: string = 'dove';
  public sigilMeaning: string = 'peace';
  public sigilPresentOnHeraldry: boolean = false;

  constructor() {
    this.determineParentEntity();
    this.determineDirection();
    this.determineSize();
    this.determineGovernmentRank();
    this.determineClimate();
    this.determineBiomes();
    this.determineRivers();
    this.determineSigil();

    this.determineRealmName();
    this.determineCities();

    this.determineHeraldry();
  }

  public determineParentEntity() {
    let arr: string[] = ['the'];

    if (Util.rand() < 0.8) {
      let firstDescriptor: string = Util.randomValue(
        Data.parentEntityDescriptorsBefore
      );
      arr.push(firstDescriptor);
      if (Util.rand() < 0.2) {
        let secondDescriptor: string = Util.randomValue(
          Data.parentEntityDescriptorsBefore
        );
        if (secondDescriptor != firstDescriptor) arr.push(secondDescriptor);
      }
    }

    let government: { noun: string; adj: string } = Util.randomValue(
      Data.parentEntityGovernments
    );
    this.parentEntityName = government.noun;
    this.parentEntityAdj = government.adj;
    arr.push(this.parentEntityName);

    if (Util.rand() < 0.1) {
      arr.push(Util.randomValue(Data.parentEntityDescriptorsAfter));
    }

    this.parentEntityName = arr.join(' ');
  }

  public determineDirection() {
    const dir: { noun: string; adj: string } = Util.randomValue(
      Data.directions
    );

    this.directionWithinParentEntity = dir.noun;
    this.directionAdjWithinParentEntity = dir.adj;

    // 40% chance to be coastal, 0% if location is middle
    this.coastal =
      Util.rand() < 0.4 && this.directionWithinParentEntity != 'middle';
  }

  public determineSize() {
    this.sizeIndex = Math.floor(Util.rand() * Data.sizes.length);
    this.size = Data.sizes[this.sizeIndex];
  }

  public determineGovernmentRank() {
    let govt: { rank: string; ruler: string; size: number[] };
    do {
      govt = Util.randomValue(Data.governmentRanks);
    } while (!govt.size.includes(this.sizeIndex));

    this.governmentRank = govt.rank;
    this.leaderTitle = govt.ruler;
  }

  public determineSigil() {
    let sigil: { name: string; icon: string; meanings: string[] } =
      Util.randomValue(Data.sigils);
    this.sigilName = sigil.name;
    this.sigilIcon = sigil.icon;
    this.sigilMeaning = Util.randomValue(sigil.meanings);
    this.sigilPresentOnHeraldry = Util.rand() < 0.2;
  }

  public determineHeraldry() {
    // Choose heraldry based on biomes and animals among other things
  }

  public determineClimate() {
    // Choose geography and climate based on the direction
    if (this.directionWithinParentEntity.includes('north')) {
      this.temperature = 'cold';
    } else if (this.directionWithinParentEntity.includes('south')) {
      this.temperature = 'warm';
    } else {
      this.temperature = 'temperate';
    }

    this.humidity = Util.randomValue(['wet', 'dry']);
    if (this.coastal) {
      this.humidity = 'wet';
    }

    // Description of winter
    this.seasonWinter = [];
    const winter: any = Data.seasonDescriptors.winter;
    let availableWinterDescriptors: string[] = winter[this.humidity].concat(
      winter[this.temperature]
    );

    for (let i = 0; i < 2; i++) {
      const d: string = Util.randomValue(availableWinterDescriptors);
      this.seasonWinter.push(d);
      availableWinterDescriptors = Util.arrayRemove(
        availableWinterDescriptors,
        d
      );
      if (Util.rand() < 0.5) break;
    }

    // Description of summer
    this.seasonSummer = [];
    const summer: any = Data.seasonDescriptors.summer;
    let availableSummerDescriptors: string[] = summer[this.humidity].concat(
      summer[this.temperature]
    );

    for (let i = 0; i < 2; i++) {
      const d: string = Util.randomValue(availableSummerDescriptors);
      if (this.seasonWinter.includes(d)) {
        continue;
      }
      this.seasonSummer.push(d);
      availableSummerDescriptors = Util.arrayRemove(
        availableSummerDescriptors,
        d
      );
      if (Util.rand() < 0.5) break;
    }
  }

  public determineBiomes() {
    // mountain | boreal-forest | temperate-forest | grassland | tundra

    let availableBiomes: string[] = Data.biomes.filter((str) => {
      switch (this.humidity) {
        case 'dry':
          // Dry? Remove boreal-forest and temperate-forest
          return !['boreal-forest', 'temperate-forest'].includes(str);
          break;
        case 'wet':
          // Wet? Remove grassland and tundra
          return !['grassland', 'tundra'].includes(str);
          break;
      }

      return true;
    });

    // Add the primary biome, reroll once if mountains
    let b: string = Util.randomValue(availableBiomes);
    if (b == 'mountains') b = Util.randomValue(availableBiomes);

    availableBiomes = Util.arrayRemove(availableBiomes, b);

    let availableSizeIndex: number = Data.sizes.indexOf(this.size) * 2;
    let sizeIndex: number = Math.floor(Util.rand() * availableSizeIndex);
    availableSizeIndex -= sizeIndex;
    let primaryBiome: Biome = {
      type: b,
      size: Data.sizes[Math.max(1, sizeIndex)],
      direction: Util.randomValue(Data.directions)
    };

    this.biomes.push(primaryBiome);

    if (Util.rand() < 0.6) {
      // Choose a direction that isn't the same direction as the primary Biome's direction
      // Also cannot be a combined direction like north-east or south-west, must be one of the four cardinal directions or 'middle'
      let secondaryDirection: { noun: string; adj: string };
      do {
        secondaryDirection = Util.randomValue(Data.directions);
      } while (
        secondaryDirection.noun == primaryBiome.direction.noun ||
        secondaryDirection.noun.includes('-')
      );

      let secondaryBiome: Biome = {
        type: Util.randomValue(availableBiomes),
        size: Data.sizes[Math.floor(Util.rand() * availableSizeIndex)],
        direction: secondaryDirection
      };

      // Add a second biome
      this.biomes.push(secondaryBiome);
    }
  }

  public determineRivers() {
    let pickRiverCount: { min: number; max: number } = { min: 0, max: 0 };
    switch (this.humidity) {
      case 'dry':
        pickRiverCount.min = 0;
        pickRiverCount.max = 2;
        break;
      case 'temperate':
        pickRiverCount.min = 1;
        pickRiverCount.max = 4;
        break;
      case 'wet':
        pickRiverCount.min = 3;
        pickRiverCount.max = 5;
        break;
    }

    let riverCount: number = Math.floor(
      Util.rand(pickRiverCount.min, pickRiverCount.max)
    );

    // For small realms (less than 3 on the sizeIndex) there shouldn't be more than two rivers passing through
    if (this.sizeIndex < 3) {
      riverCount = Math.min(riverCount, 2);
    }

    // Add rivers
    for (let i = 0; i < riverCount; i++) {
      // If the realm contains a mountain biome, rivers should flow from it

      // If the realm contains a coast, rivers should flow to it
      let flowsFrom: Direction;
      let flowsTo: Direction;
      do {
        flowsFrom = Util.randomValue(Data.directions);
        flowsTo = Util.randomValue(Data.directions);
      } while (
        flowsTo == flowsFrom ||
        flowsTo.noun == 'middle' ||
        flowsFrom.noun == 'middle'
      );

      let riverName: Word = this.determineRiverName();
      let tributaries: River[] = this.determineTributaries(riverName);
      let river: River = {
        name: riverName,
        flowsTo: flowsTo,
        flowsFrom: flowsFrom,
        tributaries: tributaries,
        prefix: null,
        stem: null
      };

      this.rivers.push(river);
      this.tributaries.push(...tributaries);
    }

    let arr: string[] = [];
    for (let i = 0; i < 20; i++)
      arr.push(Util.readWord(this.determineRiverName()));
  }

  private determineTributaries(riverName: Word): River[] {
    let tributaries: River[] = [];
    let validSuffixes: NamePart[] = Data.riverNameParts.filter((namePart) => {
      // Have at least one point as a suffix name part
      // Have at least one matching tag

      return (
        namePart.asSuffix > 0 &&
        namePart.tags.some((tag) => this.tags.includes(tag))
      );
    });

    const tributaryCount: number = Math.floor(Util.rand(1, 4));
    for (let i = 0; i < tributaryCount; i++) {
      let tributary: River = {
        name:
          i == 0 && Util.rand() < 0.6
            ? this.determineTributaryName(riverName)
            : this.determineRiverName(),
        flowsTo: Util.randomValue(Data.directions),
        flowsFrom: Util.randomValue(Data.directions),
        tributaries: [],
        prefix: null,
        stem: null
      };

      // If the tributary name is the same as the stem, choose a tributary prefix
      if (Util.readWord(riverName) == Util.readWord(tributary.name)) {
        tributary.prefix = Util.randomValue(
          Data.tributaryNameParts.filter((namePart) => {
            return namePart.tags.includes('tributary-prefix');
          })
        );
      }

      tributaries.push(tributary);
    }

    return tributaries;
  }

  private determineRiverName(): Word {
    /**
     * Determine root
     */

    let validRoots: NamePart[] = Data.riverNameParts
      .concat(Data.faunaNameParts)
      .concat(Data.floraNameParts)
      .filter((namePart) => {
        // Root cannot be used by another river
        // Have at least one point as a root name part
        // Have at least one matching tag

        return (
          this.rivers.every((river) => river.name.root.name != namePart.name) &&
          namePart.asRoot > 0 &&
          namePart.tags.some((tag) => this.tags.includes(tag))
        );
      });

    let root: NamePart = this.chooseNamePartByPoints(validRoots, 'asRoot');

    if (root.variations) {
      root.variations.push(root.name);
      root.name = Util.randomValue(root.variations);
    }

    /**
     * Determine suffix
     */

    let validSuffixes: NamePart[] = Data.riverNameParts.filter((namePart) => {
      // Have at least one point as a suffix name part
      // Have at least one matching tag

      return (
        namePart.asSuffix > 0 &&
        namePart.tags.some((tag) => this.tags.includes(tag))
      );
    });

    let riverName: Word;
    do {
      let suffix: NamePart = this.chooseNamePartByPoints(
        validSuffixes,
        'asSuffix'
      );
      if (suffix.variations) {
        suffix.variations.push(suffix.name);
        suffix.name = Util.randomValue(suffix.variations);
      }

      riverName = { root: root, suffix: suffix };
    } while (!this.isRiverNameValid(riverName));

    return riverName;
  }

  private isRiverNameValid(r: Word) {
    let valid: boolean = true;

    // Can't have two vowels next to each other
    if (
      Util.endsWithVowel(r.root.name) &&
      Util.startsWithVowel(r.suffix.name)
    ) {
      valid = false;
    }

    return valid;
  }

  private determineTributaryName(riverName: Word): Word {
    return riverName;

    // Take the root from the river name
    let root: NamePart = riverName.root;

    let validTributarySuffixes: NamePart[] = Data.tributaryNameParts;

    let tributaryName: Word;
    do {
      let suffix: NamePart = this.chooseNamePartByPoints(
        validTributarySuffixes,
        'asSuffix'
      );
      if (suffix.variations) {
        suffix.variations.push(suffix.name);
        suffix.name = Util.randomValue(suffix.variations);
      }

      tributaryName = { root: root, suffix: suffix };
    } while (!this.isRiverNameValid(tributaryName));

    return tributaryName;
  }

  private chooseNamePartByPoints(
    nameParts: NamePart[],
    pointsProperty: 'asSuffix' | 'asRoot'
  ) {
    const points: number = nameParts.reduce((total, r) => {
      return total + r[pointsProperty];
    }, 0);

    let chance: number = Util.rand(0, points);
    let namePart: NamePart = nameParts[0];
    let madeChoice: boolean = false;
    nameParts.forEach((r) => {
      if (!madeChoice) {
        chance -= r[pointsProperty];
        if (chance <= 0) {
          namePart = r;
          madeChoice = true;
        }
      }
    });

    return namePart;
  }

  private determineRealmName() {
    /**
     * Determine root
     */

    let validRoots: NamePart[] = Data.placeNameParts
      .concat(Data.rulersNameParts)
      .concat(Data.faunaNameParts)
      .concat(Data.floraNameParts)
      .filter((namePart) => {
        // Have at least one point as a root name part
        // Have at least one matching tag
        return namePart.tags.some((tag) => this.tags.includes(tag));
      });

    let root: NamePart = this.chooseNamePartByPoints(validRoots, 'asRoot');

    if (root.variations) {
      root.variations.push(root.name);
      root.name = Util.randomValue(root.variations);
    }

    /**
     * Determine suffix
     */

    let validSuffixes: NamePart[] = Data.placeNameParts.filter((namePart) => {
      // Have at least one point as a suffix name part
      // Have at least one matching tag

      return (
        namePart.asSuffix > 0 &&
        namePart.tags.some((tag) => this.tags.includes(tag))
      );
    });

    do {
      let suffix: NamePart = this.chooseNamePartByPoints(
        validSuffixes,
        'asSuffix'
      );
      if (suffix.variations) {
        suffix.variations.push(suffix.name);
        suffix.name = Util.randomValue(suffix.variations);
      }

      this.realmName = { root: root, suffix: suffix };
    } while (!this.isRealmNameValid(this.realmName));
  }

  private isRealmNameValid(word: Word): boolean {
    return true;
  }

  private determineCities() {}
}
