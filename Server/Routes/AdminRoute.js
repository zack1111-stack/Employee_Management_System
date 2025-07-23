import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// ✅ Admin login (corrected)
router.post("/adminlogin", (req, res) => {
  const { email, password } = req.body;
  console.log("📥 /adminlogin route hit");
  console.log("📧 Email received:", email);
  console.log("🔑 Password received:", password);

  con.query("SELECT * FROM admin WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ loginStatus: false, Error: "Query error" });
    }

    if (result.length === 0) {
      console.warn("⚠️ No user found for email:", email);
      return res.status(401).json({ loginStatus: false, Error: "Wrong email or password" });
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.error("❌ Bcrypt error:", err);
        return res.status(500).json({ loginStatus: false, Error: "Password check failed" });
      }

      if (!match) {
        console.warn("⚠️ Password mismatch for:", email);
        return res.status(401).json({ loginStatus: false, Error: "Wrong email or password" });
      }

      const token = jwt.sign(
        { id: user.id, role: "admin", email: email, id: result[0].id },
        "jwt-secret-key",
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      console.log("✅ Login successful for:", email);
      return res.json({ loginStatus: true, message: "Login successful" });
    });
  });
});

// CATEGORY
router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("SQL Error (category):", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err) => {
    if (err) {
      console.error("SQL Error (add_category):", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true });
  });
});

// EMPLOYEE
router.post("/add_employee", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO employee 
    (name, email, password, address, salary, image, category_id) 
    VALUES (?)`;

  const imageFilename = req.file ? req.file.filename : "";

  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) {
      console.error("Password Hashing Error:", err);
      return res.json({ Status: false, Error: "Hashing Error" });
    }

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      imageFilename,
      req.body.category_id,
    ];

    con.query(sql, [values], (err) => {
      if (err) {
        console.error("SQL Error (add_employee):", err);
        return res.json({ Status: false, Error: "Query Error" });
      }
      return res.json({ Status: true });
    });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("SQL Error (employee):", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("SQL Error (employee/:id):", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee SET 
    name = ?, email = ?, address = ?, salary = ?, category_id = ? 
    WHERE id = ?`;

  const values = [
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.salary,
    req.body.category_id,
  ];

  con.query(sql, [...values, id], (err, result) => {
    if (err) {
      console.error("SQL Error (edit_employee):", err);
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("SQL Error (delete_employee):", err);
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

// DASHBOARD COUNTS
router.get('/admin_count', (req, res) => {
  const sql = "SELECT COUNT(id) AS admin FROM admin";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("SQL Error (admin_count):", err);
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get('/employee_count', (req, res) => {
  const sql = "SELECT COUNT(id) AS employee FROM employee";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("SQL Error (employee_count):", err);
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get('/salary_count', (req, res) => {
  const sql = "SELECT SUM(salary) AS salaryOFEmp FROM employee";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("SQL Error (salary_count):", err);
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get('/admin_records', (req, res) => {
  const sql = "SELECT * FROM admin";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("SQL Error (admin_records):", err);
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

// LOGOUT
router.get('/logout', (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
