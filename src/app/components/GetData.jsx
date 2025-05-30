"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import UseTitle from "../hooks/UseTitle";
import Image from "next/image";
import logoOne from "/public/images/logo-1.png";
import logoTwo from "/public/images/logo-2.png";
import { colorMap } from "./ValidationMsg";

const GetData = ({ id }) => {
  const [data, setData] = useState(null);
  const [hexColor, setHexColor] = useState("#000"); // default to black

  useEffect(() => {
    const getVehicleData = async () => {
      try {
        const response = await fetch(
          `https://vcc-details-deployment.vercel.app/get-vehicle/${id}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };
    getVehicleData();
  }, [id]);

  // Set dynamic color after data is fetched
  useEffect(() => {
    if (data?.vehicleColor) {
      const userColorInput = data.vehicleColor.toLowerCase();
      setHexColor(colorMap[userColorInput] || "#000");
    }
  }, [data]);
  useEffect(() => {
    if (data?.vccNo) {
      // document.title = `${data.vccNo} | VCC Details`;
      UseTitle(`${data.vccNo} | VCC Details`)
    }
  }, [data]);

  return (
    <>
      {data ? (
        <div className="container">
          <div className="print-logos">
            <div className="logo1">
              <Image
                src={logoOne}
                alt="logo-one"
                width={132}
                height={48}
                priority
                unoptimized={true}
              />
            </div>
            <div className="logo2">
              <Image
                src={logoTwo}
                alt="logo-two"
                width={132}
                height={48}
                priority
                unoptimized={true}
              />
            </div>
          </div>
          <header className="header">View VCC Details</header>
          <div className="para">
            <p>VCC/Vehicle Details</p>
          </div>
          <div className="dataContainer">
            <div className="first_div">
              <div className="firstdiv-item">
                <p>VCC No :</p>
                <p className="details">{data.vccNo}</p>
              </div>
              <div className="firstdiv-item">
                <p>VCC Generation Date :</p>
                <p className="details">
                  {new Date(data.vccDate).toLocaleDateString()}
                </p>
              </div>
              <div className="firstdiv-item">
                <p>Engine Number :</p>
                <p className="details">{data.engineNumber}</p>
              </div>
              <div className="firstdiv-item">
                <p>Vehicle Drive :</p>
                <p className="details">{data.vehicleDrive}</p>
              </div>
              <div className="firstdiv-item">
                <p>Engine Capacity :</p>
                <p className="details">{data.engineCapacity}</p>
              </div>
              <div className="firstdiv-item">
                <p>Passenger Capacity :</p>
                <p className="details">{data.passengerCapacity}</p>
              </div>
              <div className="firstdiv-item">
                <p>Vehicle Brand Name :</p>
                <p className="details">{data.brandName}</p>
              </div>
              <div className="firstdiv-item">
                <p>Vehicle Color :</p>
                <p className="details">{data.vehicleColor}</p>
              </div>
              <div className="firstdiv-item">
                <p>Declaration Number :</p>
                <p className="details">{data.declarationNo}</p>
              </div>
              <div className="firstdiv-item">
                <p>Owner Code :</p>
                <p className="details">{data.ownerCode}</p>
              </div>
              <div className="firstdiv-item">
                <p>Print Remarks :</p>
                <p className="details">{data.printRemarks}</p>
              </div>
            </div>

            <div className="second_div">
              <div className="firstdiv-item">
                <p>VCC Status :</p>
                <p className="details">
                  <span style={{ color: hexColor }}>{data.vccStatus}</span>
                </p>
              </div>
              <div className="firstdiv-item">
                <p>Chassis No :</p>
                <p className="details">{data.chassisNo}</p>
              </div>
              <div className="firstdiv-item">
                <p>Year of Built :</p>
                <p className="details">{data.yearBuilt}</p>
              </div>
              <div className="firstdiv-item">
                <p>Country of Origin :</p>
                <p className="details">{data.origin}</p>
              </div>
              <div className="firstdiv-item">
                <p>Carriage Capacity :</p>
                <p className="details">{data.carriageCapacity}</p>
              </div>
              <div className="firstdiv-item">
                <p>Vehicle Model :</p>
                <p className="details">{data.vehicleModel}</p>
              </div>
              <div className="firstdiv-item">
                <p>Vehicle Type :</p>
                <p className="details">{data.vehicleType}</p>
              </div>
              <div className="firstdiv-item">
                <p>Specification Standard Name :</p>
                <p className="details">{data.specStandard}</p>
              </div>
              <div className="firstdiv-item">
                <p>Declaration Date :</p>
                <p className="details">
                  {new Date(data.declarationDate).toLocaleDateString()}
                </p>
              </div>
              <div className="firstdiv-item">
                <p>Owner Name :</p>
                <p className="details">{data.ownerName}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default GetData;
