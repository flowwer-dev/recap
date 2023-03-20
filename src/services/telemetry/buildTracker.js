const Mixpanel = require('mixpanel');
const project = require('../../../package.json');

const MIXPANEL_TOKEN = '8f886df5d94a05dbb4f34a8be396e36c';

const getContext = () => ({ version: project.version });

const buildTracker = () => {
  const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);
  const context = getContext();

  const track = (event, properties) => mixpanel.track(event, {
    ...context,
    ...properties,
  });

  return {
    track,
  };
};

module.exports = buildTracker;
