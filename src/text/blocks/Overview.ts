import Realm from '../../realm/Realm';
import Basics from '../sections/overview/Basics';
import Block from './Block';

export default class Overview extends Block {
  constructor(realm: Realm, name: string, sectionNames: string[]) {
    super(realm, name, sectionNames);
  }

  protected createSectionMap() {
    return { basics: Basics };
  }
}
