export const createTestCases = (values) => {
  const testCases = [];

  for (let i = 0, length = values.length; i < length; i++) {
    let num;

    if (Number(values[i])) {
      num = values[i];
      let arr = [];

      for (let k = 1; k <= num; k++) {
        arr.push(values[i + k]);
      }
      testCases.push(arr);
    }
  }

  return testCases;
}