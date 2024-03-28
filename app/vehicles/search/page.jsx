"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import VehicleCard from "@/components/VehicleCard";
import Loader from "@/components/Loader";
import VehicleSearchForm from "@/components/VehicleSearchForm";

const SearchResult = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const type = searchParams.get("type");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/vehicles/search?location=${location}&type=${type}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setVehicles(data);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.log(eror);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, type]);

  return (
    <>
      <section className="bg-gray-400 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <VehicleSearchForm />
        </div>
      </section>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/vehicles"
              className="flex items-center text-color-red hover:underline mb-3"
            >
              <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Vehicles
            </Link>
            <h1 className="text-2xl mb-4">Search Results</h1>
            {vehicles.length === 0 ? (
              <p>No search results.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResult;
