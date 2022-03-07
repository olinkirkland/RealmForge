import Realm from '../../realm/Realm';
import Lang from '../../util/Lang';
import Section from '../sections/Section';

export default class Block {
  protected realm: Realm;
  protected name: string;
  protected description: string;
  protected sections: Section[];

  protected sectionMap: any = {};

  constructor(realm: Realm, name: string, sectionNames: string[]) {
    this.realm = realm;
    this.name = name;
    this.description = Lang.lorem(1);
    this.sectionMap = this.createSectionMap();
    this.sections = sectionNames.map((sectionName) =>
      this.createSection(sectionName)
    );
  }

  protected createSectionMap() {
    return {};
  }

  protected createSection(sectionName: string): Section {
    return this.sectionMap[sectionName]
      ? new this.sectionMap[sectionName](this.realm, sectionName)
      : new Section(this.realm, sectionName);
  }

  public render(): HTMLElement {
    const el: HTMLElement = document.createElement('article');

    // Title
    const titleEl: HTMLElement = document.createElement('h2');
    titleEl.innerHTML = `<span>${this.name.toUpperCase()}</span><br/><span style="word-wrap: break-word" class="muted">${
      this.description
    }</span>`;
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
