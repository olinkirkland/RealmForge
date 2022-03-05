import Rand from '../../Rand';
import Realm from '../../realm/Realm';
import { Word, WordPart } from '../../toponymy/Language';
import Module from '../Module';
import { placeRoots, placeSuffixes } from './place-names.json';

export default class RealmNameModule extends Module {
  public name!: Word;

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    // Roots cannot be used by an existing river
    const roots: WordPart[] = [...placeRoots];
    let validRoots: WordPart[] = roots.filter((p) =>
      this._realm.evaluateCondition(p.condition)
    );

    const root: WordPart = {
      ...Rand.weightedPick(validRoots, (item) => item.points)
    };

    const suffixes: WordPart[] = [...placeSuffixes];
    let validSuffixes: WordPart[] = suffixes.filter((p) =>
      this._realm.evaluateCondition(p.condition)
    );

    let suffix: WordPart;
    do {
      suffix = Rand.weightedPick(validSuffixes, (item) => item.points);
      this.name = { root: root, suffix: suffix };
    } while (!this.isValidRealmName(this.name));
  }

  private isValidRealmName(word: Word): boolean {
    let valid: boolean = true;

    // Root and suffix can't be the same
    if (word.root == word.suffix) return false;

    return valid;
  }
}
