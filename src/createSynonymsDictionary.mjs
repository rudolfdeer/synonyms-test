export const createSynonymsDictionary = (dictionary) => {
  const map = {};

  for (let i = 0; i < dictionary.length; i++) {
    const synonyms = [];
    const currentPair = dictionary[i];

    const createKey = (word) => {
        if (!(word in map)) {
          currentPair.forEach((el) => synonyms.push(el));
          map[word] = synonyms;
        } else {
          currentPair.forEach((el) => map[word].push(el));
        }
      }
    createKey(currentPair[0]);
    createKey(currentPair[1]);
  }

  for (let key in map) {
    const synonyms = [];
    const currentMapValues = map[key];

    currentMapValues.forEach((word) => {
      const values = map[word].filter((el) => !currentMapValues.includes(el));
      values.forEach((el) => synonyms.push(el));
    });

    const add = [...new Set(synonyms)];
    add.forEach((el) => currentMapValues.push(el));
  }

  for (let key in map) {
    const filteredSynonyms = [...new Set(map[key])].filter((el) => el !== key);
    map[key] = filteredSynonyms;
  }

  return map;
}

