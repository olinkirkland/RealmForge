export class Data {
  public static biomes: string[];

  public static directions: string[];

  static setup() {
    // Load names
    fetch('./assets/data/content.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Data.parse(data);
      });
  }

  static parse(u: any) {
    Data.biomes = u['biomes'];
  }
}
