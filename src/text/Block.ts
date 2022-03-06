import Realm from '../realm/Realm';
import Section from './Section';

export default class Block {
  protected realm: Realm;
  protected name: string;
  protected sections: Section[];

  constructor(realm: Realm, name: string, sectionNames: string[]) {
    this.realm = realm;
    this.name = name;
    this.sections = sectionNames.map((sectionName) =>
      this.createSection(sectionName)
    );
  }

  protected createSection(sectionName: string): Section {
    return new Section(this.realm, sectionName);
  }

  public render(): HTMLElement {
    const el: HTMLElement = document.createElement('article');

    // Title
    const titleEl: HTMLElement = document.createElement('h2');
    titleEl.textContent = this.name;
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
