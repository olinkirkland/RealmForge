import SizeModule from '../modules/geography/SizeModule';
import LocationModule from '../modules/general/LocationModule';
import ParentEntityModule from '../modules/geography/ParentEntityModule';
import ClimateModule from '../modules/geography/ClimateModule';
import BiomesModule from '../modules/geography/BiomesModule';
import RiversModule from '../modules/geography/RiversModule';
import HeraldryModule from '../modules/general/HeraldryModule';
import GovernmentModule from '../modules/general/GovernmentModule';
import RealmNameModule from '../modules/general/RealmNameModule';

export default class Realm {
  // Modules
  public size!: SizeModule;
  public location!: LocationModule;
  public parentEntity!: ParentEntityModule;
  public climate!: ClimateModule;
  public biomes!: BiomesModule;
  public rivers!: RiversModule;
  public heraldry!: HeraldryModule;
  public government!: GovernmentModule;
  public realmName!: RealmNameModule;

  // Tags
  private _tags: string[] = [];

  constructor() {
    this.runModules();
  }

  private runModules() {
    this.size = new SizeModule(this);
    this.location = new LocationModule(this);
    this.parentEntity = new ParentEntityModule(this);
    this.climate = new ClimateModule(this);
    this.biomes = new BiomesModule(this);
    this.rivers = new RiversModule(this);
    this.heraldry = new HeraldryModule(this);
    this.government = new GovernmentModule(this);
    this.realmName = new RealmNameModule(this);
  }

  public addTag(tag: string) {
    this._tags.push(tag);
  }

  public get tags() {
    return this._tags;
  }

  public evaluateCondition(condition: string) {
    if (condition == '') return true;

    let u: any = {};
    this.tags.forEach((t) => (u[t] = true));
    return new ConditionEvaluator().run(condition, u);
  }
}

class ConditionEvaluator {
  constructor() {}

  run(condition: string, t: any) {
    // Regex instead?
    const result: boolean = eval(`(${condition})`) ? true : false;
    return result;
  }
}
