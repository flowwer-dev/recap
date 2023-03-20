const core = require('@actions/core');
const axios = require('axios');
const parser = require('./parser');
const { t } = require('../../i18n');
const { getGptConfig } = require('../../config');
const { logRequestError } = require('../../utils');

const INSTRUCTIONS = `
Write in the past tense.
Be concise.
Format the results as markdown.
Make a numbered list of up to 3 elements explaining the most impactful changes in the following pull request patch:
`;

const buildPrompt = (patch) => {
  const wrapped = `"""PATCH STARS HERE"""\n${patch}\n"""PATCH ENDS HERE"""`;
  return `${INSTRUCTIONS}\n${wrapped}`;
};

module.exports = ({
  openaiApiKey,
  patch,
}) => {
  const url = 'https://api.openai.com/v1/completions';
  const prompt = buildPrompt(patch);
  const data = {
    ...getGptConfig(),
    prompt,
  };
  const options = {
    url,
    data,
    method: 'post',
    headers: {
      Authorization: `Bearer ${openaiApiKey}`,
      Accept: 'application/jsonh',
    },
  };
  return axios(options)
    .then(parser(prompt))
    .catch((error) => {
      core.debug(t('execution.errors.gptRequest', {
        options: JSON.stringify(options, null, 2),
      }));
      const response = error.response || {};
      logRequestError(core, error);
      if (response.status === 401) core.setFailed(t('execution.errors.badOpenaiApiKey'));
      throw error;
    });
};
