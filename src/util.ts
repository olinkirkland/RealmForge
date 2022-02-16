import { util } from '../node_modules/webpack/types';
import { Data } from './data';
import { Realm, Word } from './realm';

export class Util {
  public static seed: string;
  public static isDarkMode: boolean = false;

  public static toggleDarkMode() {
    Util.isDarkMode = !Util.isDarkMode;
    Util.isDarkMode ? Util.applyDarkMode() : Util.applyLightMode();
  }

  private static applyDarkMode() {
    const mode: any = [
      { id: '--dark-text', value: '#444444' },
      { id: '--dark-text-muted', value: 'rgba(68, 68, 68, 0.6)' },
      { id: '--dark-text-very-muted', value: 'rgba(68, 68, 68, 0.1)' },
      { id: '--dark-text-hidden', value: 'rgba(68, 68, 68, 0)' },
      { id: '--light-text', value: '#f8f8f8' },
      { id: '--light-text-muted', value: 'rgba(248, 248, 248, 0.6)' },
      { id: '--light-text-very-muted', value: 'rgba(248, 248, 248, 0.1)' },
      { id: '--light-text-hidden', value: 'rgba(248, 248, 248, 0)' },
      { id: '--dark-background', value: '#444444' },
      { id: '--dark-background-alt', value: 'rgba(68, 68, 68, 0.95)' },
      { id: '--light-background', value: '#f8f8f8' },
      { id: '--light-background-alt', value: 'rgba(248, 248, 248, 0.95)' }
    ];

    var root: HTMLElement = document.querySelector(':root')!;
    mode.forEach((m: any) => {
      root.style.setProperty(m.id, m.value);
    });
  }

  private static applyLightMode() {
    const mode: any = [
      { id: '--dark-text', value: '#f8f8f8' },
      { id: '--dark-text-muted', value: 'rgba(248, 248, 248, 0.6)' },
      { id: '--dark-text-very-muted', value: 'rgba(248, 248, 248, 0.1)' },
      { id: '--dark-text-hidden', value: 'rgba(248, 248, 248, 0)' },
      { id: '--light-text', value: '#444444' },
      { id: '--light-text-muted', value: 'rgba(68, 68, 68, 0.6)' },
      { id: '--light-text-very-muted', value: 'rgba(68, 68, 68, 0.1)' },
      { id: '--light-text-hidden', value: 'rgba(68, 68, 68, 0)' },
      { id: '--dark-background', value: '#f8f8f8' },
      { id: '--dark-background-alt', value: 'rgba(248, 248, 248, 0.95)' },
      { id: '--light-background', value: '#444444' },
      { id: '--light-background-alt', value: 'rgba(68, 68, 68, 0.95)' }
    ];

    var root: HTMLElement = document.querySelector(':root')!;
    mode.forEach((m: any) => {
      root.style.setProperty(m.id, m.value);
    });
  }

  public static generateSeed() {
    let arr: string[] = [];
    for (let i = 0; i < 3; i++) {
      arr.push(Util.randomValue(Data.words, false));
    }

    Util.seed = arr.join('-');
    Util.seedRandomNumberGenerator();
  }

  private static m_w: number = 123456789;
  private static m_z: number = 987654321;
  private static mask: number = 4294967295;
  public static seedRandomNumberGenerator() {
    let h = 1779033703 ^ Util.seed.length;

    for (var i = 0; i < Util.seed.length; i++) {
      h = Math.imul(h ^ Util.seed.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }

    Util.m_w = (123456789 + h) & Util.mask;
    Util.m_z = (987654321 - h) & Util.mask;
  }

  public static rand(): number {
    Util.m_z = (36969 * (Util.m_z & 65535) + (Util.m_z >> 16)) & Util.mask;
    Util.m_w = (18000 * (Util.m_w & 65535) + (Util.m_w >> 16)) & Util.mask;
    let result = ((Util.m_z << 16) + (Util.m_w & 65535)) >>> 0;
    return result / 4294967296;
  }

  static arrayRemove(arr: string[], elementToRemove: string) {
    return arr.filter(function (element) {
      return element != elementToRemove;
    });
  }

  // Returns a random value from an array
  static randomValue(u: any[], seeded: boolean = true): any {
    return seeded
      ? u[Math.floor(Util.rand() * u.length)]
      : u[Math.floor(Math.random() * u.length)];
  }

  // Returns 'a' or 'an' if str's first char is a consonant or a vowel
  static aOrAn(str: string): string {
    return Util.startsWithVowel(str) ? 'an' : 'a';
  }

  // Returns true if the string starts with a vowel
  static startsWithVowel(str: string): boolean {
    const regex = new RegExp('^[aeiou].*', 'i');
    return regex.test(str);
  }

  // Returns true if the string starts with a vowel
  static endsWithVowel(str: string): boolean {
    const regex = new RegExp('.*[aeiou]$', 'i');
    return regex.test(str);
  }

  // Returns a string joining an array of at least two entries
  // with commas and the word 'and' between the last two entries
  static joinArrayWithAnd(arr: string[]): string {
    const last = arr.pop();

    if (arr.length == 1) {
      return arr[0] + ' and ' + last;
    }

    let str: string = arr.join(', ');
    str += ', and ' + last;
    return str;
  }

  // Tweet a realm
  static shareByTweet(realm: Realm) {
    let tweet: string = `Explore ${Util.capitalize(realm.name)}, a ${
      realm.size
    } ${realm.parentEntityAdj} ${realm.governmentRank}.`;

    window.open(
      'https://twitter.com/intent/tweet?url=' +
        window.location.href +
        '&text=' +
        tweet,
      '_blank'
    );
  }

  // Capitalize first letter
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  // Combines word parts into a string
  static readWord(word: Word): string {
    return word.root.name + word.suffix.name;
  }

  // Returns any number lower than 20 as a word ('one', 'two', ... 'nineteen')
  static wordFromNumber(n: number): string {
    const words: string[] = [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen'
    ];

    return n < words.length ? words[n] : n.toString();
  }
}
