import Link from "next/link";
import Image from "next/image";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaGasPump } from "react-icons/fa";
const VehicleCard = ({ vehicle }) => {
  const displayRates = () => {
    const { rates } = vehicle;
    if (rates.hourly) {
      return `₹ ${rates.hourly.toLocaleString()} /hr`;
    } else if (rates.daily) {
      return `₹ ${rates.daily.toLocaleString()} /day`;
    }
  };
  return (
    <div className=" shadow relative">
      <Image
        src={vehicle.images[0]}
        alt="Vehicle Picture"
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-[300px] object-cover "
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-2">
          <div className="text-gray-600 text-xs">{vehicle.type}</div>
          <h3 className="text-xl font-bold">{vehicle.name}</h3>
        </div>
        <h3 className="absolute top-[10px]  right-[10px] bg-color-red px-2 py-1  text-white font-bold text-right md:text-center lg:text-right">
          {displayRates()}
        </h3>

        <div className=" text-sm flex items-center  gap-4 text-gray-500 mb-4">
          <p>
            <MdAirlineSeatReclineExtra className="mr-1 inline" />
            {vehicle.number_of_seats}
            <span className="md:hidden lg:inline"> Seats</span>
          </p>
          <p>
            <FaGasPump className="mr-1 inline" />

            <span className="md:hidden lg:inline"> {vehicle.fuel}</span>
          </p>
          <p>
            <FaGear className="mr-1 inline" />
            <span className="md:hidden lg:inline"> {vehicle.gear}</span>
          </p>
        </div>

        <div className="flex  gap-4 text-green-900 text-sm mb-2">
          {vehicle.rates.hourly && (
            <p className="text-lg font-bold">
              ₹ {vehicle.rates.hourly}{" "}
              <span className="font-thin text-sm">hourly</span>
            </p>
          )}
          {vehicle.rates.daily && (
            <p className="text-lg font-bold">
              ₹ {vehicle.rates.daily}{" "}
              <span className="font-thin text-sm">daily</span>
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-2"></div>

        <div className="flex flex-col lg:flex-row justify-between text-sm">
          <div className="flex items-center  gap-2 mb-4 lg:mb-0">
            <FaLocationDot className="text-color-red" />
            <span className="text-orange-700">
              {vehicle.location.city} {vehicle.location.state}
            </span>
          </div>
          <Link
            href={`/vehicles/${vehicle._id}`}
            className="h-[36px] text-color-red bg-white hover:bg-color-red hover:text-white border border-color-red px-4 py-2  text-center text-sm transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
