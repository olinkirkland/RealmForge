import Realm from '../../realm/Realm';
import Lang from '../../util/Lang';
import Section from '../sections/Section';

export default class Block {
  protected realm: Realm;
  protected name: string;
  protected sections: Section[];

  protected sectionMap: any = {};

  constructor(realm: Realm, name: string, sectionNames: string[]) {
    this.realm = realm;
    this.name = name;
    this.sectionMap = this.createSectionMap();
    this.sections = sectionNames.map((sectionName) =>
      this.createSection(sectionName)
    );
  }

  protected createSectionMap() {
    return {};
  }

  protected createSection(sectionName: string): Section {
    console.log(Object.keys(this.sectionMap), sectionName);
    return this.sectionMap[sectionName]
      ? new this.sectionMap[sectionName](this.realm, sectionName)
      : new Section(this.realm, sectionName);
  }

  public render(): HTMLElement {
    const el: HTMLElement = document.createElement('article');

    // Title
    const titleEl: HTMLElement = document.createElement('h2');
    titleEl.textContent = Lang.capitalize(this.name);
    el.appendChild(titleEl);

    // Sections
    const sectionListEl: HTMLElement = document.createElement('ul');
    el.appendChild(sectionListEl);
    this.sections.forEach((section) => {
      sectionListEl.appendChild(section.render());
    });

    return el;
  }
}
