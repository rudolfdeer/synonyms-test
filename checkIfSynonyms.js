export const checkIfSynonyms = (dictionary, queries) => {
  const map = {};

  for (let i = 0; i < dictionary.length; i++) {
    const arr = [];

    if (!(dictionary[i][0] in map)) {
      dictionary[i].forEach((el) => arr.push(el));

      map[dictionary[i][0]] = arr;
    } else {
      dictionary[i].forEach((el) => map[dictionary[i][0]].push(el));
    }

    if (!(dictionary[i][1] in map)) {
      dictionary[i].forEach((el) => arr.push(el));
      map[dictionary[i][1]] = arr;
    } else {
      dictionary[i].forEach((el) => map[dictionary[i][1]].push(el));
    }
  }

  for (let key in map) {
    const add = [];
    const current = map[key]; //[]

    current.forEach((word) => {
      const values = map[word].filter((el) => !current.includes(el));
      values.forEach((el) => add.push(el));
    });
    const arr = [...new Set(add)];
    arr.forEach((el) => current.push(el));
  }

  for (let key in map) {
    const arr = [...new Set(map[key])].filter((el) => el !== key);
    map[key] = arr;
  }

  const result = queries.map((query, k) => {
    const firstWord = query[0];
    const secondWord = query[1];

    console.log('to check', k, firstWord, secondWord);

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
