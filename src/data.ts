export class Data {
  public static biomes: [
    'mountain',
    'boreal-forest',
    'temperate-forest',
    'grassland',
    'tundra'
  ];

  public static lang: string[];

  static setup() {
    // Load names
    fetch('./assets/presets/lang.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Data.lang = data;
      });
  }
}
