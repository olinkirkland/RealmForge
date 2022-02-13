import { Util } from './util';

export class Data {
  public static words: string[];

  public static biomes: string[];
  public static directions: any;
  public static images: string[];
  public static governmentRanks: any;
  public static sigils: any;
  public static sizes: string[];
  public static seasonDescriptors: any;

  public static parentEntityDescriptorsBefore: string[];
  public static parentEntityDescriptorsAfter: string[];
  public static parentEntityGovernments: any;

  static setup(callback: Function) {
    let toLoad: any = {};

    // Load data
    fetch('./assets/data/content.json')
      .then((response) => {
        return response.json();
      })
      .then((content) => {
        Data.parse(content);

        toLoad.data = true;
        if (toLoad.data && toLoad.words) callback();
      });

    // Load words
    fetch('./assets/data/words.json')
      .then((response) => {
        return response.json();
      })
      .then((words) => {
        Data.words = words;

        toLoad.words = true;
        if (toLoad.data && toLoad.words) callback();
      });
  }

  static parse(u: any) {
    Data.biomes = u.biomes;
    Data.directions = u.directions;
    Data.images = u.images;
    Data.governmentRanks = u.governmentRanks;
    Data.sigils = u.sigils;
    Data.sizes = u.sizes;
    Data.seasonDescriptors = u.seasons;

    Data.parentEntityDescriptorsBefore = u.parentEntities.descriptorsBefore;
    Data.parentEntityDescriptorsAfter = u.parentEntities.descriptorsAfter;
    Data.parentEntityGovernments = u.parentEntities.governments;
  }
}
