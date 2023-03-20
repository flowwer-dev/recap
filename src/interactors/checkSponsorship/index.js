const isSponsoring = require('./isSponsoring');
const isExternalSponsor = require('./isExternalSponsor');
const { fetchSponsorships } = require('../../fetchers');
const { getRepoOwner } = require('../../utils/repos');

module.exports = async ({
  octokit,
  currentRepo,
}) => {
  const logins = [getRepoOwner(currentRepo)];
  const { user } = await fetchSponsorships({ octokit, logins });
  return isSponsoring(user) || isExternalSponsor(logins);
};
