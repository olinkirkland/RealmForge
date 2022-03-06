import Realm from '../../realm/Realm';
import Lang from '../../util/Lang';

export default class Section {
  protected realm: Realm;
  protected name: string;

  constructor(realm: Realm, name: string) {
    this.realm = realm;
    this.name = name;
  }

  public render(): HTMLElement {
    const el: HTMLElement = document.createElement('li');
    el.classList.add('work-in-progress');

    // Title
    const titleEl: HTMLElement = document.createElement('h3');
    titleEl.textContent = this.name;
    el.appendChild(titleEl);

    // Placeholder content
    const textEl: HTMLElement = document.createElement('p');
    textEl.textContent = Lang.lorem();
    el.append(textEl);

    return el;
  }
}

// Section Template

// import Realm from '../../../realm/Realm';
// import Section from '../Section';

// export default class LocationSection extends Section {
//   constructor(realm: Realm, name: string) {
//     super(realm, name);
//   }

//   public render(): HTMLElement {
//     const el: HTMLElement = document.createElement('li');

//     // Title
//     const titleEl: HTMLElement = document.createElement('h3');
//     titleEl.textContent = this.name;
//     el.appendChild(titleEl);

//     // Content
//     const textEl: HTMLElement = document.createElement('p');

//     // ""
//     textEl.innerHTML = ``;

//     el.append(textEl);
//     return el;
//   }
// }
