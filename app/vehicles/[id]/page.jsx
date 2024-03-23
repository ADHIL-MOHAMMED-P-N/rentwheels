"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchVehicle } from "@/utils/requests";
import VehicleHeaderImage from "@/components/VehicleHeaderImage";
import Link from "next/link";
import VehicleDetails from "@/components/VehicleDetails";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "@/components/Loader";
import VehicleImages from "@/components/VehicleImages";
import SaveVehicleButton from "@/components/SaveVehicleButton";
import ShareVehicleButton from "@/components/ShareVehicleButton";
import ContactForm from "@/components/ContactForm";

const VehiclePage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true); //if fetching from client component create loading state.

  useEffect(() => {
    const fetchVehicleData = async () => {
      if (!id) return;
      try {
        const vehicle = await fetchVehicle(id);
        setVehicle(vehicle);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (vehicle === null) {
      //otherwise it will loop calling fetcvehicledata because its keep setting vehicle and its in dependancy array
      fetchVehicleData();
    }
  }, [vehicle, id]);
  if (!vehicle && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Vehicle Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Loader loading={loading} />}
      {!loading && vehicle && (
        <>
          <VehicleHeaderImage image={vehicle.images[0]} />
          {/* back to link */}
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/vehicles"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to Vehicles
              </Link>
            </div>
          </section>
          {/* vehicle info  */}

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <VehicleDetails vehicle={vehicle} />

                <aside className="space-y-4">
                  <SaveVehicleButton vehicle={vehicle} />
                  <ShareVehicleButton vehicle={vehicle} />
                  <ContactForm vehicle={vehicle} />
                </aside>
              </div>
            </div>
          </section>
          <VehicleImages images={vehicle.images} />
        </>
      )}
    </>
  );
};

export default VehiclePage;
