import Realm from '../../realm/Realm';
import Lang from '../../util/Lang';
import Basics from '../sections/overview/Basics';
import Heraldry from '../sections/overview/Heraldry';
import Sigil from '../sections/overview/Sigil';
import Block from './Block';

export default class Overview extends Block {
  constructor(realm: Realm, name: string, sectionNames: string[]) {
    super(realm, name, sectionNames);

    this.name = `An Overview of ${Lang.capitalize(
      Lang.readWord(this.realm.realmName.name)
    )}`;
  }

  protected createSectionMap() {
    return { basics: Basics, sigil: Sigil, heraldry: Heraldry };
  }
}
