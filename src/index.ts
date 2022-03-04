import Rand from './Rand';
import Realm from './realm/Realm';

Rand.seed = Math.floor(Math.random() * 999).toString();
console.log(`Seed: ${Rand.seed}`);
Rand.seedRandomNumberGenerator();

let realm: Realm = new Realm();
console.log(realm);
