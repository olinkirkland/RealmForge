import Module from '../Module';
import Rand from '../../util/Rand';
import Realm from '../../realm/Realm';
import Util from '../../util/Util';
import { Direction } from '../general/LocationModule';
import { Humidity, Temperature } from './ClimateModule';
import { Size } from './SizeModule';

export enum BiomeType {
  GRASSLAND = 'grassland',
  TUNDRA = 'tundra',
  BOREAL_FOREST = 'borealForest',
  TEMPERATE_FOREST = 'temperateForest',
  MOUNTAINS = 'mountains',
  COAST = 'coast'
}

export type Biome = {
  type: BiomeType;
  size: number;
  direction: Direction;
};

export default class BiomesModule extends Module {
  public biomes!: Biome[];

  constructor(realm: Realm) {
    super(realm);
  }

  protected run() {
    this.biomes = [];

    // Add a coast biome
    let remainingSize: number = this.realm.size.sizeIndex + 1;

    if (this.realm.tags.includes(BiomeType.COAST)) {
      const coastBiome = {
        type: BiomeType.COAST,
        size: Rand.between(1, remainingSize, true),
        direction: this.realm.location.directionToCoast
      };
    }

    // Limit available biome types
    let availableBiomeTypes: BiomeType[] = Object.values(BiomeType).filter(
      (biomeType) => {
        if (biomeType == BiomeType.COAST) return false;

        switch (this.realm.climate.humidity) {
          case Humidity.DRY:
            // Dry? Remove boreal-forest and temperate-forest
            return ![
              BiomeType.BOREAL_FOREST,
              BiomeType.TEMPERATE_FOREST
            ].includes(biomeType);
            break;
          case Humidity.WET:
            // Wet? Remove grassland and tundra
            return ![BiomeType.GRASSLAND, BiomeType.TUNDRA].includes(biomeType);
            break;
        }

        if (this.realm.climate.temperature == Temperature.WARM) {
          // Warm? Remove boreal-forest and tundra
          return ![BiomeType.BOREAL_FOREST, BiomeType.TUNDRA].includes(
            biomeType
          );
        }

        return true;
      }
    );

    // Cannot be a combined direction like north-east or south-west, must be one of the four cardinal directions or 'middle'
    let availableDirections: Direction[] = Object.values(Direction).filter(
      (d) => d.split('-').length == 1
    );

    // Create some number of biomes
    while (remainingSize > 0 && availableBiomeTypes.length > 0) {
      let biomeSize = Rand.between(1, remainingSize, true);
      remainingSize -= biomeSize;

      let biomeType: BiomeType = Rand.pick(availableBiomeTypes);
      availableBiomeTypes = Util.arrayRemove(availableBiomeTypes, biomeType);

      let biomeDirection = Rand.pick(availableDirections);
      availableDirections = Util.arrayRemove(
        availableDirections,
        biomeDirection
      );

      const biome: Biome = {
        type: biomeType,
        size: biomeSize,
        direction: biomeDirection
      };

      this.biomes.push(biome);
      this.realm.addTag(biomeType);
    }
  }
}
