---
nav_order: 2
title: Develop using VS Code
parent: Development
---

# Develop using VS Code

We recommend using [VS Code](https://code.visualstudio.com/download) for development, however other editors can also be used.

VS Code is a good option as it allows integration of various plugins that are used in this project including:

* [Prettier](https://prettier.io/docs/en/index.html) - An opinionated code formatter to ensure that a consistent style is used throughout the project.
  * If you do not have Prettier already installed, it is installed via the `package.json` dependencies outlined in the [Installation](#installation) step outlined above using `npm install`. Please see the Prettier documentation for any other issues regarding installation.
  * Install the plugin for VS Code [here](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  * For this project, we have defined npm scripts which can be used to automatically run Prettier:
    1. Run a simple check to verify code format is consistent with the style expected:
        ```sh
        npm run prettier
        ...
        ...
        Checking formatting...
        All matched files use Prettier code style!
        ```
    2. If any issues are flagged, Prettier can automatically overwrite the existing files to fix the issues by running:
        ```sh
        npm run prettier:write
        ```
  * Please repeat these steps and fix any other warnings which are raised before merging a pull request. The Prettier check is also run via GitHub Actions to notify you if there is any failure.

* [ESLint](https://eslint.org) - We use ESLint to statically analyse the project and detect common issues found in our JavaScript/TypeScript code.
  * If you do not have ESLint already installed, it is installed via the `package.json` dependencies outlined in the [Installation](#installation) step outlined above using `npm install`. Please see the ESLint documentation for any other issues regarding installation.
  * Install the plugin for VS Code [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  * We have also defined some npm scripts which can be used to automatically run ESLint:
    1. Run a simple linting check (Any warnings are written to the command line. No warnings indicates that the check has passed):
        ```sh
        npm run lint
        ```
    2. If any issues are flagged, ESLint can automatically overwrite the existing files to fix the issues by running:
        ```sh
        npm run lint:fix
        ```

To optimise the development experience using VS Code, there are some options which can be configured within `settings.json`. We recommend adding the following to this file to regularly enforce code formatting:

```
{
  ...
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  ...
}
```

Please repeat these steps and fix any other warnings which are raised before merging a pull request. The Prettier and ESLint checks are also run via GitHub Actions to notify you of any failures.
