# Perfect Testers

## Introduction

The aim of this project is to set up a continuous integration (CI) environment that can build a software project and run
tests automatically. We've created a basic online shopping website for this purpose. This project includes an automated
test environment that responds quickly to code changes from developers.

## Technical Stack

- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects. It
  serves your code via native ES Module imports during development, allowing you to develop your single-page app in the
  browser without a bundler.

- **VanillaJS**: Refers to plain JavaScript code, not extended in any way by any framework and not reliant on any
  external libraries.

- **Vitest**: A unit and integration test runner. It's designed to work with Vite, allowing for fast testing workflows.

- **Playwright**: A system test runner that allows you to automate actions on a web browser, making it excellent for
  end-to-end testing.

## Setup

To set up the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Dyskal/perfect-testers
    ```

2. Navigate into the project directory:
    ```bash
    cd perfect-testers
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Running Tests

- To run unit and integration tests with Vitest:
    ```bash
    npm run test:run
    ```

- To run system tests with Playwright:
    ```bash
    npm run test:system
    ```

## Building and Running the Project

- To start the development server:
    ```bash
    npm run dev
    ```

- To build the project for production:
    ```bash
    npm run build
    ```

- To serve the built project:
    ```bash
    npm run preview
    ```
