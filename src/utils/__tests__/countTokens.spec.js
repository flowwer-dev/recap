const countTokens = require('../countTokens');

describe('Utils | .countTokens', () => {
  it('counts tokens as 4 chars each', () => {
    const str = '123412341234';
    expect(countTokens(str)).toEqual(3);
  });

  it('counts extra spaces', () => {
    const str = ' 1   2 3        4 1   2  3     4   ';
    expect(countTokens(str)).toEqual(9);
  });

  it('rounds up incomplete tokens', () => {
    const str = '1234123412341';
    expect(countTokens(str)).toEqual(4);
  });
});
