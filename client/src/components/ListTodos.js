import React, { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [applications, setApplications] = useState([]);
  const deleteApp = async (id) => {
    try {
      const deleteApp = await fetch(
        `http://localhost:5001/JobApplication/${id}`,
        {
          method: "DELETE",
        }
      );

      setApplications(applications.filter((app) => app.application_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  const getApplications = async () => {
    try {
      const response = await fetch("http://localhost:5001/JobApplication");
      const jsonData = await response.json();
      setApplications(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getApplications();
  }, []);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.application_id}>
                <TableCell>{app.company_name}</TableCell>
                <TableCell>{app.role_description}</TableCell>
                <TableCell>{app.application_status}</TableCell>
                <TableCell>{app.application_date}</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteApp(app.application_id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))*/}
    </Fragment>
  );
};

export default ListTodos;
