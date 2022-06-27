# nosql-social-network-api - June 20th 2022

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Links](#Links)
- [Questions](#Questions)

##

## Description

This is a backend API application that uses a NoSQL (MongoDB) database and Mongoose to handle CRUD operations with large amounts of unstructured data. The data is social network related, including, Users, Friends, Thoughts and Reactions. Other functionalities have been implemented such as re-formatting dates, a function to delete all Thoughts associated to User (when deleting Users), validating data (such as Emails (using Regex), Strings, etc) and so on.

## Installation

1. To install application, clone the main project via the HTTP or SSH link on github.

```
git clone
```

2. Once cloned, open up the project folder in your text editor and run the following command in terminal to install all dependencies.

```
npm install
```

## Usage

To start the server, type in terminal:

```
npm start
```

From there, you are ready to test the routes!

## Links

[Link to video of execution](https://drive.google.com/file/d/1CH0Yd9sU-U8fKuzcTDf82gUbmVdxaxij/view?usp=sharing)

## Built With

- Node.js
- Express.js
- NoSQL - MongoDB
- Mongoose
- Regex
- Moment.js
- JavaScript

## License

This project is covered under the MIT License
