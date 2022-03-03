import Rand from './Rand';
import Realm from './realm/Realm';

Rand.seed = Math.random().toString();
Rand.seedRandomNumberGenerator();

let realm: Realm = new Realm();
console.log(realm);
