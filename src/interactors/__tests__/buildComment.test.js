const buildComment = require('../buildComment');

const RECAP_MOCK = 'RECAP';

describe('Interactors | .buildComment', () => {
  const title = '## ⚡️ Recap';

  it('builds the message as markdown', () => {
    const expected = `${title}\n${RECAP_MOCK}`;
    const response = buildComment(RECAP_MOCK);
    expect(response).toEqual(expected);
  });
});
