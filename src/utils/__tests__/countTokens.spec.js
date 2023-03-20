const countTokens = require('../countTokens');

describe('Utils | .countTokens', () => {
  it('counts tokens as multiple chars each', () => {
    const str = '123412341234';
    expect(countTokens(str)).toEqual(5);
  });

  it('counts extra spaces', () => {
    const str = ' 1   2 3        4 1   2  3     4   ';
    expect(countTokens(str)).toEqual(14);
  });

  it('rounds up incomplete tokens', () => {
    const str = '1234123412341';
    expect(countTokens(str)).toEqual(6);
  });
});
