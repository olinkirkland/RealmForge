import Realm from '../../realm/Realm';
import BiodiversitySection from '../sections/geography/Biodiversity';
import ClimateSection from '../sections/geography/Climate';
import EcoregionsSection from '../sections/geography/Ecoregions';
import LocationSection from '../sections/geography/Location';
import RiversSection from '../sections/geography/Rivers';
import Block from './Block';

export default class GeographyBlock extends Block {
  constructor(realm: Realm, name: string, sectionNames: string[]) {
    super(realm, name, sectionNames);

    this.name = `Geography`;
  }

  protected createSectionMap() {
    return {
      location: LocationSection,
      ecoregions: EcoregionsSection,
      rivers: RiversSection,
      climate: ClimateSection
      // biodiversity: BiodiversitySection
    };
  }
}
