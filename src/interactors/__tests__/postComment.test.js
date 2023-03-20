const postComment = require('../postComment');
const { updatePullRequest, commentOnPullRequest } = require('../../fetchers');

jest.mock('../../fetchers', () => ({
  updatePullRequest: jest.fn(),
  commentOnPullRequest: jest.fn(),
}));

describe('Interactors | .postComment', () => {
  beforeEach(jest.clearAllMocks);

  const octokit = 'OCTOKIT';
  const pullRequest = {
    id: '1234',
    body: null,
  };
  const comment = '# MARKDOWN BODY';
  const baseParams = {
    octokit,
    comment,
    pullRequest,
    publishAs: null,
  };

  it('calls updatePullRequest when publishAs is "DESCRIPTION"', async () => {
    const publishAs = 'DESCRIPTION';
    await postComment({ ...baseParams, publishAs });
    expect(commentOnPullRequest).not.toBeCalled();
    expect(updatePullRequest).toBeCalledTimes(1);
    expect(updatePullRequest).toBeCalledWith({
      octokit,
      body: comment,
      id: pullRequest.id,
    });
  });

  it('appends recap to existing pull request content', async () => {
    const publishAs = 'DESCRIPTION';
    const prBody = '# Current PR body';
    await postComment({
      ...baseParams,
      publishAs,
      pullRequest: {
        ...pullRequest,
        body: prBody,
      },
    });
    expect(commentOnPullRequest).not.toBeCalled();
    expect(updatePullRequest).toBeCalledTimes(1);
    expect(updatePullRequest).toBeCalledWith({
      octokit,
      body: `${prBody}\n\n${comment}`,
      id: pullRequest.id,
    });
  });

  it('calls commentOnPullRequest when publishAs is any other value', async () => {
    const publishAs = 'COMMENT';
    await postComment({ ...baseParams, publishAs });
    expect(updatePullRequest).not.toBeCalled();
    expect(commentOnPullRequest).toBeCalledTimes(1);
    expect(commentOnPullRequest).toBeCalledWith({
      octokit,
      body: comment,
      pullRequestId: pullRequest.id,
    });
  });
});
