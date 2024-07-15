import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import supabase from "../utils/supabase";

const Home = () => {
  const [transferData, setTransferData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data, error } = await supabase.from("transfer").select("*");
      if (error) {
        throw error;
      }
      setTransferData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleSubmit(data) {
    if (editItem) {
      await handleUpdate(data);
    } else {
      await handleCreate(data);
    }
  }

  async function handleCreate(data) {
    try {
      const { error } = await supabase.from("transfer").insert(data);
      if (error) {
        throw error;
      }
      fetchData();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }

  async function handleUpdate(data) {
    try {
      const { error } = await supabase
        .from("transfer")
        .update(data)
        .eq("id", editItem.id);
      if (error) {
        throw error;
      }
      await fetchData(); 
      setShowAlert(true);
      setEditItem(null);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const { error } = await supabase.from("transfer").delete().eq("id", id);
      if (error) {
        throw error;
      }
      await fetchData(); 
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  const handleEdit = (item) => {
    setEditItem(item);
  };

  return (
    <div className="container mx-auto">
     <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
  <div className="last-div-component md:col-span-4 mt-8">
    {showAlert && (
      <div
        className="bg-green-200 border-l-4 border-green-500 text-green-700 p-4 mb-4"
        role="alert"
      >
        <p className="font-bold">Success!</p>
        <p>Data submitted successfully.</p>
      </div>
    )}

    <Card onSubmit={handleSubmit} editItem={editItem} />
  </div>
  
  <div className="first-div-component md:col-span-8 mt-8">
    <h2 className="text-2xl font-bold mb-4">Transfer Data</h2>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
           
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transferData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(item)}
                  className="mr-2 text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded focus:outline-none focus:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="mr-2 text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none focus:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

    </div>
  );
};

export default Home;
