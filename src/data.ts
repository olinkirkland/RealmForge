import { validate } from '../node_modules/schema-utils/declarations/validate';
import { Util } from './util';

export type NamePart = {
  name: string;
  tags: string[];
  asSuffix: number;
  asRoot: number;
};

export class Data {
  public static content: any;
  public static words: string[];
  public static placeNameParts: NamePart[];
  public static riverNameParts: NamePart[];

  public static biomes: string[];
  public static directions: any[];
  public static images: string[];
  public static governmentRanks: any;
  public static sigils: any;
  public static sizes: any;
  public static seasonDescriptors: any;

  public static parentEntityDescriptorsBefore: string[];
  public static parentEntityDescriptorsAfter: string[];
  public static parentEntityGovernments: any;

  static setup(callback: Function) {
    let loadList: { propertyName: string; url: string; loaded: boolean }[] = [
      { propertyName: 'content', url: 'content.json', loaded: false },
      { propertyName: 'words', url: 'words.json', loaded: false },
      {
        propertyName: 'placeNameParts',
        url: 'place-name-parts.json',
        loaded: false
      },
      {
        propertyName: 'riverNameParts',
        url: 'river-name-parts.json',
        loaded: false
      }
    ];

    loadList.forEach((item) => {
      const url: string = `./assets/data/${item.url}`;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((loadedContent) => {
          Object.getPrototypeOf(Data)[item.propertyName as keyof Data] =
            loadedContent;
          item.loaded = true;
          console.log(`Loaded ${item.url}`);

          if (
            loadList.every((t) => {
              return t.loaded;
            })
          ) {
            Data.parse();
            callback();
          }
        });
    });
  }

  static parse() {
    const u: any = Data.content;
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
