import Realm from './realm/Realm';
import Lang from './toponymy/Language';
import * as numberWords from './number-words.json';
import * as loremWords from './lorem-words.json';
import Rand from './Rand';

export default class Util {
  public static isDarkMode: boolean = false;

  public static download(name: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', name);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  public static toggleDarkMode() {
    Util.isDarkMode = !Util.isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(Util.isDarkMode));
    Util.isDarkMode ? Util.applyDarkMode() : Util.applyLightMode();
  }

  private static applyDarkMode() {
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

  private static applyLightMode() {
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

  static arrayRemove<T>(arr: T[], elementToRemove: T): T[] {
    return arr.filter(function (element) {
      return element != elementToRemove;
    });
  }

  // Returns 'a' or 'an' if str's first char is a consonant or a vowel
  static aOrAn(str: string): string {
    return Util.startsWithVowel(str) ? 'an' : 'a';
  }

  // Returns true if the string ends with a given str
  static endsWith(str: string, endingStr: string): boolean {
    const regex = new RegExp('.*' + endingStr + '$');
    return regex.test(str);
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
    let tweet: string = `Explore ${Util.capitalize(
      Lang.readWord(realm.realmName.name)
    )}, a ${realm.size} ${realm.parentEntity.adjective} ${
      realm.government.rank
    }.`;

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
      str += [Util.capitalize(Rand.pick(loremWords)), ...arr].join(' ') + '. ';
    }

    return str;
  }
}
