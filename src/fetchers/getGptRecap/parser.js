const get = require('lodash.get');

module.exports = (prompt) => (response) => {
  const { data, headers } = response || {};
  const text = get(data, 'choices.0.text', '');
  const results = text.slice(prompt.length).trim();

  return {
    results,
    promptTokens: get(data, 'usage.prompt_tokens', null),
    completionTokens: get(data, 'usage.completion_tokens', null),
    totalTokens: get(data, 'usage.total_tokens', null),
    processingMs: parseInt(get(headers, 'openai-processing-ms') || 0, 10),
  };
};
