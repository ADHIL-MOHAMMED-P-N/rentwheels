"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const VehicleSearchForm = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    //if inputs are default > direct to all vehicles page
    if (location === "" && type === "All") {
      router.push("/vehicles");
    } else {
      const query = `?location=${location}&type=${type}`;
      router.push(`/vehicles/search${query}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          type="text"
          id="location"
          placeholder="Enter Keywords or Location (City, State, Zip, etc"
          className="w-full px-4 py-3  bg-white text-gray-800 focus:outline-none focus:ring focus:ring-color-red"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <select
          id="property-type"
          className="w-full px-4 py-3  bg-white text-gray-800 focus:outline-none focus:ring focus:ring-color-red"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3  bg-color-red text-white hover:bg-red-500 focus:outline-none focus:ring focus:ring-color-red transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default VehicleSearchForm;
