import express from 'express';
import con from "../utils/db.js";

const router = express.Router();

router.post('/update_profile', (req, res) => {
  const {
    id,
    first_name,
    last_name,
    email,
    phone,
    location,
    role,
    birth_date
  } = req.body;

  console.log("📥 Received data for profile insert/update:", {
    id, first_name, last_name, email, phone, location, role, birth_date
  });

  const insertOrUpdateQuery = `
    INSERT INTO profile (id, first_name, last_name, email, phone, location, role, birth_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      first_name = VALUES(first_name),
      last_name = VALUES(last_name),
      email = VALUES(email),
      phone = VALUES(phone),
      location = VALUES(location),
      role = VALUES(role),
      birth_date = VALUES(birth_date)
  `;

  const values = [
    id,
    first_name,
    last_name,
    email,
    phone,
    location,
    role,
    birth_date
  ];

  con.query(insertOrUpdateQuery, values, (err, result) => {
    if (err) {
      console.error("❌ SQL Error during insert/update:", err);
      return res.json({ Status: false, Error: err });
    }

    console.log("✅ Insert/Update successful. Fetching updated row...");

    // Fetch the updated profile data
    const fetchQuery = `SELECT * FROM profile WHERE id = ?`;
    con.query(fetchQuery, [id], (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.error("❌ SQL Error while fetching updated profile:", fetchErr);
        return res.json({ Status: false, Error: fetchErr });
      }

      if (fetchResult.length === 0) {
        return res.json({ Status: false, Message: "No profile found after update" });
      }

      console.log("📤 Returning updated profile data:", fetchResult[0]);
      return res.json({ Status: true, Message: 'Profile updated successfully', data: fetchResult[0] });
    });
  });
});

export default router;
