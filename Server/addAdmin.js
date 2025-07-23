import mysql from 'mysql';
import bcrypt from 'bcrypt';

// Setup DB connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",       
  database: "employeems",
});

// Connect to DB
con.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to DB");

  // Step 1: Define the admins
  const admins = [
    { email: "admin@example.com", password: "12345" },
    { email: "admin2@example.com", password: "admin456" }
  ];

  // Step 2: Insert all admins with hashed passwords
  admins.forEach(({ email, password }) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("❌ Hashing error:", err);
        return;
      }

      const sql = "INSERT INTO admin (email, password) VALUES (?, ?)";
      const values = [email, hashedPassword];

      con.query(sql, values, (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.warn(`⚠️ Admin with email '${email}' already exists.`);
          } else {
            console.error("❌ Insert error:", err);
          }
        } else {
          console.log(`✅ Admin '${email}' inserted.`);
        }

        // Close connection only after the last admin
        if (email === admins[admins.length - 1].email) {
          con.end();
        }
      });
    });
  });
});
