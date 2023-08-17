import React, { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import "./form.scss";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

const img = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";

const Form = () => {
  const nav = useNavigate();
  const { addToast } = useToasts();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [binary, setBinary] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      const binaryString = reader.result;
      const base64String = btoa(binaryString);
      console.log(base64String);
      setBinary(base64String);
    };
    reader.readAsBinaryString(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = binary;
    const data = { title, description, location, image };
    try {
      const response = await axios.post(
        "https://reportpk.cyclic.cloud/api/report/submit",
        data
      );
      if (response) {
        nav("/", {
          state: {
            data: data,
          },
        });
        addToast("report submited", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast(error?.response?.data?.error || "request failed", {
        appearance: "error",
        autoDismiss: true,
      });
      console.error(error);
    }
  };

  return (
    <div className="content">
      <div className="head">
        <IconButton style={{ padding: "5px 11px" }} onClick={() => nav("/")}>
          &larr;
        </IconButton>
        <span className="header">Report Form</span>
      </div>
      <div className="form">
        <div className="imgwraper">
          <img
            src={image ? URL.createObjectURL(image) : img}
            alt="image"
            className="image"
          />
          <input
            type="file"
            id="img"
            name="img"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="jpeg png jpg"
          />
          <label htmlFor="img" className="label flex">
            select pic<span style={{ fontSize: "8px" }}>(upto 50kb now)</span>
          </label>
        </div>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleSubmit(e)}
          className="btn"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Form;
