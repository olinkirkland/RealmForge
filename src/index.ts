import LocationModule, { Direction } from './modules/general/LocationModule';
import Rand from './Rand';
import Realm from './realm/Realm';

Rand.seed = Math.floor(Math.random() * 999).toString();
// Rand.seed = '490';
console.log(`Seed: ${Rand.seed}`);
Rand.seedRandomNumberGenerator();

let realm: Realm = new Realm();
console.log('----------------', realm);
