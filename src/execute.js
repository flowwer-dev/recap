const core = require('@actions/core');
const github = require('@actions/github');
const { Telemetry } = require('./services');
const { main, checkSponsorship } = require('./interactors');
const { t } = require('./i18n');

module.exports = async (params) => {
  core.debug(t('execution.logs.params', { params: JSON.stringify(params, null, 2) }));

  const { useTelemetry, currentRepo } = params;
  const octokit = github.getOctokit(params.githubToken);
  const isSponsor = await checkSponsorship({ octokit, currentRepo });
  const telemetry = new Telemetry({ core, isSponsor, useTelemetry });

  if (isSponsor) core.info(t('execution.sponsors.thankYou'));

  try {
    telemetry.start(params);
    const results = await main({ octokit, ...params });
    if (results) telemetry.success(results);
  } catch (error) {
    telemetry.error(error);
    throw error;
  }
};
