const inquirer = require("inquirer");
const fs = require("fs");

const generateREADME = ({ project, desc, install, usage, credits }) =>
  `# ${project}
  
  ## Description
  ${desc}
  
  ## Installation
  ${install}
  
  ## Usage
  ${usage}
  
  ## Contact
  Email: [${contact}](mailto:${contact})
  
  ## Credits
  ${credits}
  
  ## License
  TODO: Add a license` ;

inquirer
  .prompt([
    {
      type: "input",
      name: "project",
      message: "What is the project's name?",
    },
    {
      type: "input",
      name: "desc",
      message: "Write a short description of the project.",
    },
    {
      type: "input",
      name: "install",
      message: "What are the steps required to install the project? (leave blank if not applicable)",
    },
    {
      type: "input",
      name: "usage",
      message: "Provide instructions for using the project.",
    },
    {
      type: "input",
      name: "contact",
      message: "What email should users contact when they have questions, comments, or concerns?",
    },
    {
      type: "input",
      name: "credits",
      message: "What are the names of the people and/or organizations who worked on this project? What third party assets were used?",
    }])
    .then((data) => {
      const filename = "README.md";

        const READEMEContent = generateREADME(data);
  
      fs.writeFile(filename, READEMEContent, (err) =>
        err ? console.log(err) : console.log("Success! README generated!")
      );
    });