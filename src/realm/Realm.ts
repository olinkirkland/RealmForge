import { LocationModule } from '../modules/general/LocationModule';
import { SizeModule } from '../modules/geography/SizeModule';

export default class Realm {
  // Modules
  public size!: SizeModule;
  public direction!: LocationModule;
  // public parentEntity = new ParentEntityModule(this);
  // public climate = new ClimateModule(this);
  // public biomes = new BiomesModule(this);
  // public rivers = new RiversModule(this);
  // public heraldry = new HeraldryModule(this);
  // public government = new GovernmentModule(this);

  // Tags
  protected _tags: string[] = [];

  constructor() {
    this.runModuleSequence();
  }

  private runModuleSequence() {
    console.log(' === Running Module Sequence === ');
    this.size = new SizeModule(this);
    this.direction = new LocationModule(this);
  }

  public addTag(tag: string) {
    this._tags.push(tag);
  }

  public get tags() {
    return this._tags;
  }
}
