import React, { useState } from "react";
import QRCode from "qrcode.react"; // You may need to install a QR code library
import "../LinkQr/linkQr.css";

function LinkAndQRDisplay({ result }) {
  const [activeTab, setActiveTab] = useState("link");
  const [copied, setCopied] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard
      .writeText(result)
      .then(() => {
        setCopied(true);
        // Change the text back to "Copy Link" after 5 seconds
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((error) => console.error("Copy failed:", error));
  };

  return (
    <div className="tab-box">
      <div className="tab-buttons">
        <button
          onClick={() => handleTabChange("link")}
          className={`tab-button ${activeTab === "link" ? "active-tab" : ""}`}
          style={{borderTopRightRadius:0}}
        >
          Link
        </button>
        <button
          onClick={() => handleTabChange("qr")}
          className={`tab-button ${activeTab === "qr" ? "active-tab" : ""}`}
          style={{borderTopLeftRadius:0}}
        >
          QR Code
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "link" && result && (
          <div className="link-container">
            <a href={result} target="_blank" rel="noreferrer" className="link">
              {result}
            </a>
            {copied ? (
              <button className="copy-button">Copied</button>
            ) : (
              <button onClick={copyLinkToClipboard} className="copy-button">
                Copy Link
              </button>
            )}
          </div>
        )}

        {activeTab === "qr" && result && (
          <div className="qr-container">
            <QRCode value={result} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkAndQRDisplay;
