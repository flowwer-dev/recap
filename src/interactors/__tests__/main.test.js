const main = require('../main');
const postComment = require('../postComment');
const alreadyPublished = require('../alreadyPublished');
const { getPullRequestById, getPullRequestPatch, getGptRecap } = require('../../fetchers');

const PULL_REQUEST = {
  id: '1234',
  body: 'BODY',
  number: 1,
  repository: {
    owner: 'OWNER',
    name: 'REPO',
  },
};

const PATCH = 'PATCH';

const GPT_RECAP = {
  results: 'GPT Results',
};

jest.mock('../../fetchers', () => ({
  getPullRequestById: jest.fn(),
  getPullRequestPatch: jest.fn(),
  getGptRecap: jest.fn(),
}));

jest.mock('../alreadyPublished', () => jest.fn());

jest.mock('../postComment', () => jest.fn());

describe('Interactors | .main', () => {
  beforeEach(jest.clearAllMocks);

  getPullRequestById.mockResolvedValue(PULL_REQUEST);
  getPullRequestPatch.mockResolvedValue(PATCH);
  getGptRecap.mockResolvedValue(GPT_RECAP);
  alreadyPublished.mockReturnValue(false);

  const octokit = 'OCTOKIT';
  const openaiApiKey = 'OPENAI_API_KEY';
  const publishAs = 'PUBLISH_AS';
  const baseParams = {
    octokit,
    openaiApiKey,
    publishAs,
    pullRequestId: PULL_REQUEST.id,
  };

  it('returns the GPT recap', async () => {
    const results = await main(baseParams);
    expect(results).toEqual(GPT_RECAP);
  });

  it('requests the pull request by its ID', async () => {
    await main(baseParams);
    expect(getPullRequestById).toBeCalledTimes(1);
    expect(getPullRequestById).toBeCalledWith(
      octokit,
      PULL_REQUEST.id,
    );
  });

  it('checks it the results have been published already', async () => {
    await main(baseParams);
    expect(alreadyPublished).toBeCalledTimes(1);
    expect(alreadyPublished).toBeCalledWith(PULL_REQUEST);
    expect(alreadyPublished).toHaveBeenCalledAfter(getPullRequestById);
  });

  it('fetches the pull request patch', async () => {
    await main(baseParams);
    expect(getPullRequestPatch).toBeCalledTimes(1);
    expect(getPullRequestPatch).toBeCalledWith({
      octokit,
      owner: PULL_REQUEST.repository.owner,
      repo: PULL_REQUEST.repository.name,
      number: PULL_REQUEST.number,
    });
    expect(getPullRequestPatch).toHaveBeenCalledAfter(alreadyPublished);
  });

  it('fetches the GPT response', async () => {
    await main(baseParams);
    expect(getGptRecap).toBeCalledTimes(1);
    expect(getGptRecap).toBeCalledWith({
      openaiApiKey,
      patch: PATCH,
    });
    expect(getGptRecap).toHaveBeenCalledAfter(getPullRequestPatch);
  });

  it('posts the results', async () => {
    await main(baseParams);
    expect(postComment).toBeCalledTimes(1);
    expect(postComment).toBeCalledWith({
      octokit,
      publishAs,
      pullRequest: PULL_REQUEST,
      content: expect.stringContaining(GPT_RECAP.results),
    });
    expect(getGptRecap).toHaveBeenCalledAfter(getPullRequestPatch);
  });

  it('returns early when results have been published already', async () => {
    alreadyPublished.mockReturnValueOnce(true);
    await main(baseParams);
    expect(alreadyPublished).toBeCalledTimes(1);
    expect(getPullRequestPatch).not.toBeCalled();
    expect(getGptRecap).not.toBeCalled();
    expect(postComment).not.toBeCalled();
  });
});
