import Coat from './Coat';
import { Data, Direction, NamePart, Ordinary, Tincture } from './Data';
import Util from './Util';

export type Biome = {
  type: string;
  size: string;
  direction: Direction;
};

export type River = {
  name: Word;
  flowsTo: Direction;
  flowsToCoast: Boolean;
  flowsFrom: Direction;
  flowsFromMountains: Boolean;
  tributaries: River[];
  prefix: NamePart | null;
  stem: River | null;
};

export type Word = {
  root: NamePart;
  suffix: NamePart;
};

export class Realm {
  public tags: string[] = ['any'];

  public realmName!: Word;
  public capitalCityName!: string;

  public sizeIndex!: number;
  public size!: string;

  public governmentRank!: string;
  public leaderTitle!: string;

  public parentEntityName!: string;
  public parentEntityAdj!: string;

  public directionWithinParentEntity!: Direction;

  public temperature!: string;
  public humidity!: string;

  public seasonSummer: string[] = [];
  public seasonWinter: string[] = [];

  public biomes: Biome[] = [];
  public rivers: River[] = [];
  public tributaries: River[] = [];

  public coast: boolean = false;
  public coastDirection!: Direction;

  public sigilName!: string;
  public sigilIcon!: string;
  public sigilMeaning!: string;
  public sigilPresentOnHeraldry!: boolean;

  public coat!: Coat;

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

    this.determineCoat();

    // console.log(this.tags);
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

    this.directionWithinParentEntity = dir;

    // Add direction tags south-west => south, west
    this.tags.push(...this.directionWithinParentEntity.noun.split('-'));

    // 40% chance to be coastal, 0% if location is middle
    this.coastDirection = this.directionWithinParentEntity;

    if (
      Util.rand() < 0.4 &&
      this.directionWithinParentEntity.noun != 'middle'
    ) {
      this.coast = true;

      while (
        !this.directionWithinParentEntity.noun
          .split('-')
          .includes(this.coastDirection.noun)
      ) {
        this.coastDirection = Util.randomValue(Data.directions);
      }
      this.tags.push('coast');
    }
  }

  public determineSize() {
    this.sizeIndex = Math.floor(Util.rand() * Data.sizes.length);
    this.size = Data.sizes[this.sizeIndex];

    if (this.sizeIndex == 0) {
      this.tags.push('city');
    } else {
      this.tags.push('region');
    }
  }

  public determineGovernmentRank() {
    let govt: { rank: string; ruler: string; size: number[] };
    do {
      govt = Util.randomValue(Data.governmentRanks);
    } while (!govt.size.includes(this.sizeIndex));

    this.governmentRank = govt.rank;
    this.tags.push(this.governmentRank);

    this.leaderTitle = govt.ruler;
  }

  public determineSigil() {
    let sigil: { name: string; icon: string; meanings: string[] } =
      Util.randomValue(Data.sigils);
    this.sigilName = sigil.name;
    this.sigilIcon = sigil.icon;
    this.sigilMeaning = Util.randomValue(sigil.meanings);
  }

  public determineCoat() {
    // Choose a coat of arms based on biomes and animals among other things

    // Choose an ordinary using chance as points
    let ordinary: Ordinary = Util.randomWeightedValue(
      Data.ordinaries,
      (item) => item.weight
    );

    // Choose exactly one metal and one color
    const metals: Tincture[] = Data.tinctures.filter((t) => t.type == 'metal');
    let tMetal: Tincture = Util.randomWeightedValue(
      metals,
      (item) => item.weight
    );

    const colors: Tincture[] = Data.tinctures.filter((t) => t.type == 'color');
    let tColor: Tincture = Util.randomWeightedValue(
      colors,
      (item) => item.weight
    );

    let tinctures: Tincture[] = [tMetal, tColor].sort((t) =>
      Util.rand() > 0.5 ? 1 : -1
    );

    this.coat = new Coat(this, ordinary, tinctures);
  }

  // Choose geography and climate based on the direction
  public determineClimate() {
    if (this.directionWithinParentEntity.noun.includes('north')) {
      this.temperature = 'cold';
    } else if (this.directionWithinParentEntity.noun.includes('south')) {
      this.temperature = 'warm';
    } else {
      this.temperature = 'temperate';
    }

    this.tags.push(this.temperature);

    this.humidity = Util.randomValue(['wet', 'dry']);
    if (this.coast) {
      this.humidity = 'wet';
    }

    this.tags.push(this.humidity);

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

      //  If the word is longer than 5 letters, 100% chance to step out of the loop
      //  Otherwise, 50% chance to step out of the loop
      if (Util.rand() < 0.5 || d.length > 6) break;
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

    availableBiomes = availableBiomes.filter((str) => {
      switch (this.temperature) {
        case 'warm':
          // Warm? Remove boreal-forest and tundra
          return !['boreal-forest', 'tundra'].includes(str);
          break;
      }
      return true;
    });

    // Add the primary biome
    let b: string = Util.randomValue(availableBiomes);

    // Reroll if mountains and larger than 1
    if (b == 'mountains' && this.sizeIndex > 1)
      b = Util.randomValue(availableBiomes);

    availableBiomes = Util.arrayRemove(availableBiomes, b);

    let availableSizeIndex: number = Data.sizes.indexOf(this.size) * 2;
    let sizeIndex: number = Math.floor(Util.rand() * availableSizeIndex);
    availableSizeIndex -= sizeIndex;
    let primaryBiome: Biome = {
      type: b,
      size: Data.sizes[Math.max(1, sizeIndex)],
      direction: Util.randomValue(Data.directions)
    };

    this.tags.push(primaryBiome.type);
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
      this.tags.push(secondaryBiome.type);
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
      let flowsFrom: Direction;
      let flowsFromMountains: boolean = false;
      // If the realm contains a mountain biome, rivers should flow from it 60% of the time
      const mountainBiome: Biome | undefined = this.biomes.find(
        (b) => b.type == 'mountain'
      );

      if (mountainBiome && Util.rand() < 0.6) {
        flowsFrom = mountainBiome.direction;
        flowsFromMountains = true;
      } else {
        flowsFrom = Util.randomValue(Data.directions);
      }

      let flowsTo: Direction;
      let flowsToCoast: boolean = false;
      // If the realm contains a coast, rivers should flow to it 60% of the time
      // Rivers cannot travel from one direction to a direction that contains a matching word:
      // north to west is OK, north to north-west is NOT, south to north-east is OK, south to south-east is NOT
      if (this.coast && Util.rand() < 0.6) {
        flowsTo = this.coastDirection;
        flowsToCoast = true;
      } else {
        do {
          flowsTo = Util.randomValue(Data.directions);
        } while (
          flowsTo == flowsFrom ||
          flowsFrom.noun
            .split('-')
            .some((d) => flowsTo.noun.split('-').includes(d))
        );
      }

      let riverName: Word = this.determineRiverName();
      let tributaries: River[] = this.determineTributaries(riverName);
      let river: River = {
        name: riverName,
        flowsTo: flowsTo,
        flowsToCoast: flowsToCoast,
        flowsFrom: flowsFrom,
        flowsFromMountains: flowsFromMountains,
        tributaries: tributaries,
        prefix: null,
        stem: null
      };

      this.rivers.push(river);
    }

    let arr: string[] = [];
    for (let i = 0; i < 20; i++)
      arr.push(Util.readWord(this.determineRiverName()));
  }

  private determineTributaries(riverName: Word): River[] {
    let tributaries: River[] = [];

    const tributaryCount: number = Math.floor(Util.rand(2, 5));
    for (let i = 0; i < tributaryCount; i++) {
      let tributary: River = {
        name:
          i == 0 && Util.rand() < 0.6 ? riverName : this.determineRiverName(),
        flowsTo: Util.randomValue(Data.directions),
        flowsToCoast: false,
        flowsFrom: Util.randomValue(Data.directions),
        flowsFromMountains: false,
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

      // The more tributaries there are the lower the chance is to add a new one
      const max: number = 5;
      const remaining: number = max - this.tributaries.length;
      const chance: number = remaining * (1 / max) + 0.1; // Always give it +10% chance
      // console.log(
      //   Math.floor(chance * 100) +
      //     '% chance due to ' +
      //     remaining +
      //     ' possible tributaries'
      // );

      if (Util.rand() >= chance) continue;

      // Push to river tributary array (gets returned)
      tributaries.push(tributary);

      // Push to realm tributary array
      this.tributaries.push(tributary);
    }

    return tributaries;
  }

  private areNamePartTagsValid(namePart: NamePart) {
    let valid: boolean = true;
    // Have at least one matching tag if tagRule is OR
    if (namePart.tagRule == 'AND') {
      valid = namePart.tags.every((tag) => this.tags.includes(tag));
      if (!valid) return valid;
    }

    // Have all matching tags if tagRule is AND
    if (namePart.tagRule == 'OR') {
      valid = namePart.tags.some((tag) => this.tags.includes(tag));
      if (!valid) return valid;
    }

    return valid;
  }

  private countRiverValidLoop: number = 0;
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
        let valid: boolean = this.rivers.every(
          (river) =>
            river.name.root.name != namePart.name && namePart.asRoot > 0
        );
        if (!valid) return valid;

        valid = this.areNamePartTagsValid(namePart);
        if (!valid) return valid;

        return valid;
      });

    let root: NamePart = Util.randomWeightedValue(
      validRoots,
      (item) => item.asRoot
    );

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

    this.countRiverValidLoop = 0;
    let riverName: Word;
    do {
      let suffix: NamePart = Util.randomWeightedValue(
        validSuffixes,
        (item) => item.asSuffix
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
    this.countRiverValidLoop++;
    if (this.countRiverValidLoop > 200) {
      // If you've tried 200 times to get a valid river name with the same root, abandon the root and start over
      console.log(
        `No valid river name found with root '${r.root.name}', rerolling root...`
      );
      return this.determineRiverName();
    }
    let valid: boolean = true;

    // Can't have two vowels next to each other
    if (
      Util.endsWithVowel(r.root.name) &&
      Util.startsWithVowel(r.suffix.name)
    ) {
      valid = false;
    }

    // No two rivers or tributaries can have the same name
    const tributaryNames: string[] = this.tributaries
      .concat(this.rivers)
      .map((river) => Util.readWord(river.name));

    if (tributaryNames.includes(Util.readWord(r))) {
      valid = false;
    }

    // Rivers' roots cannot end in their suffix (Hennen-en, Fei-ei, etc.)
    if (
      r.root.name.indexOf(r.suffix.name) ==
      r.root.name.length - r.suffix.name.length
    ) {
      valid = false;
    }

    return valid;
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
        let valid: boolean =
          namePart.asRoot > 0 && this.areNamePartTagsValid(namePart);
        if (!valid) return valid;

        return valid;
      });

    let root: NamePart = {
      ...Util.randomWeightedValue(validRoots, (item) => item.asRoot)
    };

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
      let valid: boolean =
        namePart.asSuffix > 0 && this.areNamePartTagsValid(namePart);
      if (!valid) return valid;

      return valid;
    });

    do {
      let suffix: NamePart = Util.randomWeightedValue(
        validSuffixes,
        (item) => item.asSuffix
      );
      if (suffix.variations) {
        suffix.variations.push(suffix.name);
        suffix.name = Util.randomValue(suffix.variations);
      }

      this.realmName = { root: root, suffix: suffix };
    } while (!this.isRealmNameValid(this.realmName));
  }

  private isRealmNameValid(word: Word): boolean {
    let valid: boolean = true;

    // Root and suffix can't be the same
    if (word.root == word.suffix) return false;

    return valid;
  }

  private determineCities() {}
}
