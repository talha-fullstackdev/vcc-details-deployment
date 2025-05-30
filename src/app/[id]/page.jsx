// "use client"
import React from "react";
import GetData from "../components/GetData";
const page = async ({ params }) => {
  const { id } = await params;

  return <GetData id={id} />;
};

export default page;
