# Recap

[![CI](https://github.com/flowwer-dev/recap/workflows/Tests/badge.svg)](https://github.com/flowwer-dev/recap/actions?query=workflow%3ATests)

Tired of writing long pull request descriptions? or worst, not writing them at all?

This Github action will summarize the most important changes in a pull request using [GPT](https://openai.com/blog/chatgpt).

The objective of this action is to:

* Reduce the time spent writing the pull request description.
* Help developers understand the changes before reviewing them.

Running this action will add a comment to the pull request with a summary of the changes.

![](/assets/exmaple.png)

## Privacy
* **No repository data is collected**, stored, or distributed by this GitHub action. This action is **state-less**.
* [Minimal data](/src/services/telemetry/sendStart.js) is sent to Mixpanel in order to improve this action. However, you can opt-out using the `telemetry` option.

## Usage

Just add this action to one of your [workflow files](https://docs.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow):

```yml
      - name: Recap changes
        uses: flowwer-dev/recap@main
```

### Action inputs

The possible inputs for this action are:

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `openai-apikey` | An API Key for your OpenAI account. This parameter is **required**. Check how to get an API [here](#how-the-get-an-openai-api-key). | `null` |
| `publish-as` | Where to publish the results. Possible values: as a `COMMENT`, on the pull request `DESCRIPTION`. | `COMMENT` |
| `telemetry` | Indicates if the action is allowed to send monitoring data to the developer. This data is [minimal](/src/services/telemetry/sendStart.js) and helps me improve this action. **This option is a premium feature reserved for [sponsors](#premium-features-).** |`true`|

## Examples

**Minimal config**

Add this to the file `.github/workflows/recap.yml` in your repo:

```yml
name: Pull Request Recap

on:
  pull_request:
    types: [opened]

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Recap changes
        uses: flowwer-dev/recap@main
        with:
          openai-apikey: ${{ secrets.ADD_YOUR_OPENAI_APIKEY }}
```

This config will:

* Recap the most important changes included in the Pull Request.
* Post them as a comment.

## How the get an OpenAI API Key?

1. Create an account on [OpenAI's developers site](https://platform.openai.com/docs/api-reference).
2. Go to Config > [View API Keys](https://platform.openai.com/account/api-keys).
3. Press the button `Create new secret key` and copy the value.
4. Voilà!

## Troubleshooting

<details>
  <summary>I get the error "Error commenting on the pull request...".</summary>

  This error happens when the organization configures the action's permissions as `read`. To fix it, overwrite them by adding a [`permissions`](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs) configuration in the workflow file. The minimum required permissions are `contents: read` and `pull-requests: write`:

  ```yml
  jobs:
  stats:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@main
  ```
</details>

<details>
  <summary>I'm a sponsor but still getting the error "...is a premium feature, available to sponsors".</summary>

  1. Check the sponsorship comes from the account that owns the configured repos (usually an organization).
  2. Make sure the sponsorship is configured as `public`, otherwise, the action cannot access the sponsorship information. If you prefer to keep it `private`, please reach me out to make it work for you that way 😉.
</details>

## Premium features ✨

This action offers some premium features only for sponsors:

* Disabling telemetry.
* More comming soon.

The **suggested sponsorship is $20 USD / month**. However, if it's not possible for you or your organization, please consider supporting it with any amount you can. Even a one-time sponsorship will enable the Premium features and encourage the progress of this project.

Beign a sponsor will also give you access to the premium features in all my [other projects](#related-projects).

Thanks for your support! 💙


## Related projects

* **[Pull Request Stats](https://github.com/flowwer-dev/pull-request-stats)**: Github action to print relevant stats about Pull Request **reviewers**.

## Author

|<a href="https://github.com/manuelmhtr"><img src="https://avatars.githubusercontent.com/u/1031639?v=4" width="32"></a>|[@manuelmhtr](https://github.com/manuelmhtr)<br/>🇲🇽 Guadalajara, MX|
| -- | :-- |


## Help

This project is maintained by a single person, considering supporting the project by:

* ⭐ Star this repo.
* Becoming a [sponsor](https://github.com/sponsors/manuelmhtr).

### License

MIT
