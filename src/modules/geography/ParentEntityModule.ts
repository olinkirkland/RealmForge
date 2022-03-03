import Rand from '../../Rand';
import Realm from '../../realm/Realm';
import Module from '../Module';
import { adjectives, governments, templates } from './parent-entity.json';


type ParentEntityGovernment = {
  noun: string;
  adj: string;
};

export default class ParentEntityModule extends Module {
  public name!: string;
  public adjective!: string;
  public government!: ParentEntityGovernment;

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    const template = Rand.pick(templates);
    this.adjective = Rand.pick(adjectives);
    this.government = Rand.pick(governments);

    const adjective = this.adjective;
    const government = this.government.noun;
    this.name = eval(template);
  }
}
