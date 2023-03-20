const get = require('lodash.get');

const parseComments = (node) => ({
  ...node,
});

const parseRepository = (data) => ({
  name: data.name,
  owner: data.owner.login,
  fullName: data.nameWithOwner,
});

module.exports = ({ node: data }) => ({
  ...data,
  repository: parseRepository(get(data, 'repository')),
  comments: (get(data, 'comments.nodes') || []).map(parseComments),
});
