# How do I make a contribution?

👍🎉 **First off, thanks for taking the time to read this and contribute!** 🎉👍

Open Targets follows the usual open source project conventions for external contributions. Here is a quick rundown:

1. Find an [issue](https://github.com/opentargets/platform/issues?q=is%3Aissue+is%3Aopen) you are interested in addressing or a [feature](https://github.com/opentargets/platform/labels/Kind%3A%20New%20feature) you would like to help building in the [issue tracker repo](https://github.com/opentargets/platform). Consider posting in the issue to inform us about the work you are doing.

2. Fork the relevant repository to your GitHub account. Take a look at the [Development](../README.md#development) section of the readme for more information on how to get the development environment started.

3. Create a new branch for your work using `git checkout -b branch-name-here`.

4. Work on your contribution. Be sure to read the [guidelines](#guidelines) to stay on course with our best practices.

5. When you are done, open a pull request (PR) in the original repository:

   - **The title** should be a short description of the changes made and the issue or bug number associated with your change. For example, you can title a pull request like so: "Removed dollar sign from links to resolve [opentargets/platform#1098](https://github.com/opentargets/platform/issues/1098)".

   - In **the description** of the pull request, explain the changes that you made, any issues you think exist with the pull request you made, and any questions you have for the maintainer. It's OK if your pull request is not perfect (no pull request is), the reviewer will be able to help you fix any problems and improve it!

6. Wait for the pull request to be reviewed by a maintainer.

7. Make changes to the pull request if the reviewing maintainer recommends them.

8. Celebrate your success after your pull request is merged!

## <a name="guidelines"></a> General guidelines for contributing

1. A PR must address a single issue or feature.
2. There must always be an issue number associated with the PR (in the title or description).
3. Only one commit per PR\*.
4. Commit message should include the issue number.
5. The branch should be rebased on `alpha` before opening the PR.
6. No changes to code not directly related to your PR.
7. Includes documentation.

**\*** This limitation is enforced on most PRs. A large feature or an issue which pertain different logical units can have more than one commit; but the general rule is one issue per PR, one commit per PR.

## Coding conventions

We are using [prettier v1.15.1](https://prettier.io/). Setting this up should mostly get you on the right track. Also, if you are using [Visual Studio Code](https://code.visualstudio.com/), you can install the [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) which enables you to automatically format your code on save.

# I have questions!

If you have any questions about contributing to Open Targets Platform you can head to our [Slack](https://opentargets-dev.slack.com/archives/C02UV8545), or post in the [issue tracker repo](https://github.com/opentargets/platform/issues).

Try to ask your question so it's as easy to answer as possible. If you're not sure how to do that these are some good guides:

- https://opensource.com/life/16/10/how-ask-technical-questions

- http://www.catb.org/esr/faqs/smart-questions.html

# What does the Code of Conduct mean for me?

Our [Code of Conduct](CODE_OF_CONDUCT.md) means that you are responsible for treating everyone on the project with respect and courtesy regardless of their identity. If you are the victim of any inappropriate behavior or comments as described in our Code of Conduct, we are here for you and will do the best to ensure that the abuser is reprimanded appropriately, per our code.

# Acknowledgements

This contributor guidelines document is based on:

- [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct/)
- [PurpleBooth/Good-CONTRIBUTING.md-template.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426)
- [QMK Firmware CONTRIBUTING.md](https://github.com/qmk/qmk_firmware/blob/master/docs/contributing.md)
- [Red Hat Keycloak CONTRIBUTING.md](https://github.com/keycloak/keycloak/blob/master/CONTRIBUTING.md)
