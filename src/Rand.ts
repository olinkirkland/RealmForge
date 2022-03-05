import * as words from './seed-words.json';
export default class Rand {
  public static seed: string;

  private static m_w: number = 123456789;
  private static m_z: number = 987654321;
  private static mask: number = 4294967295;

  public static generateSeed() {
    let arr: string[] = [];
    for (let i = 0; i < 3; i++) {
      // Don't use a seeded value to generate the seed
      arr.push(words[Math.floor(Math.random() * words.length)]);
    }
    Rand.seed = arr.join('-');

    // Initialize seed
    let h = 1779033703 ^ Rand.seed.length;

    for (var i = 0; i < Rand.seed.length; i++) {
      h = Math.imul(h ^ Rand.seed.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }

    Rand.m_w = (123456789 + h) & Rand.mask;
    Rand.m_z = (987654321 - h) & Rand.mask;
  }

  public static next() {
    return this.between(0, 1);
  }

  public static between(
    min: number,
    max: number,
    floor: boolean = false
  ): number {
    Rand.m_z = (36969 * (Rand.m_z & 65535) + (Rand.m_z >> 16)) & Rand.mask;
    Rand.m_w = (18000 * (Rand.m_w & 65535) + (Rand.m_w >> 16)) & Rand.mask;
    let result = ((Rand.m_z << 16) + (Rand.m_w & 65535)) >>> 0;
    result /= 4294967296;
    result = result * (max - min) + min;
    return floor ? Math.floor(result) : result;
  }

  // Returns an item from an array
  static pick(arr: any[]) {
    return arr[Rand.between(0, arr.length, true)];
  }

  // Returns an item from an array
  // The weight value is determined using the accessor function
  // randomWeightedValue<NamePart>(nameParts, item => item.asRoot)
  static weightedPick<T>(
    arr: T[],
    accessor: (item: T) => number,
    log: boolean = false
  ): T {
    if (log) console.log(arr);

    // Get the max weight
    const max = arr.reduce((total: number, item: T) => {
      return total + accessor(item);
    }, 0);

    // Calculate a random number on the scale of max
    let weight = Rand.between(0, max);

    // For each item in the array, decrement max by that item's weight
    let result!: any;
    arr.some((item: T) => {
      weight -= accessor(item);
      result = item;
      return weight < 0;
    });

    return result;
  }
}
