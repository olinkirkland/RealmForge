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

// Module template

// import Module from '../Module';
// import Realm from '../../realm/Realm';

// export default class xModule extends Module {
//   constructor(realm: Realm) {
//     super(realm);
//   }

//   protected run() {

//   }
// }
