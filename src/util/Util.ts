import Realm from '../realm/Realm';
import Lang from './Lang';
export default class Util {
  public static isDarkMode: boolean = false;

  public static download(name: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', name);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  public static toggleDarkMode() {
    Util.isDarkMode = !Util.isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(Util.isDarkMode));
    Util.isDarkMode ? Util.applyDarkMode() : Util.applyLightMode();
  }

  private static applyDarkMode() {
    const mode: any = [
      { id: '--dark-text', value: '#f8f8f8' },
      { id: '--dark-text-muted', value: 'rgba(248, 248, 248, 0.6)' },
      { id: '--dark-text-very-muted', value: 'rgba(248, 248, 248, 0.1)' },
      { id: '--dark-text-hidden', value: 'rgba(248, 248, 248, 0)' },
      { id: '--light-text', value: '#444444' },
      { id: '--light-text-muted', value: 'rgba(68, 68, 68, 0.6)' },
      { id: '--light-text-very-muted', value: 'rgba(68, 68, 68, 0.1)' },
      { id: '--light-text-hidden', value: 'rgba(68, 68, 68, 0)' },
      { id: '--dark-background', value: '#f8f8f8' },
      { id: '--dark-background-alt', value: 'rgba(248, 248, 248, 0.95)' },
      { id: '--light-background', value: '#444444' },
      { id: '--light-background-alt', value: 'rgba(68, 68, 68, 0.95)' }
    ];

    var root: HTMLElement = document.querySelector(':root')!;
    mode.forEach((m: any) => {
      root.style.setProperty(m.id, m.value);
    });
  }

  private static applyLightMode() {
    const mode: any = [
      { id: '--dark-text', value: '#444444' },
      { id: '--dark-text-muted', value: 'rgba(68, 68, 68, 0.6)' },
      { id: '--dark-text-very-muted', value: 'rgba(68, 68, 68, 0.1)' },
      { id: '--dark-text-hidden', value: 'rgba(68, 68, 68, 0)' },
      { id: '--light-text', value: '#f8f8f8' },
      { id: '--light-text-muted', value: 'rgba(248, 248, 248, 0.6)' },
      { id: '--light-text-very-muted', value: 'rgba(248, 248, 248, 0.1)' },
      { id: '--light-text-hidden', value: 'rgba(248, 248, 248, 0)' },
      { id: '--dark-background', value: '#444444' },
      { id: '--dark-background-alt', value: 'rgba(68, 68, 68, 0.95)' },
      { id: '--light-background', value: '#f8f8f8' },
      { id: '--light-background-alt', value: 'rgba(248, 248, 248, 0.95)' }
    ];

    var root: HTMLElement = document.querySelector(':root')!;
    mode.forEach((m: any) => {
      root.style.setProperty(m.id, m.value);
    });
  }

  static arrayRemove<T>(arr: T[], elementToRemove: T): T[] {
    return arr.filter(function (element) {
      return element != elementToRemove;
    });
  }

  // Tweet a realm
  static shareByTweet(realm: Realm) {
    let tweet: string = `Explore ${Lang.capitalize(
      Lang.readWord(realm.realmName.name)
    )}, a ${realm.size} ${realm.parentEntity.adjective} ${
      realm.government.rank
    }.`;

    window.open(
      'https://twitter.com/intent/tweet?url=' +
        window.location.href +
        '&text=' +
        tweet,
      '_blank'
    );
  }
}
