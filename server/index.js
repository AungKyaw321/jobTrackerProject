const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

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

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
