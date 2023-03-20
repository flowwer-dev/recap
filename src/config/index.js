const GPT_CONFIG = {
  model: 'text-davinci-003',
  max_tokens: 256,
  best_of: 1,
  echo: true,
  frequency_penalty: 0,
  logprobs: 0,
  presence_penalty: 0,
};

module.exports = {
  charsPerToken: () => 2.5,
  getTokensLimit: () => 4000,
  getGptConfig: () => GPT_CONFIG,
};
