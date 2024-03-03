const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//

//create a todo

app.post("/JobApplication", async (req, res) => {
  try {
    const company_name = req.body.company_name;
    const application_status = req.body.application_status;
    const application_date = req.body.application_date;
    const role_description = req.body.role_description;

    const newJobApplication = await pool.query(
      "INSERT INTO JobApplication (company_name, application_status, application_date, role_description) VALUES($1, $2, $3, $4) RETURNING * ",
      [company_name, application_status, application_date, role_description]
    );

    res.json(newJobApplication.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get all todos

app.get("/JobApplication", async (req, res) => {
  try {
    const allApplied = await pool.query("SELECT * FROM jobapplication");
    res.json(allApplied.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo

app.get("/JobApplication/:application_id", async (req, res) => {
  try {
    const { application_id } = req.params;
    const jobApp = await pool.query(
      "SELECT * FROM jobapplication WHERE application_id = $1",
      [application_id]
    );
    res.json(jobApp.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update a todo

app.put("/JobApplication/:application_id", async (req, res) => {
  try {
    const { application_id } = req.params;
    const company_name = req.body.company_name;
    const application_status = req.body.application_status;
    const application_date = req.body.application_date;
    const role_description = req.body.role_description;
    const updateJobApplication = await pool.query(
      "UPDATE jobApplication SET company_name = $1, application_status = $2, application_date = $3, role_description = $4 WHERE application_id = $5",
      [
        company_name,
        application_status,
        application_date,
        role_description,
        application_id,
      ]
    );
    res.json("Todo was updated!");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo

app.delete("/JobApplication/:application_id", async (req, res) => {
  try {
    const { application_id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM jobApplication WHERE application_id = $1",
      [application_id]
    );
    res.json("Todo was deleted!");
  } catch (error) {
    console.log(error.message);
  }
});

const saltRounds = 10;

app.post("/auth/register", async (req, res) => {
  try {
    const { email, firstname, middlename, lastname, password } = req.body;
    await bcrypt.hash(password, saltRounds, async function (err, hash) {
      console.log(`Email: ${email}, Firstname: ${firstname}, Middlename: ${middlename}, lastname: ${lastname}, Hash: ${hash}`);
      try {
        const registerUser = await pool.query("INSERT INTO AppUser (first_name, middle_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)", [firstname, middlename, lastname, email, hash]);
        res.status(201).send({ message: "User Created Successfully", success: true })
      } catch (error) {
        res.status(500).send({
          message: "Error Creating User",
          error,
          success: false,
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordQuery = await pool.query("SELECT user_id, password FROM AppUser WHERE email = $1", [email]);
    if (passwordQuery.rowCount == 0) {
      return res.status(400).send({
        message: "Account does not exist",
        success: false
      });
    }

    const user_id = passwordQuery.rows[0].user_id;
    const hashPassword = passwordQuery.rows[0].password;
    await bcrypt.compare(password, hashPassword, function (err, result) {
      if (!result) {
        return res.status(400).send({
          message: "Passwords does not match",
          success: false
        });
      }

      //   create JWT token
      const token = jwt.sign(
        {
          userId: user_id,
          userEmail: email
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
      //   return success response
      res.status(200).send({
        message: "Login Successful",
        email: email,
        token,
        success: true
      });

    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/JobApplication/:application_id", async (req, res) => {
  try {
    const { application_id } = req.params;
    const jobApp = await pool.query(
      "SELECT * FROM jobapplication WHERE application_id = $1",
      [application_id]
    );
    res.json(jobApp.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/auth/userInfo", async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodedToken;
    const userVerify = await pool.query("SELECT user_id, email, first_name FROM AppUser WHERE user_id = $1 AND email = $2", [user.userId, user.userEmail]);
    if (userVerify.rowCount == 0) {
      res.status(400).send({
        message: "Invalid Token",
        success: false
      });
    } else {
      res.status(200).send({
        userId: userVerify.rows[0].user_id,
        email: userVerify.rows[0].email,
        firstname: userVerify.rows[0].first_name,
        success: true
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Invalid Token",
      success: false
    });
  }
})

app.listen(5001, () => {
  console.log("Server has started on port 5001");
});

