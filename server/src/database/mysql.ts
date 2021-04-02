import mysql from "mysql";

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "mini_ecommerce",
    connectionLimit: 5,
});

connection.getConnection(err => {
    if (err) return console.log(err)

    console.log("MySQL Connected :D")
});

export default connection