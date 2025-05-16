# Sauce Demo - Let's Test It!

[E2E] Automation tests for Sauce Labs shop using 🎭 **Playwright** framework.
Tests are written using **TypeScript** language and Page Object Model (POM) design pattern.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation and Setup](#installation-and-setup)
3. [Folder Structure](#folder-structure)
4. [Code Language and Framework](#code-language-and-framework)
5. [Design Pattern: Page Object Model (POM)](#design-pattern-page-object-model-pom)
6. [How to Run Tests](#how-to-run-tests)
7. [Reporting with Allure Report](#reporting-with-allure-report)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

This repository contains end-to-end (E2E) automation tests for the Sauce Labs shop. The tests are built using the Playwright framework, ensuring robust and reliable testing for web applications.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sauce-demo-let-s-test-it
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Playwright:
   ```bash
   npx playwright install
   ```
4. Set up Husky for Git hooks [(husky docs)](https://typicode.github.io/husky/get-started.html):
   ```bash
   npx husky init
   ```
5. (Optional) Install recommended Visual Studio Code extensions.

## Folder Structure

A brief overview of the folder structure:

- `src/`: Contains source files, including components, helpers, models, and utilities.
  - `tests/`: Organized test cases for accessibility, API, E2E, performance, and UI.
  - `output/`: Stores test reports, logs, and results.
  - `config/`: Configuration files for the project.
  - `fixtures/`: Test data and setup files.

## Code Language and Framework

This project is written in **TypeScript**, a strongly typed superset of JavaScript, which provides better tooling and type safety for large-scale projects. The testing framework used is **Playwright**, which is known for its fast and reliable end-to-end testing capabilities.

## Design Pattern: Page Object Model (POM)

The project follows the **Page Object Model (POM)** design pattern to enhance test maintainability and readability. Each page or component of the application is represented as a class, encapsulating its elements and actions. This approach ensures:

- Reusability of code.
- Easier maintenance when UI changes occur.
- Improved readability and organization of test scripts.

The `pages/` and `components/` directories contain the implementation of the POM structure, while the `tests/` directory contains the test cases that interact with these page objects.

## How to Run Tests

Run all tests:

```bash
npx playwright test
```

For additional test commands, refer to the `scripts` section in `package.json`.

## Reporting with Allure Report

This project integrates **Allure Report** for generating detailed and interactive test reports. Allure Report provides insights into test execution, including:

- Test case status (passed, failed, skipped).
- Execution time and duration.
- Attachments such as screenshots, logs, and videos.

### How to Generate Allure Reports

1. Run your tests with the following command to ensure results are generated:
   ```bash
   npx playwright test
   ```
2. Generate the Allure Report:
   ```bash
   npx allure generate src/output/allure-results -o src/output/allure-reports --clean
   ```
3. Serve the report locally to view it in a browser:
   ```bash
   npx allure open ./src/output/allure-reports
   ```

The generated report will be available in the `src/output/allure-reports` directory.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear messages.
4. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
