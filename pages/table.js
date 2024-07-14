import React, { useState, useEffect } from "react";
import  supabase  from "../utils/supabase";
import { router } from "next/router";

const Table = () => {
  const [transferData, setTransferData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data, error } = await supabase.from("transfer").select('*');
      if (error) {
        throw error;
      }
      setTransferData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const { error } = await supabase.from("transfer").delete().eq("id", id);
      if (error) {
        throw error;
      }
      setTransferData(prevData => prevData.filter(item => item.id !== id));
      console.log(`Deleted item with ID ${id}`);
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  }
  

  const handleRedirect = () => {
    router.push("/");
  };

  return (
      <>   
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-screen-xl">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Phone</th>
             
                
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {transferData ? (
                transferData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.id}</td>
                    <td className="py-3 px-6 text-left">{item.title}</td>
                    <td className="py-3 px-6 text-left">{item.address}</td>
                    <td className="py-3 px-6 text-left">{item.phone}</td>
               
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 px-6 text-center">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>



    </div>
<div>
<button
        className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded focus:outline-none focus:bg-blue-600"
        onClick={handleRedirect}
      >
        Back to home Page
      </button>
</div>
    </>
    
  );
};

export default Table;
