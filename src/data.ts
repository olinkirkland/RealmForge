import { Util } from './util';

export class Data {
  public static biomes: string[];
  public static directions: any;
  public static images: string[];
  public static governmentRanks: any;
  public static sigils: any;
  public static sizes: string[];
  public static seasonDescriptors1: string[];
  public static seasonDescriptors2: string[];

  public static parentEntityDescriptorsBefore: string[];
  public static parentEntityDescriptorsAfter: string[];
  public static parentEntityGovernments: any;

  static setup(callback: Function) {
    // Load names
    fetch('./assets/data/content.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Data.parse(data);
        callback();
      });
  }

  static parse(u: any) {
    Data.biomes = u.biomes;
    Data.directions = u.directions;
    Data.images = u.images;
    Data.governmentRanks = u.governmentRanks;
    Data.sigils = u.sigils;
    Data.sizes = u.sizes;
    Data.seasonDescriptors1 = u.seasons.descriptors1;
    Data.seasonDescriptors2 = u.seasons.descriptors2;

    Data.parentEntityDescriptorsBefore = u.parentEntities.descriptorsBefore;
    Data.parentEntityDescriptorsAfter = u.parentEntities.descriptorsAfter;
    Data.parentEntityGovernments = u.parentEntities.governments;
  }
}