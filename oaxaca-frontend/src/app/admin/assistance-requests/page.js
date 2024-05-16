"use client";
import { useContext } from "react";
import { AssistanceContext } from "../../context/assistance";
import { useEffect, useState } from "react";
import AdminLayout from "../components/admin-layout";

// this component is for the Assistance page in the staff interface
export default function AssistanceRequestsPage() {
  const [requests, setRequests] = useState([]); // holds list of assitance requests

  // Fetch requests on page load
  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch("http://localhost:3333/staff/Assistance");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setRequests(data.requests);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchRequests();
  }, []); // Run the effect only once on component mount

  // deletes a request
  const handleDeleteRequest = async (tableNo) => {
    try {
      const response = await fetch(
        `http://localhost:3333/staff/AssistanceDelete/${tableNo}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete request");
      }
      // removes the deleted request from the state
      setRequests(requests.filter((request) => request.table_no !== tableNo));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // render the assistance requests page
  return (
    <AdminLayout>
      <div className="w-full mt-20 h-screen overflow-hidden">
        <div className="w-4/5 overflow-y-auto h-screen pt-5 pb-36 absolute right-0">
          <div className="pt-16 m-auto ">
            <h1 className="text-lg font-bold mb-12 pl-60 ">
              Welcome! You have {requests.length} requests:
            </h1>
            {requests.map((request, index) => (
              <div
                key={index}
                className="flex justify-around items-center my-4"
              >
                <div className="py-10 px-16 bg-blue-950 text-white w-3/5 rounded-xl flex justify-between">
                  <div>
                    <h4 className="font-bold text-lg">
                      Table #{request.table_no}
                    </h4>
                    <p>Reason: {request.reason}</p>
                    <p>
                      Requested At:{" "}
                      {new Date(request.requestAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <button
                    className="py-2 px-4 bg-red-700 text-white rounded-md"
                    onClick={() => handleDeleteRequest(request.table_no)}
                  >
                    Request Answered
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
