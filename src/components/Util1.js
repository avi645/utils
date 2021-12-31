import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";

toast.configure();

export default function Util1() {
  const [textValue, setTextValue] = useState("");

  function formatText() {
    if (textValue !== "") {
      let newText1 = textValue.replace(/(\r\n|\n|\r)/gm, "");
      let newText2 = newText1.split(/[ ]+/);
      setTextValue(newText2.join(""));
    } else {
      toast.error("Textbox is empty!!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function handleCopy() {
    if (textValue !== "") {
      navigator.clipboard.writeText(textValue);
      toast.info("Text Copied!!", {
        autoClose: 2000,
      });
    } else {
      toast.error("No text to copy!!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function testJSON(text) {
    if (typeof text !== "string") {
      return false;
    }
    try {
      var json = JSON.parse(text);
      return typeof json === "object";
    } catch (error) {
      return false;
    }
  }

  function formatJSON() {
    if (!testJSON(textValue)) {
      toast.error("Provided JSON is not valid", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      let Text = JSON.stringify(JSON.parse(textValue), null, 4);
      setTextValue(Text);
    }
  }

  function decodeBase64() {
    const regex =
      /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

    if (regex.test(textValue) && textValue !== "") {
      let text = Buffer.from(textValue, "base64").toString("ascii");
      setTextValue(text);
    } else {
      toast.error("Provide valid base64 encoded string!!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function encodeBase64() {
    if (textValue !== "") {
      let text = Buffer(textValue).toString("base64");
      setTextValue(text);
    } else {
      toast.error("Provide valid input!!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <Grid container spacing={2} padding="50px">
      <Grid item xs={12} md={3} sm={3}>
        <div className="container">
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: 170 }}
            onClick={formatText}
          >
            Single Line Text
          </Button>
        </div>
        <div className="container my-3">
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: 170 }}
            onClick={formatJSON}
          >
            Prettify JSON
          </Button>
        </div>

        <div className="container my-3">
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: 170 }}
            onClick={decodeBase64}
          >
            Decode Base64
          </Button>
        </div>
        <div className="container my-3">
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: 170 }}
            onClick={encodeBase64}
          >
            Encode Base64
          </Button>
        </div>
      </Grid>

      <Grid item xs={12} md={9} sm={9}>
        <TextField
          multiline
          fullWidth
          rows={20}
          label="Enter Text Here"
          id="inputText"
          value={textValue}
          onChange={(event) => setTextValue(event.target.value)}
        />

        <Grid container spacing={2} padding="10px">
          <Grid item xs={6} md={6} sm={6} className="col-md-12 text-center">
            <Button
              variant="outlined"
              color="error"
              style={{ minWidth: 100 }}
              startIcon={<DeleteIcon />}
              onClick={() => setTextValue("")}
            >
              Clear
            </Button>
          </Grid>

          <Grid item xs={6} md={6} sm={6} className="col-md-12 text-center">
            <Button
              variant="outlined"
              color="success"
              style={{ minWidth: 100 }}
              onClick={handleCopy}
            >
              Copy
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <p>
        {
          textValue.split(/\s+/).filter((element) => {
            return element.length !== 0;
          }).length
        }{" "}
        words and {textValue.length} characters
      </p>
    </Grid>
  );
}
