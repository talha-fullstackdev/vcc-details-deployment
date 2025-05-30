import React from "react";
import { toast } from "react-toastify";
import Toast from "./Toast";
import { MdDelete } from "react-icons/md";

const Delete = ({ id, name }) => {
  const handleDelete = async () => {
    let deleteveh = await fetch(`https://vcc-details-deployment.vercel.app/api/get-vehicle/${id}`, {
      method: "DELETE",
    });
    deleteveh = await deleteveh.json();
    if (deleteveh) {
      toast.success(`${name} deleted`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    if (!deleteveh) {
      return toast.error("cannot delete employee");
    }
  };
  return (
    <>
    {/* <button > */}
      <MdDelete title="delete?" className="dlt-btn" onClick={handleDelete}/>
    {/* </button> */}
    <Toast/>
    </>
  );
};

export default Delete;
