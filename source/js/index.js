import keys from './data/keys.js';
import getKeys from './functions/getKeys.js';
import render from './functions/render.js';

const { keyElements, keyElementsMap } = getKeys(keys, ['en', 'ru', 'uk']);
render(keyElements, 'ru');
