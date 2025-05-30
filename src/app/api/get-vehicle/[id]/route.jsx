import mongoose from "mongoose";
import { connectionString } from "@/app/db/db_connection";
import { VehicleModel } from "@/app/db/vehicleModel";
import { NextResponse } from "next/server";
export const GET = async (req, { params }) => {
  await mongoose.connect(connectionString);
  try {
    const { id } = await params;
    let data = await VehicleModel.findById(id);
    if (!data) {
      return NextResponse.json(
        { msg: "no vehicle found with this is" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      data,
    });
  } catch (err) {
    return NextResponse.json({ msg: "server side error" }, { status: 500 });
  }
};

///////////////////////////

export const DELETE = async (req, { params }) => {
  await mongoose.connect(connectionString);

  try {
    const { id } = params;

    const deletedVehicle = await VehicleModel.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return NextResponse.json(
        { msg: "No vehicle found to delete with this ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { msg: "Vehicle deleted successfully", success: true },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting vehicle:", err);
    return NextResponse.json({ msg: "Server side error" }, { status: 500 });
  }
};
