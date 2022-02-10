export class Data {
  public static biomes: [
    'mountain',
    'boreal-forest',
    'temperate-forest',
    'grassland',
    'tundra'
  ];

  public static content: Object;

  static setup() {
    // Load names
    fetch('./assets/data/content.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Data.content = data;
      });
  }
}
