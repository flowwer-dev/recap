const nock = require('nock');
const getGptRecap = require('../getGptRecap');

const response = {
  status: 200,
  data: {
    id: 'cmpl-6vVIAByAjjpYgiQZbQ3M8AwLnrJG8',
    object: 'text_completion',
    created: 1679163002,
    model: '',
    choices: [
      {
        text: 'RECAP RESULTS',
        index: 0,
        logprobs: {
          tokens: ['Write', ' in', ' the', ' past', ' tense', ' ...'],
          token_logprobs: [null, -5.7676415, -1.6620121, -6.411352, -3.5146735, -1.5957605],
          top_logprobs: null,
          text_offset: [0, 5, 8, 12, 17, 23],
        },
        finish_reason: 'stop',
      },
    ],
    usage: {
      prompt_tokens: 911,
      completion_tokens: 52,
      total_tokens: 963,
    },
  },
  headers: {
    'Openai-Processing-Ms': '398',
  },
};

describe('Fetchers | .getGptRecap', () => {
  const openaiApiKey = 'OPENAI_API_KEY';
  const patch = 'PR_PATCH';

  beforeEach(() => {
    nock('https://api.openai.com')
      .matchHeader('Authorization', `Bearer ${openaiApiKey}`)
      .defaultReplyHeaders(response.headers)
      .post('/v1/completions')
      .reply(response.status, response.data);
  });

  it('makes the request with the correct parameters and parses the response', async () => {
    const data = await getGptRecap({ openaiApiKey, patch });
    expect(data).toEqual({
      content: expect.any(String),
      completionTokens: 52,
      processingMs: 398,
      promptTokens: 911,
      totalTokens: 963,
    });
  });
});
