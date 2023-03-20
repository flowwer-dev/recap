const core = require('@actions/core');
const axios = require('axios');
const parser = require('./parser');
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
      const msg = `Error getting GPT Recap with "${JSON.stringify(options)}"`;
      core.debug(msg);
      logRequestError(core, error);
      throw error;
    });
};
