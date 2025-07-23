import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

con.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection error:", err.message);
    } else {
        console.log("✅ MySQL connected successfully");
    }
})

export default con;
