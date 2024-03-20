import vehicles from "@/vehicles.json";
import VehicleCard from "@/components/VehicleCard";
const VehiclesPage = () => {
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
