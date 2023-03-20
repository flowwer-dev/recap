const { charsPerToken } = require('../config');

// Each token is counted as 4 characters according to OpenAI's API docs.
// https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
module.exports = (str) => Math.ceil((str || '').length / charsPerToken());
