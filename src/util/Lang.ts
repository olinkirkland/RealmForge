import * as loremWords from './lorem-words.json';
import * as numberWords from './number-words.json';
import Rand from './Rand';

export type Word = {
  root: WordPart;
  suffix: WordPart;
};

export type WordPart = {
  text: string;
  condition: string;
  points: number;
};

export default class Lang {
  // Convert an instance of Word into a string
  static readWord(word: Word): string {
    return word.root.text + word.suffix.text;
  }

  // Capitalize first letter
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  // Returns any number lower than 20 as a word ('one', 'two', ... 'nineteen')
  static wordFromNumber(n: number): string {
    return n < numberWords.length ? numberWords[n] : n.toString();
  }

  // Quick and dirty placeholder text
  static lorem() {
    let str: string = '';
    for (let i: number = 1; i < 3; i++) {
      const words: number = Rand.between(3, 10);
      let arr: string[] = [];
      for (let j: number = 0; j < words; j++) {
        arr.push(Rand.pick(loremWords));
      }
      str += [Lang.capitalize(Rand.pick(loremWords)), ...arr].join(' ') + '. ';
    }

    return str;
  }
}
