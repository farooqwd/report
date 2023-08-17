import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./single.scss";
import { IconButton } from "@mui/material";
const img = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";

export default function Single() {
  const nav = useNavigate();
  const loc = useLocation();
  const [data, setData] = useState(loc?.state?.data ? loc.state.data : null);
  console.log(data);
  return (
    <div className="single">
      <div className="left">
        <div className="content">
          <IconButton onClick={() => nav("/")} className="back">
            &larr;
          </IconButton>
          <img
            src={data?.image ? `data:image/jpeg;base64,${data?.image}` : img}
            alt="user"
            className="img"
          />
        </div>
      </div>
      <div className="right">
        <span className="title">{data?.title || ""}</span>
        <span className="desc">{data?.description || ""}</span>
        <span className="addr">{data?.location || ""}</span>
      </div>
    </div>
  );
}
