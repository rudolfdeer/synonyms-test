import { Transform } from 'stream';

class Transformer extends Transform {
  constructor(func) {
    super();
    this.func = func;
    this.res = [];
  }

  _transform(chunk, encoding, callback) {
    const inputString = chunk.toString();

    this.rows = inputString.trim().split('\n');

    this.values = this.rows.map((el) =>{
      if (Number(el)) return Number(el);
      return el.toLowerCase().split(' ');
    });

    this.values.shift();

    const testCases = [];

    for (let i = 0; i < this.values.length; i++) {
      let num;

      if (Number(this.values[i])) {
        num = this.values[i];
        let arr = [];

        for (let k = 1; k <= num; k++) {
          arr.push(this.values[i+k]);
        }
        testCases.push(arr)
      }
    }

    for (let i = 0; i < testCases.length; i += 2) {
     
      let res = this.func(testCases[i], testCases[i+1]);
      this.res.push(res);
    }

    this.push(this.res.join('\r\n'));

    callback();
  }
}

const transformer = (func) => new Transformer(func);

export { transformer };