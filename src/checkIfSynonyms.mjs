import { createSynonymsDictionary } from './createSynonymsDictionary.mjs';
import { processQueries } from './processQueries.mjs';

export const checkIfSynonyms = (dictionary, queries) => {
  const map = createSynonymsDictionary(dictionary);
  const result = processQueries(queries, map, dictionary);

  return result.join('\r\n');
};
