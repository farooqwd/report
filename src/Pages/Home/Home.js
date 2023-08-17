import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./home.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { Button } from "@mui/material";

export default function Home() {
  const { addToast } = useToasts();
  const nav = useNavigate();
  // const loc = useLocation();
  const [data, setData] = useState([]);
  // console.log(data);
  useEffect(() => {
    const fetch = async () => {
      addToast("fetching data", {
        appearance: "info",
        autoDismiss: true,
      });
      try {
        const response = await axios.get(
          "https://reportpk.cyclic.cloud//api/issues",
          {
            data,
          }
        );
        if (response) {
          // addToast("data accessed", {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          const indexed = response?.data.map((item, i) => (item.id = i + 1));
          setData(response?.data);
          console.log(response?.data);
        }
      } catch (error) {
        addToast(error?.response?.data?.error || "request failed", {
          appearance: "error",
          autoDismiss: true,
        });
        console.error(error);
      }
    };
    fetch();
  }, []);

  const view = (id) => {
    const rep = data.find((row) => row.id === id);
    const name = rep?.id;
    nav(`./single`, {
      state: {
        data: rep,
      },
    });
  };

  const rows = data;
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      hide: "sm",
      renderCell: (params) => {
        return (
          <div className="flex">
            {params.row.image ? (
              <img
                src={`data:image/jpeg;base64,${params.row.image}`}
                alt="user"
                className="gridimg"
              />
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    { field: "description", headerName: "Description", flex: 3, hide: "sm" },
    { field: "location", headerName: "Address", flex: 1, hide: "sm" },
    {
      field: "view",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => {
        const id = params.row.id;
        const handleViewRow = () => {
          view(id);
          console.log(id);
        };
        return (
          <button onClick={handleViewRow} className="gridbtn">
            view
          </button>
        );
      },
    },
  ];

  return (
    <div className="home">
      <div className="content">
        <div className="head">
          <span className="h">Issues reported</span>
          <Button
            variant="contained"
            color="primary"
            onClick={() => nav("./form")}
            className="btn"
          >
            Report issue
          </Button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
          className="grid"
        />
      </div>
    </div>
  );
}
