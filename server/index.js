const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING * ",
      [description]
    );
    res.json(newTodo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM JobApplication");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
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
        res.status(201).send({ message: "User Created Successfully" })
      } catch (error) {
        res.status(500).send({
          message: "Error Creating User",
          error,
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
        message: "Account does not exist"
      });
    }
    const user_id = passwordQuery.rows[0].userId;
    const hashPassword = passwordQuery.rows[0].password;
    await bcrypt.compare(password, hashPassword, function (err, result) {
      if (!result) {
        return res.status(400).send({
          message: "Passwords does not match"
        });
      }

      //   create JWT token
      const token = jwt.sign(
        {
          userId: user_id,
          userEmail: email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
      //   return success response
      res.status(200).send({
        message: "Login Successful",
        email: email,
        token,
      });

    });
  } catch (error) {
    console.log(error.message);
  }
});


app.listen(5001, () => {
  console.log("Server has started on port 5001");
});

