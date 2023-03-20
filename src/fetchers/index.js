const getGptRecap = require('./getGptRecap');
const getPullRequestById = require('./getPullRequestById');
const getPullRequestPatch = require('./getPullRequestPatch');
const commentOnPullRequest = require('./commentOnPullRequest');
const fetchSponsorships = require('./fetchSponsorships');
const updatePullRequest = require('./updatePullRequest');

module.exports = ({
  getGptRecap,
  getPullRequestById,
  getPullRequestPatch,
  commentOnPullRequest,
  fetchSponsorships,
  updatePullRequest,
});
