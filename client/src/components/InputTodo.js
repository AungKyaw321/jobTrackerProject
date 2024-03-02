import React, { Fragment, useState } from "react";
import { FormControl, TextField } from "@mui/material";
const InputTodo = () => {
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/JobApplication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: job,
          application_status: status,
          application_date: appliedDate,
          role_description: description,
        }),
      });
      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Job Tracker</h1>
      <form onSubmit={onSubmitForm}>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="company"
          variant="outlined"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="role"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="status"
          variant="outlined"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Date"
          variant="outlined"
          value={appliedDate}
          onChange={(e) => setStatus(e.target.value)}
        />
        <br />
        <button className="btn btn-success">Submit</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
