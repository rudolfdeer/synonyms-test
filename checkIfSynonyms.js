export const checkIfSynonyms = (dictionary, queries) => {
  const map = {};

  for (let i = 0; i < dictionary.length; i++) {
    const arr = [];
    const currentDictPair = dictionary[i];

    if (!(currentDictPair[0] in map)) {
      currentDictPair.forEach((el) => arr.push(el));
      map[currentDictPair[0]] = arr;
    } else {
      currentDictPair.forEach((el) => map[currentDictPair[0]].push(el));
    }

    if (!(currentDictPair[1] in map)) {
      currentDictPair.forEach((el) => arr.push(el));
      map[currentDictPair[1]] = arr;
    } else {
      currentDictPair.forEach((el) => map[currentDictPair[1]].push(el));
    }
  }

  for (let key in map) {
    const arr = [];
    const currentMapValues = map[key];

    currentMapValues.forEach((word) => {
      const values = map[word].filter((el) => !currentMapValues.includes(el));
      values.forEach((el) => arr.push(el));
    });

    const add = [...new Set(arr)];
    add.forEach((el) => currentMapValues.push(el));
  }

  for (let key in map) {
    const arr = [...new Set(map[key])].filter((el) => el !== key);
    map[key] = arr;
  }

  const result = queries.map((query, k) => {
    const firstWord = query[0];
    const secondWord = query[1];

    if (firstWord === secondWord) return 'synonyms';

    for (let i = 0; i < dictionary.length; i++) {
      if (
        dictionary[i].includes(firstWord) &&
        dictionary[i].includes(secondWord)
      )
        return 'synonyms';
    }

    if (!(firstWord in map) || !(secondWord in map)) return 'different';
    if (map[firstWord].some((el) => map[secondWord].includes(el)))
      return 'synonyms';
    if (map[secondWord].some((el) => map[firstWord].includes(el)))
      return 'synonyms';
    if (map[firstWord].includes(secondWord)) return 'synonyms';
    if (map[secondWord].includes(firstWord)) return 'synonyms';

    return 'different';
  });

  return result.join('\r\n');
};
