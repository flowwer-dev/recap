const { updatePullRequest, commentOnPullRequest } = require('../fetchers');

const buildBody = (currentBody, content) => {
  if (!currentBody.trim()) return content;
  return `${currentBody}\n\n${content}`;
};

module.exports = ({
  octokit,
  content,
  publishAs,
  pullRequest,
}) => {
  if (publishAs === 'DESCRIPTION') {
    return updatePullRequest({
      octokit,
      id: pullRequest.id,
      body: buildBody(pullRequest.body || '', content),
    });
  }

  return commentOnPullRequest({
    octokit,
    body: content,
    pullRequestId: pullRequest.id,
  });
};
