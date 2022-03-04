import Realm from '../realm/Realm';

export type Word = {
  root: WordPart;
  suffix: WordPart;
};

export type WordPart = {
  text: string;
  condition: string;
  points: number;
};

export default class Language {
  static readWord(word: Word): string {
    return word.root.text + word.suffix.text;
  }
}
