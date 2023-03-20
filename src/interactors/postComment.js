const { updatePullRequest, commentOnPullRequest } = require('../fetchers');

const buildBody = (currentBody, content) => {
  if (!currentBody.trim()) return content;
  return `${currentBody}\n\n${content}`;
};

module.exports = ({
  octokit,
  comment,
  publishAs,
  pullRequest,
}) => {
  if (publishAs === 'DESCRIPTION') {
    return updatePullRequest({
      octokit,
      id: pullRequest.id,
      body: buildBody(pullRequest.body || '', comment),
    });
  }

  return commentOnPullRequest({
    octokit,
    body: comment,
    pullRequestId: pullRequest.id,
  });
};
