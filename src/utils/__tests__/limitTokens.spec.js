const { charsPerToken } = require('../../config');
const limitTokens = require('../limitTokens');

const buildCommit = (linesCount, index) => {
  const base = `diff --git a/cli.js b/cli.js
  --- a/cli.js
  +++ b/cli.js
  @@ -52,9 +52,12 @@`;
  const lines = Array(linesCount).fill(`-Some changes ${index}`);
  return [base, ...lines].join('\n');
};

const buildPullRequest = (commitLengths) => {
  const description = `From d6b1422d0ef36be0396639852a8b085c1230d1b4 Mon Sep 17 00:00:00 2001
  From: Manuel de la Torre <m@zenfi.mx>
  Date: Tue, 14 Sep 2021 10:16:08 -0700
  Subject: [PATCH 1/2] Fix broken
  
  Pull request body`;
  const commits = commitLengths.map((length, index) => buildCommit(length, index + 1));
  return [description, ...commits].join('\n');
};

describe('Utils | .limitTokens', () => {
  describe('when limit is above the whole pull request', () => {
    it('returns the whole pull request', () => {
      const largeLimit = 10000;
      const str = buildPullRequest([1, 2, 3]);
      const response = limitTokens(str, largeLimit);
      expect(response.length).toEqual(str.length);
    });
  });

  describe('when limit is too small', () => {
    it('returns the a portion of the smallest chunk', () => {
      const smallLimit = 40;
      const str = buildPullRequest([200, 300, 1]);
      const response = limitTokens(str, smallLimit);
      expect(response.length <= smallLimit * charsPerToken() + 10).toEqual(true);
      expect(response).toContain('-Some changes 3');
    });
  });
});
