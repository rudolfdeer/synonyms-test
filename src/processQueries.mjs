const output = {
      synonyms: 'synonyms',
      different: 'different',
    }

export const processQueries = (queries, map, dictionary) => {
  const result = queries.map((query) => {
    const firstWord = query[0];
    const secondWord = query[1];
    
    if (firstWord === secondWord) return output.synonyms;

    for (let i = 0; i < dictionary.length; i++) {
      if (
        dictionary[i].includes(firstWord) &&
        dictionary[i].includes(secondWord)
      )
        return output.synonyms;
    }

    if (!(firstWord in map) || !(secondWord in map)) return output.different;
    if (map[firstWord].some((el) => map[secondWord].includes(el)))
      return output.synonyms;
    if (map[secondWord].some((el) => map[firstWord].includes(el)))
      return output.synonyms;
    if (map[firstWord].includes(secondWord)) return output.synonyms;
    if (map[secondWord].includes(firstWord)) return output.synonyms;

    return output.different;
  });

  return result;
}
