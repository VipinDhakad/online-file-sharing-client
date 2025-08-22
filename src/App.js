import { useState, useRef } from "react";
import "./App.css";
import { uploadFile } from "./service/api";
import LinkAndQRDisplay from "./LinkQr/linkQr";
import FilePreview from "./File Preview/filePreview.js";

function App() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false); // Track upload state

  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async () => {
    if (file) {
      setIsUploading(true); // Start upload
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);

      const response = await uploadFile(data, setUploadProgress);
      setResult(response?.path || "");
      setIsUploading(false); // End upload
    }
  };

  return (
      <div
          className="container"
          style={{
            background: "linear-gradient(to right, #000000, #434343)",
          }}
      >
        <div className="wrapper">
          <h1>Simple File Sharing!</h1>
          <p>Upload and share the download link.</p>

          {!file && (
              <>
                <button onClick={() => onUploadClick()} className="uploadButton">
                  Select File
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
              </>
          )}

          {file && (
              <div className="column">
                  <FilePreview file={file} />
                  {!result && !isUploading && (
                      <button onClick={handleFileUpload} className="uploadButton">
                        Upload
                      </button>
                  )}
                  {isUploading && (
                      <div className="progressContainer">
                        <div className="loader-container">
                          <div
                              className="loader"
                              style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="upload-percentage">{uploadProgress}%</p>
                      </div>
                  )}

                  {uploadProgress === 100 && result && (
                      <LinkAndQRDisplay result={result} />
                  )}
              </div>
          )}


        </div>
      </div>
  );
}

export default App;