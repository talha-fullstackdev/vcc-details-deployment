import mongoose from "mongoose";

const vccDetailsSchema = new mongoose.Schema({
  vccNo: String,
  vccStatus: String,
  vccDate: Date,
  chassisNo: String,
  engineNumber: String,
  yearBuilt: String,
  vehicleDrive: String,
  origin: String,
  engineCapacity: String,
  carriageCapacity: String,
  passengerCapacity: String,
  vehicleModel: String,
  brandName: String,
  vehicleType: String,
  vehicleColor: String,
  specStandard: String,
  declarationNo: String,
  declarationDate: Date,
  ownerCode: String,
  ownerName: String,
  printRemarks: String,
});

export const VehicleModel =
  mongoose.models.VehicleModel ||
  mongoose.model("VehicleModel", vccDetailsSchema);
