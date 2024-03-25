"use client";
import { useState, useEffect } from "react";
import VehicleCard from "@/components/VehicleCard";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(
          `/api/vehicles?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await res.json();
        setVehicles(data.vehicles);
        setTotalItems(data.totalVehicles);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [page, pageSize]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return loading ? (
    <Loader loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {vehicles.length === 0 ? (
          <p>No vehicles found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles.map((item) => (
              <VehicleCard vehicle={item} key={item._id} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Vehicles;
