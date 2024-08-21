# Introduction

# Cloning
Clone this repository from https://dev.azure.com/Corcentric-Devops/CorSymphonyAutomation/_git/qa-web-testing-corsymphony

# Getting Started
Guide users through getting your code up and running on their own system. In this section you can talk about:

1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Installation 
Run from your project's root directory
•	npm i -D @playwright/test
•	npm i -D playwright 
npm init -y
•	npx playwright install/npm init playwright@latest


# Sofwate Dependencieswr
Playwright doesn't come with the built-in support for BDD so we are going to use the help of another tool Cucumber
•	npm i -D @cucumber/cucumber@9.1.2 @cucumber/pretty-formatter/npm install cucumber
•	Node.js version 10 or above. If you don't already have node installed in your system you can use this blog as a guide
•   npm install multiple-cucumber-html-reporter --save-dev for reporting


# Build and Test
•   To execute the project using the provided `package.json` file, follow these steps:
    npm test
    o	This command will trigger the execution of the Cucumber tests using `cucumber-js`.
    o	The `test` script runs the `cucumber-js test || true` command. 
    o	If any test fails, the `true` part ensures that the script does not exit with a non-zero status code.


# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)

if you find the issues: 
npm install cucumber
 npm init -y
 npm rm cucumber
 npm install --save-dev @cucumber/cucumber
npm install ts-node

