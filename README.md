# Sauce Demo let's test it!

[E2E] Automation tests for Sauce Labs shop - 🎭Playwright.

### Installation and setup

- install dependencies: `npm install`
- setup 🎭 Playwright framework `npx playwright install`
- setup husky `npx husky`
- (optional) install Visual Studio Code extensions

### How to run tests

- run all tests:

```
npx playwright test
```

For more usage cases look in `package.json` scripts section.

### Update package with audit and additional update of web browsers

```
npm update --save
npm update --save-dev
npm audit
npm audit fix
npx playwright install
```
