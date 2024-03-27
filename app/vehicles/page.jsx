import VehicleSearchForm from "@/components/VehicleSearchForm";

import Vehicles from "@/components/Vehicles";
const VehiclesPage = async () => {
  return (
    <>
      <section className="bg-gray-300 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <VehicleSearchForm />
        </div>
      </section>
      <Vehicles />
    </>
  );
};

export default VehiclesPage;
