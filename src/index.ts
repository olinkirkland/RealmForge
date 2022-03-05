/**
 * Hint: Use 'npm run build' from console to compile + watch the TS code on save
 */

import HomePageController from './controllers/HomePageController';
import JSONPageController from './controllers/JSONPageController';
import PageController from './controllers/PageController';

// Is it json?
const arr: RegExpMatchArray | null = window.location.href.match(
  /\?[a-z0-9,-]+.*\&(json)/
);

let controller: PageController;

if (arr && arr.length > 1) {
  // Show JSON
  controller = new JSONPageController();
} else {
  // Show Home
  controller = new HomePageController();
}
