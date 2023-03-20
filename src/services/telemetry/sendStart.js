const { getRepoOwner } = require('../../utils/repos');

module.exports = ({
  tracker,
  currentRepo,
  publishAs,
}) => {
  const owner = getRepoOwner(currentRepo);

  tracker.track('run', {
    // Necessary to build the "Used by" section in Readme:
    owner,
    currentRepo,
    // Necessary to learn which options are commonly used and improve them:
    publishAs,
  });
};
