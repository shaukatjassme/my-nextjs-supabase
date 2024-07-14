import React, { useState, useEffect } from "react";
// import Link from "next/router";
import Link from "next/link";

const Card = ({ onSubmit, editItem }) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setAddress(editItem.address);
      setPhone(editItem.phone);
    } else {
      setTitle("");
      setAddress("");
      setPhone("");
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, address, phone };
    onSubmit(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "phone") {
      setPhone(value);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-96 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          {editItem ? "Edit" : "Submit"} Transfer Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
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
            {editItem ? "Update" : "Submit"}
          </button>

          <Link href="/table">
            <button className="mt-2 block w-full px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:bg-red-700">
              See Table Data
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Card;
