## About the project
The project is a small web app written in JS and a bit of React. The project domain revolves around cookie consent functionality. Obviously, it is not a mature project, but just a demo of my approach to code, structure, naming. Some of the architectural decisions may seem over-engineered for such a small codebase, but it's just an illustration. Look'n'feel (HTML and CSS) are not in the focus of this project.

## Project Structure
With regards to structure the project is divided into app and lib folders. The lib folder is for portable modules that are mostly independent from each other and from external context. The app folder is for app initialization and app-specific code which in this case is narrowed down to plain demonstration of lib functionality.

Lib folder is divided into subfolders according to the purpose of the code in them, for example: cookie-consent-domain is for domain models, cookie-consent-store is for domain model storage, cookie-consent-foundation is for business logic, ...

Project root contains config files and a plain HTTP server represented in startup.js.

## Important considerations
- There's almost no validation and exception handling to keep the codebase simpler;
- There are no abstract classes/interfaces to keep the codebase simpler;
- There are as little external dependencies as possible for the app to run easily;
- The app relies to several 'fresh' APIs so that a modern browser is required to run it (I've run it in Chrome).

## How to run
To run the project one should install a recent stable Node.js version, go to the project root, run 'npm install', 'npm start' commands and visit http://localhost:8080/app/index.html in the browser.
