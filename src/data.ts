export class Data {
  public static biomes: string[];
  public static directions: any;
  public static images: string[];
  public static governmentRanks: any;

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

    Data.parentEntityDescriptorsBefore = u.parentEntity.descriptorsBefore;
    Data.parentEntityDescriptorsAfter = u.parentEntity.descriptorsAfter;
    Data.parentEntityGovernments = u.parentEntity.governments;
  }
}
