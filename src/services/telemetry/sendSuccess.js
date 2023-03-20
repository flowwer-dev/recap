module.exports = ({
  tracker,
  timeMs,
  ...results
}) => {
  const timeSec = Math.floor(timeMs / 1000);
  const timeMin = Math.floor(timeMs / 60000);
  const contentLength = results.content?.length;
  const contentLines = results.content?.split('\n').length;

  tracker.track('success', {
    // Necessary to learn how long it takes to run the action:
    timeMs,
    timeSec,
    timeMin,
    // Necessary to learn about GPT's performance and tune it:
    contentLength,
    contentLines,
    promptTokens: results.promptTokens,
    completionTokens: results.completionTokens,
    totalTokens: results.totalTokens,
    processingMs: results.processingMs,
  });
};
