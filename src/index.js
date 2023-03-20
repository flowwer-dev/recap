const get = require('lodash.get');
const core = require('@actions/core');
const github = require('@actions/github');
const execute = require('./execute');
const { t } = require('./i18n');

const getPrId = () => get(github, 'context.payload.pull_request.node_id');

const getParams = () => ({
  pullRequestId: getPrId(),
  githubToken: core.getInput('github-token'),
  openaiApiKey: core.getInput('openai-api-key'),
  publishAs: core.getInput('publish-as'),
  telemetry: core.getBooleanInput('telemetry'),
});

const run = async () => {
  try {
    await execute(getParams());
    core.info(t('execution.logs.success'));
    core.info(t('execution.logs.news'));
  } catch (error) {
    core.debug(t('execution.errors.main', error));
    core.debug(error.stack);
    core.setFailed(error.message);
  }
};

run();
