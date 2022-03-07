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

  // Returns 'a' or 'an' if str's first char is a consonant or a vowel
  static prependArticle(str: string): string {
    return `${Lang.startsWithVowel(str) ? 'an' : 'a'} ${str}`;
  }

  // Returns true if the string ends with a given str
  static endsWith(str: string, endingStr: string): boolean {
    const regex = new RegExp('.*' + endingStr + '$');
    return regex.test(str);
  }

  // Returns true if the string starts with a vowel
  static startsWithVowel(str: string): boolean {
    const regex = new RegExp('^[aeiou].*', 'i');
    return regex.test(str.trim());
  }

  // Returns true if the string starts with a vowel
  static endsWithVowel(str: string): boolean {
    const regex = new RegExp('.*[aeiou]$', 'i');
    return regex.test(str.trim());
  }

  // Returns a string joining an array of at least two entries
  // with commas and the word 'and' between the last two entries
  static joinArrayWithAnd(
    arr: string[],
    joiningString: string = ', ',
    lastJoiningString: string = ' and '
  ): string {
    const last = arr.pop();

    if (arr.length == 1) {
      return arr[0] + lastJoiningString + last;
    }

    let str: string = arr.join(joiningString);
    str += `, ${lastJoiningString} ${last}`;
    return str;
  }

  // Capitalize first letter
  static capitalize(str: string): string {
    const arr: string[] = str.split(' ');
    str = arr.reduce(
      (accumulator, s) =>
        accumulator + ' ' + s.charAt(0).toUpperCase() + s.substring(1),
      ''
    );

    return str.trim();
  }

  // Returns any number lower than 20 as a word ('one', 'two', ... 'nineteen')
  static wordFromNumber(n: number): string {
    return n < numberWords.length ? numberWords[n] : n.toString();
  }

  // Quick and dirty placeholder text
  static lorem(max:number = 3) {
    let str: string = '';
    for (let i: number = 1; i <= max; i++) {
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
