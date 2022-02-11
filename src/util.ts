export class Util {
  static arrayRemove(arr: string[], elementToRemove: string) {
    return arr.filter(function (element) {
      return element != elementToRemove;
    });
  }

  static randomKey(u: any): string {
    let keys: string[] = Object.keys(u);
    let k: string = keys[Math.floor(Math.random() * keys.length)];
    return k;
  }

  static randomValue(u: any): any {
    return u[Util.randomKey(u)];
  }

  static aOrAn(str: string): string {
    const regex = new RegExp('^[aeiou].*', 'i');
    return regex.test(str) ? 'an' : 'a';
  }
}
