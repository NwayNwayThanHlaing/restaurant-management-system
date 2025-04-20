"use client";

import { createContext, useState } from "react";

// creating AssistanceContext with default values
export const AssistanceContext = createContext({
  tableNumber: "",
  reason: "",
  handleTableNumberChange: () => {},
  handleReasonChange: () => {},
  handleSend: () => {},
});

// AssistanceProvider component to provide AssistanceContext to its children
export default function AssistanceProvider({ children }) {
  // state variable for tableNumber and reason
  const [tableNumber, setTableNumber] = useState("");
  const [reason, setReason] = useState("");

  // function to handle table number change
  const handleTableNumberChange = (e) => {
    setTableNumber(e.target.value);
  };

  // function to handle reason change
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  // function to handle sending assistance request
  async function handleSend() {
    try {
      const request = { tableNumber, reason };
      const requestDetails = `Table Number: ${tableNumber}, Reason: ${reason}`;
      const response = await fetch(
        "${process.env.NEXT_PUBLIC_API_URL}/AssistanceRequests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      if (response.ok) {
        // if request successful, reset input fields and show success message
        setTableNumber("");
        setReason("");
        alert(`A staff member will be with you shortly\n${requestDetails}`);
      } else {
        // if request fails, show error message
        alert(
          `Failed to place order. Please try again later.\n${requestDetails}`
        );
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(
        "An error occurred while submitting the order. Please try again later."
      );
    }
  }

  // providing values to AssistanceContext
  return (
    <AssistanceContext.Provider
      value={{
        tableNumber,
        reason,
        handleTableNumberChange,
        handleReasonChange,
        handleSend,
      }}
    >
      {children}
    </AssistanceContext.Provider>
  );
}
