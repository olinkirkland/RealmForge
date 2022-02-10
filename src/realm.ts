export class Realm {
  public name: string = 'oldmarch';
  public adj: string = 'oldmarch';
  public capitalCityName: string = 'highbridge';

  public governmentRank: string = 'territory';

  public parentEntityName: string = 'the divine empire';
  public parentEntityAdj: string = 'imperial';

  public directionWithinParentEntity: string = 'south';

  public climate: string = 'temperate';
  public season: string = 'varied';
  public seasonSummer: string[] = ['long', 'harsh'];
  public seasonWinter: string[] = ['long', 'mild'];
  public regions: string[] = [];
  public coastal: boolean = false;

  constructor() {
    const directions = [
      'north',
      'east',
      'south',
      'west',
      'north-east',
      'south-east',
      'north-west',
      'south-west'
    ];

    this.directionWithinParentEntity =
      directions[Math.floor(Math.random() * directions.length)];

    // Choose geography and climate based on the direction
    if (this.directionWithinParentEntity.includes('north')) {
      this.climate = 'cold';
    }

    if (this.directionWithinParentEntity.includes('south')) {
      this.climate = 'warm';
    }
  }
}
