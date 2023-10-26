import React from "react";
import "../File Preview/filePreview.css";

function FilePreview({ file }) {
  return (
    <div className="file-details">
      {file && (
        <div>
          <h2>File Details:</h2>
          <p>Name: {file.name}</p>
          <p>Size: {file.size} bytes</p>
          <p>Type: {file.type}</p>
          {file.type.startsWith("image/") && (
            <div className="image-preview">
              <h2>File Preview:</h2>
              <img src={URL.createObjectURL(file)} alt="File Preview" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FilePreview;
