import React, { useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";

const Card = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [phone , setPhone] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("transfer")
      .insert({ title: title, address: address, phone: phone });

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
      setTitle("");
      setAddress("");
       // Redirect to the table page
    }
  }

  const handleRedirect = () => {
    router.push("/table");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "address") {
      setAddress(value);
    }
    else if (name === "phone") {
      setPhone(value);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Submit Transfer Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              placeholder="Enter Title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={address}
              onChange={handleInputChange}
              placeholder="Enter Address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              placeholder="Enter Phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Submit
          </button>
        </form>
        <button
          onClick={handleRedirect}
          className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
        >
          See Table
        </button>
      </div>
    </div>
  );
};

export default Card;
