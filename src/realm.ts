import { Data } from './data';
import { Util } from './util';

type Biome = { type: string; size: string; direction: string };
export class Realm {
  public name: string = 'oldmarch';
  public adj: string = 'oldmarch';
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
  public coastal: boolean = false;

  public sigilName: string = 'dove';
  public sigilIcon: string = 'dove';
  public sigilMeaning: string = 'peace';

  constructor() {
    this.determineParentEntity();
    this.determineDirection();
    this.determineSize();
    this.determineGovernmentRank();
    this.determineSigil();
    this.determineClimate();
    this.determineBiomes();
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

    let government: string = Util.randomKey(Data.parentEntityGovernments);
    this.parentEntityAdj = Data.parentEntityGovernments[government];
    arr.push(government);

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
    this.sizeIndex = Number(Util.randomKey(Data.sizes));
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
    this.sigilName = Util.randomKey(Data.sigils);
    this.sigilIcon = Data.sigils[this.sigilName].icon;
    this.sigilMeaning = Util.randomValue(Data.sigils[this.sigilName].meanings);
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
          return ['boreal-forest', 'temperate-forest'].includes(str);
          break;
        case 'wet':
          // Wet? Remove grassland and tundra
          return ['grassland', 'tundra'].includes(str);
          break;
      }

      return true;
    });

    // Add the primary biome, reroll once if mountains
    let b: string = Util.randomValue(availableBiomes);
    if (b == 'mountains') b = Util.randomKey(availableBiomes);

    Util.arrayRemove(availableBiomes, b);

    let availableSizeIndex: number = Data.sizes.indexOf(this.size) * 2;
    let sizeIndex: number = Math.floor(Util.rand() * availableSizeIndex);
    availableSizeIndex -= sizeIndex;
    let primaryBiome: Biome = {
      type: b,
      size: Data.sizes[sizeIndex],
      direction: Util.randomValue(Data.directions)
    };

    this.biomes.push(primaryBiome);

    if (Util.rand() < 0.6) {
      // Choose a direction that isn't the same direction as the primary Biome's direction
      // Also cannot be a combined direction like north-east or south-west, must be one of the four cardinal directions or 'middle'
      let secondaryDirection: string;
      do {
        secondaryDirection = Util.randomValue(Data.directions);
      } while (
        secondaryDirection == primaryBiome.direction &&
        secondaryDirection.includes('-')
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
}
