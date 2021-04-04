<p align="center">
    <img src="https://i.imgur.com/USCoPJo.png"/>
</p>

Mini ecommerce

this project was made with React and Node, the modules used during development are the following:

PD: I will not include the modules related to typescript, I will only say the modules that depend completely on the development for the user visualization.

NodeJS (Backend)

<ul>
    <li>Express (Server)</li>
    <li>Cors (client-side can connect with the backend)</li>
    <li>MySQL (Database)</li>
</ul>

ReactJS (Frontend)

<ul>
    <li>React-Router-Dom (Can create multiple pages)</li>
    <li>Axios (Can do request to the backend)</li>
</ul>


How to use?

download or clone this respository, install all modules with npm i (both folder), go to "server/src/database/database.sql" and copy that and paste in your MySQL command line or where your have MySQL (before you need create a database with CREATE DATABASE <name>), finally go to server folder and write (npm run dev or npm run build && npm start) and client folder write "npm start" with all this should work without problems