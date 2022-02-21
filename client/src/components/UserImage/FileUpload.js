import React, { useState, useContext, useEffect } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import Grid from "@mui/material/Grid";
import UserimgContext from "../../context/userimg/userimgContext";
import ActionButton from "../containers/ActionButton";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const userimgContext = useContext(UserimgContext);

  const { addUserimg, current } = userimgContext;

  useEffect(() => {
    if (current !== null) {
      setUserimg(current);
    }

    // eslint-disable-next-line
  }, [userimgContext, current]);
  const [userimg, setUserimg] = useState({
    userimage: "",
  });

  const { userimage } = userimg;

  const onChange = (e) => {
    setFile(e.target.files[0]);

    setUserimg({
      ...userimg,
      userimage: file,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    let res;
    try {
      {
        file
          ? (res = await axios.post("/api/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (progressEvent) => {
                setUploadPercentage(
                  parseInt(
                    Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    )
                  )
                );
              },
            }))
          : setMessage("No file selected"),
          setTimeout(() => setMessage(""), 5000);
      }

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { secure_url } = res.data;

      addUserimg({ ...userimg, userimage: secure_url });

      setMessage("File Uploaded");
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <Grid container columns={8} p={2} justifyContent="center">
        <form onSubmit={onSubmit}>
          <input type="file" id="customFile" onChange={onChange} />

          <Progress percentage={uploadPercentage} />

          <ActionButton type="submit">UPLOAD</ActionButton>
        </form>
      </Grid>
    </>
  );
};

export default FileUpload;
