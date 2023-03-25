const countTokens = require('./countTokens');
const { charsPerToken } = require('../config');

const FILES_SPLIT = 'diff --git';

const sliceChars = (file, maxTokens) => {
  const maxChars = maxTokens * charsPerToken();
  return file.slice(0, maxChars);
};

module.exports = (str, maxTokens) => {
  // Remove binary patches as they are not needed and can be very large.
  const formated = str.replace(/(?:GIT binary patch)(\ndelta.*\s*)(?:[diff --git]|$)/gmsu, 'GIT binary patch');
  const files = formated.split(new RegExp(`\n${FILES_SPLIT}`, 'g'));
  files.sort((a, b) => a.length - b.length);

  let tokens = 0;

  const limited = files.map((file) => {
    const max = Math.max(0, maxTokens - tokens);
    const remainder = sliceChars(file, max);
    tokens += countTokens(remainder);
    return remainder;
  }, []);

  return limited
    .filter((file) => file.length > 0)
    .join(`\n${FILES_SPLIT}`);
};
