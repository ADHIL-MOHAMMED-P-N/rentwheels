import VehicleCard from "@/components/VehicleCard";
import { fetchVehicles } from "@/utils/requests";
const VehiclesPage = async () => {
  const vehicles = await fetchVehicles();
  vehicles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
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
      </div>
    </section>
  );
};

export default VehiclesPage;
