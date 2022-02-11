import { Data } from './data';
import { Util } from './util';

type Biome = { biome: string; size: string; direction: string };
export class Realm {
  public name: string = 'oldmarch';
  public adj: string = 'oldmarch';
  public capitalCityName: string = 'highbridge';

  public governmentRank: string = 'territory';
  public leaderTitle: string = 'lord';

  public parentEntityName: string = 'the empire';
  public parentEntityAdj: string = 'imperial';

  public directionWithinParentEntity: string = 'south';
  public directionAdjWithinParentEntity: string = 'south';

  public size: string = 'small';
  public climate: string[] = ['temperate'];

  public season: string = 'varied';
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

    // Choose geography and climate based on the direction
    if (this.directionWithinParentEntity.includes('north')) {
      this.climate = ['cold'];
    } else if (this.directionWithinParentEntity.includes('south')) {
      this.climate = ['warm'];
    } else {
      this.climate = ['temperate'];
    }

    this.climate.push(Util.randomKey(['wet', 'dry']));

    this.determineBiomes();
  }

  public determineParentEntity() {
    let arr: string[] = ['the'];
    if (Math.random() < 0.8) {
      let firstDescriptor: string = Util.randomValue(
        Data.parentEntityDescriptorsBefore
      );
      arr.push(firstDescriptor);
      if (Math.random() < 0.2) {
        let secondDescriptor: string = Util.randomValue(
          Data.parentEntityDescriptorsBefore
        );
        if (secondDescriptor != firstDescriptor) arr.push(secondDescriptor);
      }
    }

    let government: string = Util.randomKey(Data.parentEntityGovernments);
    this.parentEntityAdj = Data.parentEntityGovernments[government];
    arr.push(government);

    if (Math.random() < 0.1) {
      arr.push(Util.randomValue(Data.parentEntityDescriptorsAfter));
    }

    this.parentEntityName = arr.join(' ');
  }

  public determineDirection() {
    this.directionWithinParentEntity = Util.randomKey(Data.directions);
    this.directionAdjWithinParentEntity =
      Data.directions[this.directionWithinParentEntity];
  }

  public determineSize() {
    this.size = Util.randomKey(Data.sizes);
  }

  public determineGovernmentRank() {
    this.governmentRank = Util.randomKey(Data.governmentRanks);
    this.leaderTitle = Util.randomValue(Data.governmentRanks);
  }

  public determineSigil() {
    this.sigilName = Util.randomKey(Data.sigils);
    this.sigilIcon = Data.sigils[this.sigilName].icon;
    this.sigilMeaning = Util.randomValue(Data.sigils[this.sigilName].meanings);
  }

  public determineBiomes() {
    // mountain | boreal-forest | temperate-forest | grassland | tundra

    let availableBiomes: string[] = Data.biomes.filter((str) => {
      // Dry? Remove boreal-forest and temperate-forest
      if (this.climate.includes('dry')) {
        Util.arrayRemove(availableBiomes, 'boreal-forest');
        Util.arrayRemove(availableBiomes, 'temperate-forest');
      }

      // Wet? Remove grassland and tundra
      if (this.climate.includes('wet')) {
        Util.arrayRemove(availableBiomes, 'grassland');
        Util.arrayRemove(availableBiomes, 'tundra');
      }

      return true;
    });

    let availableSizeIndex: number = Data.sizes.indexOf(this.size);

    // Add the primary biome, reroll once if mountains
    let b: string = Util.randomKey(availableBiomes);
    if (b == 'mountains') b = Util.randomKey(availableBiomes);

    let sizeIndex: number = Math.floor(Math.random() * availableSizeIndex);

    // let primaryBiome: Biome = { b,  };

    if (Math.random() < 0.6) {
      // Add a second biome
    }
  }
}
