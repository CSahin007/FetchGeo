# GeoLocation Utility

## Description

This project provides a command-line utility to fetch geolocation data using the OpenWeather Geocoding API. The utility is built with TypeScript and Playwright for testing.

In response to your project, I've identified a few inconsistencies with the API responses, such as missing state names and incorrect status codes. I have left the automated tests failing so you can see what was incorrect. Following a Test-Driven Development (TDD) strategy, as the APIs are updated by the developers, the test cases will gradually start to pass.

## Requirements

- Node.js (version 18.x or later)
- [TypeScript](https://www.typescriptlang.org/)
- [Playwright](https://playwright.dev/)

## Installation

1. **Clone the Repository:**

   git clone
   Check Github Actions for results

2. **Install Dependencies:**
   --Run Terminal Command below--
   npm install

3. **Command-Line Interface/Usage**
   To Run Utils src file == npm start -- "City, St" "Zipcode"
   example == npm start -- "Madison, WI" "12345" "Chicago, IL" "10001"

To Run Test case file == npm RunTest

4. **Reports**
   To see Test Case results see github actions.
   or playwright-reports folder inside find index.html - open with file explorer then click to open with browser.

Contact
For any questions or issues, please contact:

Email: sahinmcs@outlook.com
