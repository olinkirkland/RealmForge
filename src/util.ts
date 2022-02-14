import { Data } from './data';

export class Util {
  public static seed: string;

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

  // static randomKey(u: any, seeded: boolean = true): string {
  //   let keys: string[] = Object.keys(u);
  //   return seeded
  //     ? keys[Math.floor(Util.rand() * keys.length)]
  //     : keys[Math.floor(Math.random() * keys.length)];
  // }

  // Returns a random value from an array
  static randomValue(u: any[], seeded: boolean = true): any {
    return seeded
      ? u[Math.floor(Util.rand() * u.length)]
      : u[Math.floor(Math.random() * u.length)];
  }

  static aOrAn(str: string): string {
    const regex = new RegExp('^[aeiou].*', 'i');
    return regex.test(str) ? 'an' : 'a';
  }
}
