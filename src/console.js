const github = require('@actions/github');
const { main } = require('./interactors');

const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

main({
  octokit,
  openaiApiKey: process.env.OPENAI_API_KEY,
  pullRequestId: process.env.PULL_REQUEST_ID,
  publishAs: 'COMMENT',
});
