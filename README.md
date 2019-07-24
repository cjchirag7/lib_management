# Library Management Web App

A web app for the management of books, users and the Issue and Return of Books in a library.

## User Permissions

### Student

A student can

* register himself on the app
* view and edit his profile
* change his password
* search for books and view availabilty
* view his issue history

### Admin

An admin can

* view and edit his profile
* search for books and view availability
* view, Edit or Delete existing books
* add new books
* issue a book to a student
* return a book issued earlier
* view all stats of the library
* view issue log and the profile of all the students
* view the profile of all admins 

## A note to the viewers

1. You can try logging in as an **admin** by entering the following credentials:

* **username**: *Director*
* **password**: *123pass*

2. You can also register yourself as a student and then login to view the options available to a student.

## View live App

Hosted at https://lib-manage.herokuapp.com/

## Tech Stack Used

### The MERN Stack

* [MongoDB](https://docs.mongodb.com/) - Document database - to store data as JSON 
* [Express.js](https://devdocs.io/express/) - Back-end web application framework running on top of Node.js
* [React](https://reactjs.org/docs/) - Front-end web app framework used
* [Node.js](https://nodejs.org/en/docs/) - JavaScript runtime environment 

### Middleware

* [Redux](https://redux.js.org/basics/usage-with-react) - For flux architecture, and fetching rapidly data
* [Mongoose](https://mongoosejs.com/docs/guide.html) - ODM for MongoDB

## Steps followed to setup the project

### Setting up server and database

1. Initialise a package.json file by entering the following command in terminal, after getting into the project directory :

```(bash)
npm init
```

2. Install npm packages required for backend side :

```(bash)
npm i express body-parser mongoose concurrently
npm i -D nodemon
```

3. Create a file server.js to make use of the express packages 

4. Modify the package.json by adding the following scripts to it :

```(JSON)
  "start": "node server.js",
  "server": "nodemon server.js",
```

5. Create an account on MongoDB cloud Atlas, thereafter, creating a database on it and get your MongoURI exported from a file keys.js in a folder config

6. Modify server.js to get connected to the database, using the MongoURI and also add the following lines at the end of server.js :

```(JavaScript)
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server started running on port ${port}`));
```

7. Type the following command to get your server running on your localhost and ensure hot-reloading, when the server-side code is modified :

```(bash)
npm run server
```

8. Make Schemas for various collections to be stored in database and export them from a folder models and the REST APIs for various routes in the folder routes. Change the server.js accordingly to make the use of these REST APIs. Ensure that the APIs are working correctly, by making requests using POSTMAN

9. Add JWT token based authentication and 'cors' module and use them in server.js. 

### Setting up the React client

1. Create a folder 'client' in the project directory. Ensure that you have create-react-app CLI installed. Enter the following commands in terminal :

```(bash)
cd client
create-react-app .
cd ..
```

2. In the package.json of the server, add the following scripts :

```(JSON)
"client-install": "npm install --prefix client",
"client": "npm start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\" ",
```

3. Remove all the additional default setup from client folder like logo, index.css, etc. Then, configure the client to make use of *bootstrap* and *reactstrap* to make the app responsive by using following commands in terminal :

```(bash)
cd client
npm i bootstrap reactstrap react-popper font-awesome bootstrap-social
```

Add the following line to index.js :

```(JavaScript)
import 'bootstrap/dist/css/bootstrap.min.css
```

4. Install Redux for maintaining the state :

```(Terminal)
npm i redux react-redux redux-thunk
```

5. Create a redux store, the various actions and reducers required in a folder named redux. Make corresponding changes in the React components to map the actions and state to props

### Deployment

1. Add the following lines to server.js :

```(JavaScript)
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
```

2. Add the following script to the package.json of server

```(JSON)
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

3. Install Heroku CLI and make sure you have intialised a git repository in the project directory. Enter the following commands in the terminal :

```(bash)
heroku login
heroku create
git add .
git commit -am "Deployed to Heroku"
git push heroku master
```

4. Open your heroku account and click on **Open App** option in the dashboard.