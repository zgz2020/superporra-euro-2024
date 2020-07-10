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