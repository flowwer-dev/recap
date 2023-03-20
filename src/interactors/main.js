const core = require('@actions/core');
const alreadyPublished = require('./alreadyPublished');
const buildComment = require('./buildComment');
const postComment = require('./postComment');
const { t } = require('../i18n');
const { limitTokens } = require('../utils');
const { getTokensLimit } = require('../config');
const { getPullRequestById, getPullRequestPatch, getGptRecap } = require('../fetchers');

module.exports = async ({
  octokit,
  openaiApiKey,
  pullRequestId,
  publishAs,
}) => {
  const pullRequest = await getPullRequestById(octokit, pullRequestId);
  core.debug(t('execution.logs.pullRequest', {
    pullRequest: JSON.stringify(pullRequest, null, 2),
  }));

  if (alreadyPublished(pullRequest)) {
    core.info(t('execution.skip'));
    return null;
  }

  const prPatch = await getPullRequestPatch({
    octokit,
    owner: pullRequest.repository.owner,
    repo: pullRequest.repository.name,
    number: pullRequest.number,
  });
  core.debug(t('execution.logs.prPatch', { prPatch }));

  const recap = await getGptRecap({
    openaiApiKey,
    patch: limitTokens(prPatch, getTokensLimit()),
  });
  core.debug(t('execution.logs.recap', {
    recap: JSON.stringify(recap, null, 2),
  }));

  await postComment({
    octokit,
    publishAs,
    pullRequest,
    content: buildComment(recap.results),
  });
  core.debug(t('execution.logs.postedComment'));

  return recap;
};
