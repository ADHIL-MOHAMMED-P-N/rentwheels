import VehicleCard from "@/components/VehicleCard";
import Link from "next/link";
import { fetchVehicles } from "@/utils/requests";

const HomeVehicles = async () => {
  const data = await fetchVehicles();
  const recentVehicles = data.vehicles
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentVehicles === 0 ? (
              <p>No Recent Vehicles</p>
            ) : (
              recentVehicles.map((item) => (
                <VehicleCard key={item.id} vehicle={item} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/vehicles"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Vehicles
        </Link>
      </section>
    </>
  );
};

export default HomeVehicles;
