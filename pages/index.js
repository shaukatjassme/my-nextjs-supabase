import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import supabase from "../utils/supabase";

const Home = ({ customProp }) => {
  const [transferData, setTransferData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

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

  async function handleSubmit(data) {
    try {
      const { error } = await supabase.from("transfer").insert(data);
      if (error) {
        throw error;
      }
      setTransferData([...transferData, data]); // Assuming you're adding new data to the list
      setShowAlert(true); // Show the alert
      // Fetch updated data after submission
      fetchData();
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const { error } = await supabase.from("transfer").delete().eq("id", id);
      if (error) {
        throw error;
      }
      // Remove the deleted item from state
      setTransferData(prevData => prevData.filter(item => item.id !== id));
      console.log(`Deleted item with ID ${id}`);
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  }

  return (
    <>
      {showAlert && (
        <div className="bg-green-200 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Success!</p>
          <p>Data submitted successfully.</p>
        </div>
      )}
      <Card customProp={customProp} onSubmit={handleSubmit} />
    </>
  );
};

export default Home;
