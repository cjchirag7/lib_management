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
**username**: *Director*
**password**: *123pass*

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

