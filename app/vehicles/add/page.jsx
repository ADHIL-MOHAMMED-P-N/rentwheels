//middleware.js is used to protect this route
import VehicleAddForm from "@/components/VehicleAddForm";

const AddVehiclesPage = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-5">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <VehicleAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddVehiclesPage;
