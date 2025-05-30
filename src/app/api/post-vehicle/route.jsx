import { connectionString } from "@/app/db/db_connection";
import { VehicleModel } from "@/app/db/vehicleModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const POST = async (req, res) => {
  await mongoose.connect(connectionString);
  try {
    const body = await req.json();
    const {
      vccNo,
      vccStatus,
      vccDate,
      chassisNo,
      engineNumber,
      yearBuilt,
      vehicleDrive,
      origin,
      engineCapacity,
      carriageCapacity,
      passengerCapacity,
      vehicleModel,
      brandName,
      vehicleType,
      vehicleColor,
      specStandard,
      declarationNo,
      declarationDate,
      ownerCode,
      ownerName,
      printRemarks,
    } = body;
    const check = await VehicleModel.findOne({ vccNo });
    if (check) {
      return NextResponse.json({
        msg: "vehcile record already exists! ",
      });
    }
    const data = new VehicleModel({
      vccNo,
      vccStatus,
      vccDate,
      chassisNo,
      engineNumber,
      yearBuilt,
      vehicleDrive,
      origin,
      engineCapacity,
      carriageCapacity,
      passengerCapacity,
      vehicleModel,
      brandName,
      vehicleType,
      vehicleColor,
      specStandard,
      declarationNo,
      declarationDate,
      ownerCode,
      ownerName,
      printRemarks,
    });
    const vehicleData = await data.save();
    return NextResponse.json(
      { msg: "saved succesfully", data: vehicleData, succces: true },
      { status: 200 }
    );
  } catch (err) {
    console.error(err, "server side error");
    return NextResponse.json(
      { msg: "server side error occured" },
      { status: 500 }
    );
  }
};
