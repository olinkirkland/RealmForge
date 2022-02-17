import { validate } from '../node_modules/schema-utils/declarations/validate';
import { Util } from './util';

export type Direction = {
  noun: string;
  adj: string;
};

export type NamePart = {
  name: string;
  tags: string[];
  tagRule: 'AND' | 'OR';
  asSuffix: number;
  asRoot: number;
  variations: string[];
};

export class Data {
  public static content: any;
  public static words: string[];

  public static placeNameParts: NamePart[];
  public static riverNameParts: NamePart[];
  public static tributaryNameParts: NamePart[];
  public static faunaNameParts: NamePart[];
  public static floraNameParts: NamePart[];
  public static rulersNameParts: NamePart[];
  public static personsNameParts: NamePart[];

  public static biomes: string[];
  public static directions: Direction[];
  public static heroImages: { url: string; tags: string[] }[];
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
        url: 'lang/places.json',
        loaded: false
      },
      {
        propertyName: 'riverNameParts',
        url: 'lang/rivers.json',
        loaded: false
      },
      {
        propertyName: 'tributaryNameParts',
        url: 'lang/tributaries.json',
        loaded: false
      },
      {
        propertyName: 'faunaNameParts',
        url: 'lang/fauna.json',
        loaded: false
      },
      {
        propertyName: 'floraNameParts',
        url: 'lang/flora.json',
        loaded: false
      },
      {
        propertyName: 'rulersNameParts',
        url: 'lang/rulers.json',
        loaded: false
      },
      {
        propertyName: 'personNameParts',
        url: 'lang/persons.json',
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
    Data.heroImages = u.heroImages.map(
      (heroImage: { url: string; tags: string[] }) => {
        heroImage.url = './assets/images/hero_images/' + heroImage.url;
        return heroImage;
      }
    );
    Data.governmentRanks = u.governmentRanks;
    Data.sigils = u.sigils;
    Data.sizes = u.sizes;
    Data.seasonDescriptors = u.seasons;
    Data.parentEntityDescriptorsBefore = u.parentEntities.descriptorsBefore;
    Data.parentEntityDescriptorsAfter = u.parentEntities.descriptorsAfter;
    Data.parentEntityGovernments = u.parentEntities.governments;

    // Apply defaults to nameParts
    Data.placeNameParts
      .concat(Data.riverNameParts)
      .concat(Data.tributaryNameParts)
      .concat(Data.faunaNameParts)
      .concat(Data.floraNameParts)
      .concat(Data.rulersNameParts)
      // .concat(Data.personsNameParts)
      .forEach((namePart) => {
        if (!namePart.tagRule) {
          namePart.tagRule = 'OR';
        }
      });
  }
}
