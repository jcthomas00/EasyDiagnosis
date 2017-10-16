#Easy Diagnosis - An Online Diagnoser 

This is a Web App that can take user input, convert them to symptoms and return a diagnosis to the user. The app can also accept voice input through Chrome on Windows and Android. 

You can see it live here : [easy-diagnoser.herokuapp.com](https://easy-diagnoser.herokuapp.com/)

The app uses Node and Express for a server, MySql for a database and HTML, CSS and Javascript on the front-end. It uses the following npm packages: body-parser, mysql, express, passport, and express-session.

#Run This Locally

1. Run the schema.sql script file in the `db` folder
2. Change the connection settings in connection.js
3. Run `npm install` to get node_modules
4. Create `.env` file and put the infermedica API credentials there:
	*APP_KEY="|insert your key|"
	*APP_ID="|insert your id|"
5. Run server `node server.js`
6. Navigate to http://localhost:3000 
