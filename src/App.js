import { useState, useEffect, useRef } from "react";
import "./App.css";
import { uploadFile } from "./service/api";
import LinkAndQRDisplay from "./LinkQr/linkQr";
import FilePreview from "./File Preview/filePreview.js";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const fileInputRef = useRef();

  const url =
    "https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        // console.log("res is",response);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <img src={url} className="img" alt=""/>
      <div className="wrapper">
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>

        {!file && (
          <>
            <button onClick={() => onUploadClick()}>Upload</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </>
        )}

        {file && (
          <div className="two-column-layout">
            <div className="column">
              <FilePreview file={file} />
            </div>

            <div className="column">
              <LinkAndQRDisplay result={result} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
