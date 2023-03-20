const get = require('lodash.get');
const core = require('@actions/core');
const github = require('@actions/github');
const execute = require('./execute');
const { t } = require('./i18n');

const getPrId = () => get(github, 'context.payload.pull_request.node_id');

const getCurrentRepo = () => process.env.GITHUB_REPOSITORY;

const getParams = () => ({
  pullRequestId: getPrId(),
  currentRepo: getCurrentRepo(),
  githubToken: core.getInput('github-token'),
  openaiApiKey: core.getInput('openai-apikey'),
  publishAs: core.getInput('publish-as'),
  useTelemetry: core.getBooleanInput('telemetry'),
});

const run = async () => {
  try {
    await execute(getParams());
    core.info(t('execution.logs.success'));
  } catch (error) {
    core.debug(t('execution.errors.main', error));
    core.debug(error.stack);
    core.setFailed(error.message);
  }
};

run();
