// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const { writeToFile } = require('fs').promises;

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "project",
    message: "Write the name of the project.",
  },
  {
    type: "input",
    name: "desc",
    message: "Write a short description of the project.",
  },
  {
    type: "input",
    name: "install",
    message: "Write installation instructions for the project. (or leave blank if not applicable)",
  },
  {
    type: "input",
    name: "usage",
    message: "Write instructions for using the project.",
  },
  {
    type: "input",
    name: "tests",
    message: "Write instructions for testing the project.",
  },
  {
    type: "input",
    name: "github",
    message: "Write the name of the GitHub profile that owns the project. (Note that this is case-sensitive)",
  },
  {
    type: "input",
    name: "email",
    message: "Write the email address that users should direct questions to.",
  },
  {
    type: "input",
    name: "contributing",
    message: "Write guidelines for contributing to the project.",
  },
  {
    type: "input",
    name: "credits",
    message: "Write the names of the people and/or organizations who worked on this project as well as what third party assets were used.",
  }
];

const promptQuestions = () => {
  return inquirer.prompt(questions)};

// TODO: Create a function to write README file

const generateREADME = ({ project, desc, install, usage, tests, github, email, contributing, credits, license }) =>
  `# ${project}
  
  ## Badges

  ## Description
  ${desc}

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)
  - [Questions](#questions)
  - [Contributing](#contributing)
  - [Credits](#credits)
  - [License](#license)
  
  ## Installation
  ${install}
  
  ## Usage
  ${usage}

  ## Tests
  ${tests}
  
  ## Questions
  Questions can be directed to this GitHub profile or this email
  GitHub: [${github}](https://github.com/${github})
  Email: [${email}](mailto:${email})

  ## Contributing
  ${contributing}
  
  ## Credits
  ${credits}
  
  ## License
  ${license}` 
;

// TODO: Create a function to initialize app
const fileName = "README.md";

function init() {
  promptQuestions()
  .then((data) => writeToFile(fileName, generateREADME(data)))
  .then(() => console.log("Success! Created " + fileName))
  .catch((err) => console.error(err));
}

// Function call to initialize app
init();
