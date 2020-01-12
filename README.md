[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/nordicenergy/token-swap) 

# Nordic Energy TokenSwap Frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/fa110555-b3c7-4eeb-b840-88a835009c62/deploy-status)](https://app.netlify.com/sites/tokenswap/deploys)
[![Build Status](https://travis-ci.org/nordicenergy/tokenswap-frontend.svg)](https://travis-ci.org/nordicenergy/tokenswap-frontend)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

This an an open source interface for Token Swap - a protocol for decentralized exchange of Ethereum tokens.

- Website: [tokenswap.nordicenergy.io](https://tokenswap.nordicenergy.io/)
- Docs: [docs.tokenswap.io](https://docs.nordicenergy.io/tokenswap/)
- Twitter: [@TokenSwapExchange](https://twitter.com/TokenSwapExchange)
- Reddit: [/r/TokenSwap](https://www.reddit.com/r/TokenSwap/)
- Email: [contact@tokenswap.nordicenergy.io](mailto:tokenswap@nordicenergy.io)
- Discord: [Token Swap](https://discord.gg/Y7TF6QA)
- Whitepaper: [Link](https://nordicenergy.io/tokenswap/)

## Run TokenSwap Locally

1. Download and unzip the `build.zip` file from the latest release in the [Releases tab](https://github.com/nordicenergy/tokenswap-frontend/releases/latest).

2. Serve the `build/` folder locally, and access the application via a browser.

For more information on running a local server see [https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server). This simple approach has one downside: refreshing the page will give a `404` because of how React handles client-side routing. To fix this issue, consider running `serve -s` courtesy of the [serve](https://github.com/zeit/serve) package.

## Develop TokenSwap Locally

### Install Dependencies

```bash
yarn
```

### Configure Environment

Rename `.env.local.example` to `.env.local` and fill in the appropriate variables.

### Run

```bash
yarn start
```

To run on a testnet, make a copy of `.env.local.example` named `.env.local`, change `REACT_APP_NETWORK_ID` to `"{yourNetworkId}"`, and change `REACT_APP_NETWORK_URL` to e.g. `"https://{yourNetwork}.infura.io/v3/{yourKey}"`.

If deploying with Github Pages, be aware that there's some [tricky client-side routing behavior with `create-react-app`](https://create-react-app.dev/docs/deployment#notes-on-client-side-routing).

## Contributions

**Please open all pull requests against the `beta` branch.** CI checks will run against all PRs. To ensure that your changes will pass, run `yarn check:all` before pushing. If this command fails, you can try to automatically fix problems with `yarn fix:all`, or do it manually.
