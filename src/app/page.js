"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Loading from "./components/Loading";
import Delete from "./components/Delete";
export default function Home() {
  const [vehicleData, setVehicleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const getVehicleData = async () => {
      try {
        const response = await fetch("https://vcc-details-deployment.vercel.app/api/get-vehicle");
        const result = await response.json();
        setVehicleData(result);
      } catch (err) {
        console.log("Server side error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getVehicleData();
  }, []);

  // Helper function to convert SVG to PNG and download
  const downloadSVGAsPNG = (svgElement, fileName, size = 200) => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      // Clear canvas (transparent background)
      ctx.clearRect(0, 0, size, size);

      // Draw SVG image onto canvas
      ctx.drawImage(img, 0, 0, size, size);

      // Create PNG URL from canvas
      const pngUrl = canvas.toDataURL("image/png");

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      alert("Failed to load SVG for download.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const downloadQRCode = (id, vccNo, vehicleModel) => {
    const svg = document.getElementById(`qr-svg-${id}`);
    if (!svg) {
      alert("QR code not ready yet. Please try again.");
      return;
    }
    downloadSVGAsPNG(svg, `${vccNo}-${vehicleModel}.png`);
  };

  return (
    <div>
      <div className="home_header">
        <p className="header-title">QR codes page</p>
        <Link className="link" href="/form">
          <p className="header-btn">Form</p>
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : vehicleData.length === 0 ? (
        <div className="nothing_text">No data available....</div>
      ) : (
        <div className="card-container">
          {vehicleData.map((vehicle) => (
            <div key={vehicle._id} className="card">
              <div className="delete-div">
              <Delete id={vehicle._id} name={vehicle.vccNo}/>
              <p className="card_heading">
                {vehicle.vccNo} {vehicle.vehicleModel}
              </p>
              </div>
              <div className="QR_code" style={{ marginTop: "10px" }}>
                <Link href={`/${vehicle._id}`}>
                  <QRCodeSVG
                    id={`qr-svg-${vehicle._id}`}
                    value={`https://vcc-details-deployment.vercel.app/${vehicle._id}`}
                    size={200}
                    bgColor="transparent" // transparent background
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                  />
                </Link>
              </div>

              <button
                onClick={() =>
                  downloadQRCode(
                    vehicle._id,
                    vehicle.vccNo,
                    vehicle.vehicleModel
                  )
                }
                className="download-btn"
              >
                Download QR Code
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
