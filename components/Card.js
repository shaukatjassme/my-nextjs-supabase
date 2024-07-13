import React, { useState } from "react";
import supabase from "../utils/supabase";

const Card = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false); // State to manage success message

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("transfer")
      .insert({ title: title, address: address });

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
      setTitle("");
      setAddress("");
      setSubmitSuccess(true); // Show success message
      setTimeout(() => {
        setSubmitSuccess(false); // Hide success message after a few seconds
      }, 3000); // Adjust the timeout as needed
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "address") {
      setAddress(value);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Submit Transfer Details</h1>
        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Data submitted successfully.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setSubmitSuccess(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.354 5.354a2 2 0 00-2.828 0L10 7.172 7.172 5.354a2 2 0 00-2.828 2.828L7.172 10 5.354 12.828a2 2 0 102.828 2.828L10 12.828l2.828 1.828a2 2 0 102.828-2.828L12.828 10l1.828-2.828a2 2 0 000-2.828z"/></svg>
            </span>
          </div>
        )}
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
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Card;
