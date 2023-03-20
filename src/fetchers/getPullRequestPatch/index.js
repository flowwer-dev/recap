const parser = require('./parser');

module.exports = ({
  octokit,
  owner,
  repo,
  number,
}) => {
  const options = {
    owner,
    repo,
    pull_number: number,
    mediaType: {
      format: 'patch',
    },
  };
  return octokit.rest.pulls
    .get(options)
    .then(parser)
    .catch((error) => {
      const msg = `Error getting pull request with "${JSON.stringify(options)}"`;
      throw new Error(`${msg}. Error: ${error}, ${JSON.stringify(error.response.data)}`);
    });
};
