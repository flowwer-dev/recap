module.exports = (core, error) => {
  if (error.response) {
    core.debug(`Status: ${error.response.status}`);
    core.debug(`Data: ${JSON.stringify(error.response.data)}`);
    core.debug(`Headers: ${JSON.stringify(error.response.headers)}`);
  }
};
