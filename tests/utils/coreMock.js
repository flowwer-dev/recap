const core = require('@actions/core');

jest.mock('@actions/core', () => ({
  ...jest.requireActual('@actions/core'),
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  setFailure: jest.fn(),
}));

module.exports = core;
