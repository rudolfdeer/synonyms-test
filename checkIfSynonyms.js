export const checkIfSynonyms = (dictionary, queries) => {
  console.log('dict: ', dictionary, 'queries: ', queries);
  let res = queries.map((query) => {
    if (query[0] === query[1]) return 'synonyms';

    const dictPairs = dictionary.filter((dictPair) => dictPair.indexOf(query[0]) > -1 || dictPair.indexOf(query[1]) > -1);

    const synonyms = dictPairs.filter((pair) => pair.indexOf(query[1]) > -1 );
    if (synonyms.length > 0) return 'synonyms';

    return 'different';
  })

  return res.join('\r\n');
}