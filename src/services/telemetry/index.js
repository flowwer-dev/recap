const sendError = require('./sendError');
const sendStart = require('./sendStart');
const sendSuccess = require('./sendSuccess');
const buildTracker = require('./buildTracker');

class Telemetry {
  constructor({ core, isSponsor, useTelemetry }) {
    this.useTelemetry = !isSponsor || useTelemetry;
    this.tracker = this.useTelemetry ? buildTracker() : null;
    if (!this.useTelemetry) core.debug('Telemetry disabled correctly');
    if (!useTelemetry && !isSponsor) core.setFailed('Disabling telemetry is a premium feature, available to sponsors.');
  }

  start(params) {
    if (!this.useTelemetry) return;
    this.startDate = new Date();
    sendStart({
      ...params,
      tracker: this.tracker,
    });
  }

  error(error) {
    if (!this.useTelemetry) return;
    sendError({
      error,
      tracker: this.tracker,
    });
  }

  success(results) {
    if (!this.useTelemetry) return;
    sendSuccess({
      ...results,
      timeMs: new Date() - this.startDate,
      tracker: this.tracker,
    });
  }
}

module.exports = Telemetry;
