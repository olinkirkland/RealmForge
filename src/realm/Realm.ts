import SizeModule from '../modules/geography/SizeModule';
import LocationModule from '../modules/general/LocationModule';
import ParentEntityModule from '../modules/geography/ParentEntityModule';
import ClimateModule from '../modules/geography/ClimateModule';
import BiomesModule from '../modules/geography/BiomesModule';
import RiversModule from '../modules/geography/RiversModule';

export default class Realm {
  // Modules
  public size!: SizeModule;
  public location!: LocationModule;
  public parentEntity!: ParentEntityModule;
  public climate!: ClimateModule;
  public biomes!: BiomesModule;
  public rivers!: RiversModule;
  // public heraldry!: HeraldryModule;
  // public government!: GovernmentModule;

  // Tags
  protected _tags: string[] = [];

  constructor() {
    this.runModuleSequence();
  }

  private runModuleSequence() {
    console.log(' === Running Module Sequence === ');
    this.size = new SizeModule(this);
    this.location = new LocationModule(this);
    this.parentEntity = new ParentEntityModule(this);
    this.climate = new ClimateModule(this);
    this.biomes = new BiomesModule(this);
    this.rivers = new RiversModule(this);
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
    const result: boolean = eval(`(${condition})`) ? true : false;
    console.log(`(${condition}): ${result}`);
    return result;
  }
}
