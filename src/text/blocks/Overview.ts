import Realm from '../../realm/Realm';
import Lang from '../../util/Lang';
import BasicsSection from '../sections/overview/Basics';
import CoatOfArmsSection from '../sections/overview/CoatOfArms';
import HeraldrySection from '../sections/overview/Heraldry';
import SigilSection from '../sections/overview/Sigil';
import Block from './Block';

export default class OverviewBlock extends Block {
  constructor(realm: Realm, name: string, sectionNames: string[]) {
    super(realm, name, sectionNames);

    this.name = `An Overview of ${this.realm.name}`;
  }

  protected createSectionMap() {
    return {
      basics: BasicsSection,
      sigil: SigilSection,
      heraldry: HeraldrySection,
      coatOfArms: CoatOfArmsSection
    };
  }
}
