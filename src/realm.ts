import { Data } from './data';
import { Util } from './util';

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

  public climate: string = 'temperate';
  public season: string = 'varied';
  public seasonSummer: string[] = ['long', 'harsh'];
  public seasonWinter: string[] = ['long', 'mild'];
  public regions: string[] = [];
  public coastal: boolean = false;

  public sigilName: string = 'dove';
  public sigilIcon: string = 'dove';
  public sigilMeaning: string = 'peace';

  constructor() {
    this.determineParentEntity();
    this.determineDirection();
    this.determineGovernmentRank();
    this.determineSigil();

    // Choose geography and climate based on the direction
    if (this.directionWithinParentEntity.includes('north')) {
      this.climate = 'cold';
    } else if (this.directionWithinParentEntity.includes('south')) {
      this.climate = 'warm';
    } else {
      this.climate = 'temperate';
    }
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

  public determineGovernmentRank() {
    this.governmentRank = Util.randomKey(Data.governmentRanks);
    this.leaderTitle = Util.randomValue(Data.governmentRanks);
  }

  public determineSigil() {
    this.sigilName = Util.randomKey(Data.sigils);
    this.sigilIcon = Data.sigils[this.sigilName].icon;
    this.sigilMeaning = Util.randomValue(Data.sigils[this.sigilName].meanings);
  }
}
