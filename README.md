# Lets-Eat
Senior Project for SJSU

Let's Eat is a prototype browser-based interface for a hypothetical food delivery service. Developed by Group 23 for Course 195A/B at San Jose State University for the 2022 Spring-Fall semester as a Senior Project. Built primarily in JavaScript and HTML/CSS using the MERN Stack framework. Final submission was of December 2, 2022, 23:59 PST. Any updates to the repository after this deadline is of the member's own volition.


# Installation
# Dependencies  

To install the depencies of this project you will need to perform npm installation in two separate files.

Open a command terminal in the restaurant_web_app directory. For reference, the immediate directories below should be backend and frontend. And your current path should look something like ...\restaurant_web_app>

From there, perform the following commands:

| 1. cd backend (Your path should now be ...\restaurant_web_app\backend>)

| 2. npm install (npm will now be installing the dependencies as defined in backend\package.json)

Once npm has completed installation, perform the following commands:

| 3. cd ../frontend (Your path should now be ...\restaurant_web_app\frontend>)

| 4. npm install (npm will now be installing the dependencies as defined in frontend\package.json)

Once npm has completed installation, the application is ready to run.

# Running 
To run the application, you will need two terminals to run both the frontend and the backend simultaneously.

Open two command terminals both in the restaurant_web_app directory. For reference, the immediate directories below should be backend and frontend. And both of your current paths should look something like ...\restaurant_web_app>

For terminal A, perform the following commands:

| A1. cd backend (Your path should now be ...\restaurant_web_app\backend>)

| A2. npm start (A script will start to run a node server and connect you to our MongoDB database)

For terminal B, perform the following commands:

| B1. cd ../frontend (Your path should now be ...\restaurant_web_app\frontend>)

| B2. npm start (A script will start to build react ui and open up a tab in your browser to a local port)

Once both terminals have concluded their scripts, the application will be running until the terminals have been closed.

# Credits
This program was developed by the following members:

Edward Josh Hermano (edwardjosh.hermano@sjsu.edu or ejoshcasmano@gmail.com)
Brian Huynh (brian.huynh04@sjsu.edu)
Khang Phan (khanghoangthieu.phan@sjsu.edu)
Michael Picerillo (michael.piccerillo@sjsu.edu)
Special thanks to our project advisor Professor Simon Shim!

# Front End Dependencies
```
"@emotion/react": "^11.10.5",
"@emotion/styled": "^11.10.5",
"@mui/icons-material": "^5.10.6",
"@mui/material": "^5.10.12",
"@mui/styles": "^5.10.10",
"@mui/x-data-grid": "^5.17.9",
"axios": "^1.1.3",
"bootstrap": "^5.2.2",
"concurrently": "^7.4.0",
"express": "^4.18.1",
"mongoose": "^6.6.4",
"morgan": "^1.10.0",
"nodemon": "^2.0.20",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.4.1",
"react-scripts": "^5.0.1",
"react-toastify": "^9.1.1",
"reactstrap": "^9.1.4"
```

# Back End Dependencies 
```
"axios": "^1.1.3",
"bcrypt": "^5.1.0",
"bcryptjs": "^2.4.3",
"body-parser": "^1.20.0",
"concurrently": "^7.3.0",
"connect-sqlite3": "^0.9.13",
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"csurf": "^1.11.0",
"dotenv": "^16.0.1",
"express": "^4.18.1",
"express-session": "^1.17.3",
"mongoose": "^6.5.2",
"mongoose-unique-validator": "^3.1.0",
"nodemon": "^2.0.20",
"passport": "^0.6.0",
"passport-local": "^1.0.0",
"pluralize": "^8.0.0"
```
