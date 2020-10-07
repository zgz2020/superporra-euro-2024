# Full Stack React Express Application

## Introduction
This repository contains a simple Full Stack Express / React application. 
  
This application consists of Front End component (located in the `app` directory) that is built with Redux and React. It also has a Back End component (located in the `server` directory) that uses Express to manage.

## Installation
First, install the programs required to run the application:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/)
- [Mongo.DB](https://docs.mongodb.com/manual/installation/)


Next, clone this repository:
```
git clone https://github.com/zgz2020/superporra-euro-2021.git
```

Go to repo directory and install dependencies:
```
npm install
```

Also, make sure MongoDB is running by navigating to the installation directory and running (in cmd or terminal), replacing the path with your chosen Mongo directory:

```
C:\Data\bin\mongod.exe
```

Now, start the development environment with the following command:

```
npm run start-dev
```

The application should open automatically. 

## Troubleshooting
Problem: The application won't start!

Try:
1. Run `npm install` again
2. Update your version of `Node.js` to the latest
3. Clone the finished repo and start from there

Problem: I'm getting weird error XYZ!

Try:
1. Cancel `npm run start-dev` (with ctrl-C on windows) and run it again
2. If the error mentions any particular file, visit that file and make sure you didn't make any common errors (capitalization of property names, forgetting to destructure paramaters with curly brackets)
3. Still no luck? Clone the finished repo and prune away parts of it until you are at the point you left off.


## Testing
Check testing documentation [here](./docs/TESTING.md).

----------
----------

## TO DO list
- `Docker` / `Jenkins` / `AWS?`
- Refactoring to increase code reusability
- "Participant's predictions" and "Participant's Detailed Scores" pages > Add link to `go back` to 'My account' page, and/or to 'Participants' page. 
- "My Account" page > Add feature so admin user can grant `admin` role to other users/participants
- Add `paid` field to `user` in database and redux
- "My Account" page > Add feature so admin user can update `paid` property of each user
- "My Account" page > Add list of users/participants with `role` and `paid` fields.
- "My Account" page > Add list of users/participants with field indicating if `predictions` have been `fully filled`.
- Adding a `Deadlock coefficient` (to "Participants Lists" and "Participant's Detailed Scores")   
- `Participant's Detailed Scores` page -> Knock-out stages -> RANDOM ISSUE ??? —>  Qualified teams > Semi final > Country listed even though it has not been properly predicted and 0 points have been awarded
- `Participant's Detailed Scores` page -> Knock-out stages -> Actual teams playing the match should be displayed as well
- `Participant's Detailed Scores` page -> Knock-out stages -> Actual list of teams qualified should be displayed as well
- Sign Up -> Check if `email address` already in use
- Create new prediction -> Check if `username` already in use
- Adding `private leagues` functionality