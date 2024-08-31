## Read me carefully before starting to work :)

## Table of Contents
- Project Setup and Configuration

- Run / Dev / Test

- Contribution Routine

 

## Project Setup and Configuration
1. Go to Your Local Working Directory
Navigate to the directory on your machine where you want to set up the project.

2. Clone the Repository
Clone the repository to your local machine using the following command:

`git clone <repository-url>`

3. Ensure That You Have NPM Installed
Make sure you have Node.js and npm installed on your system. You can check the installation by running:

`node -v npm -v`

4. Navigate to the Project Directory
Move into the project directory:

`cd <project-directory>`

5. Install Dependencies and Prepare Husky Package
Install the necessary project dependencies and prepare Husky for managing Git hooks:

`npm install && npm run prepare`

6. Download the `.env` File
Download the `.env` file provided by our team.

Place the `.env` file in the root of the project directory.

 

## Run / Dev / Test
Start Running the Project
For Development:
`npm run dev`

For Production:
`npm run start`
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

For Testing:
`npm run test`

 

## Contribution Routine
1. Create a Branch for a Specific Feature
Always work on a separate branch for each feature. Create a new branch using:

`git checkout -b <branch_name>`

2. Fix Eslint and Prettier Problems before Add All and Commit

`npm run fix`

3. Develop the feature with several commits
The repository strictly follows the conventional commit format for writing commit messages. If the commit message does not follow the format, the commitlint hook will throw an error. You can use the commitizen CLI using the following command:

`npm run commit`

4. Push to the Remote Branch
Once you’re ready, push your branch to the remote repository:

`git push origin <branch_name>`

5. Issue a Pull Request on GitHub
Go to the repository on GitHub and create a pull request (PR) for your branch.

6. Code Review
The pull request will be reviewed by your peers. Make sure to address any feedback or requested changes.

7. Merge to Main Branch
After a successful review, the branch will be merged into the main branch.

 

