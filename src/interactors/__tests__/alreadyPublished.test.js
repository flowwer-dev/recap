const alreadyPublished = require('../alreadyPublished');

const RECAP = '## ⚡️ Recap\n|content|';
const OTHER_CONTENT = '## Other pull request content';

describe('Interactors | .alreadyPublished', () => {
  it('returns false when input is falsy', () => {
    expect(alreadyPublished(null)).toBe(false);
  });

  it('returns false when body is empty', () => {
    const body = '';
    const pullRequest = { body };
    expect(alreadyPublished(pullRequest)).toBe(false);
  });

  it('returns false when body contains other stuff', () => {
    const body = OTHER_CONTENT;
    const pullRequest = { body };
    expect(alreadyPublished(pullRequest)).toBe(false);
  });

  it('returns true when body contains recap only', () => {
    const body = RECAP;
    const pullRequest = { body };
    expect(alreadyPublished(pullRequest)).toBe(true);
  });

  it('returns true when body contains other stuff and recap', () => {
    const body = `${OTHER_CONTENT}\n${RECAP}`;
    const pullRequest = { body };
    expect(alreadyPublished(pullRequest)).toBe(true);
  });

  it('returns true when a comment contains stats', () => {
    const comments = [
      {
        body: RECAP,
      },
    ];
    const pullRequest = { body: '', comments };
    expect(alreadyPublished(pullRequest)).toBe(true);
  });
});
