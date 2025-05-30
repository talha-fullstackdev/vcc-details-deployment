"use client";
import React, { useEffect } from "react";
import Form from "../components/Form";
import { useRef } from "react";
import UseTitle from "../hooks/UseTitle";
const Page = () => {
  useEffect(() => {
    UseTitle("form");
  }, []);
  const vccNoRef = useRef();
  const vccStatusRef = useRef();
  const vccDateRef = useRef();
  const chassisNoRef = useRef();
  const engineNumberRef = useRef();
  const yearBuiltRef = useRef();
  const vehicleDriveRef = useRef();
  const originRef = useRef();
  const engineCapacityRef = useRef();
  const carriageCapacityRef = useRef();
  const passengerCapacityRef = useRef();
  const vehicleModelRef = useRef();
  const brandNameRef = useRef();
  const vehicleTypeRef = useRef();
  const vehicleColorRef = useRef();
  const specStandardRef = useRef();
  const declarationNoRef = useRef();
  const declarationDateRef = useRef();
  const ownerCodeRef = useRef();
  const ownerNameRef = useRef();
  const printRemarksRef = useRef();
  const clearInputs = () => {
    vccNoRef.current.value = "";
    vccStatusRef.current.value = "";
    vccDateRef.current.value = "";
    chassisNoRef.current.value = "";
    engineNumberRef.current.value = "";
    yearBuiltRef.current.value = "";
    vehicleDriveRef.current.value = "";
    originRef.current.value = "";
    engineCapacityRef.current.value = "";
    carriageCapacityRef.current.value = "";
    passengerCapacityRef.current.value = "";
    vehicleModelRef.current.value = "";
    brandNameRef.current.value = "";
    vehicleTypeRef.current.value = "";
    vehicleColorRef.current.value = "";
    specStandardRef.current.value = "";
    declarationNoRef.current.value = "";
    declarationDateRef.current.value = "";
    ownerCodeRef.current.value = "";
    ownerNameRef.current.value = "";
    printRemarksRef.current.value = "";
  };
  const data = {
    vccNoRef,
    vccStatusRef,
    vccDateRef,
    chassisNoRef,
    engineNumberRef,
    yearBuiltRef,
    vehicleDriveRef,
    originRef,
    engineCapacityRef,
    carriageCapacityRef,
    passengerCapacityRef,
    vehicleModelRef,
    brandNameRef,
    vehicleTypeRef,
    vehicleColorRef,
    specStandardRef,
    declarationNoRef,
    declarationDateRef,
    ownerCodeRef,
    ownerNameRef,
    printRemarksRef,
  };
  return (
    <>
      <Form data={data} clearInputs={clearInputs} />
    </>
  );
};

export default Page;
