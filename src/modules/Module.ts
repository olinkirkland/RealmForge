import Realm from '../realm/Realm';

export default class Module {
  protected _realm: Realm;

  constructor(realm: Realm) {
    this._realm = realm;
    this.run();
  }

  protected run() {
    console.log('module base');
  }
}
