"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import VehicleCard from "@/components/VehicleCard";

const SavedVehiclePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSavedVehicle = async () => {
      try {
        const res = await fetch("/api/save");
        if (res.status === 200) {
          const data = await res.json();
          setVehicles(data);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved vehicles");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch saved vehicles");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedVehicle();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <h1 className="text-2xl mb-3">Saved Vehicles</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {vehicles.length === 0 ? (
          <p>No saved vehicles found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles.map((item) => (
              <VehicleCard vehicle={item} key={item._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedVehiclePage;
