import { Transform } from 'stream';
import { checkIfSynonyms } from './checkIfSynonyms.mjs';
import { createTestCases } from './createTestCases.mjs';

class Transformer extends Transform {
  constructor() {
    super();
    this.res = [];
  }

  _transform(chunk, encoding, callback) {
    const inputString = chunk.toString();
    this.rows = inputString.trim().split('\n');
    this.values = this.rows.map((row) => {
      if (Number(row)) return Number(row);
      return row.toLowerCase().split(' ');
    });
    this.values.shift();

    const testCases = createTestCases(this.values);

    for (let i = 0, length = testCases.length; i < length; i += 2) {
      let res = checkIfSynonyms(testCases[i], testCases[i + 1]);
      this.res.push(res);
    }

    this.push(this.res.join('\r\n'));

    callback();
  }
}

const transformer = () => new Transformer();

export { transformer };
