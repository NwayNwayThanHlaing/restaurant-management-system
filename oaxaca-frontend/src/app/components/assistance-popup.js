import { useContext } from "react";
import { AssistanceContext } from "../context/assistance";
// import {seedCallWaiter} from "../../../../oaxaca-backend/prisma/data-seeding/WaiterRequest"
// import { useState } from "react";
// import AssistanceProvider from "../context/assistance";

// component for assitance pop-up
export default function AssistancePopUp() {
  const {
    tableNumber,
    reason,
    handleTableNumberChange,
    handleReasonChange,
    handleSend,
  } = useContext(AssistanceContext);

  // function to handle submitting assistance request
  const handleSubmitAssistance = async () => {
    handleSend();
  };

  // structure for assistance pop-up componenta
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <div className="w-50">
        <span className="text-xl font-semibold p-4">Assistance Request</span>
        <hr className="my-3" />
        <div className="flex flex-col px-5 pb-5 font-bold text-md">
          <div className="pb-3 flex items-center justify-between w-full">
            <span>Table No:</span>
            <input
              type="text"
              placeholder="Enter Table No."
              value={tableNumber}
              onChange={(e) => handleTableNumberChange(e)}
              className="border-2 border-red-700 rounded-lg px-2 py-1 w-1/2 text-md font-semibold text-sm"
            />
          </div>
          <hr className="my-3" />
          <div className="pb-3 flex items-center justify-between w-full">
            <span>Reason:</span>
            <input
              type="text"
              placeholder="Enter Reason for calling waiter"
              value={reason}
              onChange={(e) => handleReasonChange(e)}
              className="border-2 border-red-700 rounded-lg px-2 py-1 w-1/2 text-md font-semibold text-sm"
            />
          </div>
        </div>
        <div className="flex justify-center items-center font-bold text-md">
          <button
            className="bg-red-700 text-white rounded-lg px-4 py-2 w-11/12"
            onClick={handleSubmitAssistance}
          >
            Request Assistance
          </button>
        </div>
      </div>
    </div>
  );
}
