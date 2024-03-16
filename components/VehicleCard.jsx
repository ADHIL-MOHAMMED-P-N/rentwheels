import Link from "next/link";
import Image from "next/image";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
const VehicleCard = ({ vehicle }) => {
  const displayRates = () => {
    const { rates } = vehicle;
    if (rates.hourly) {
      return `${rates.hourly.toLocaleString()}/hr`;
    } else if (rates.daily) {
      return `${rates.daily.toLocaleString()}/day`;
    }
  };
  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={`/images/vehicles/${vehicle.images[0]}`}
        alt=""
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{vehicle.type}</div>
          <h3 className="text-xl font-bold">{vehicle.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {displayRates()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <MdAirlineSeatReclineExtra className="mr-2 inline" />
            {vehicle.number_of_seats}
            <span className="md:hidden lg:inline"> Seats</span>
          </p>
          {/*  <p>
            <i className="fa-solid fa-bath"></i> 2
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <i className="fa-solid fa-ruler-combined"></i>
            1,500 <span className="md:hidden lg:inline">sqft</span>
          </p> */}
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {vehicle.rates.hourly && (
            <p>
              <i className="fa-solid fa-money-bill"></i> hourly
            </p>
          )}
          {vehicle.rates.hourly && (
            <p>
              <i className="fa-solid fa-money-bill"></i> Monthly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
            <span className="text-orange-700">
              {vehicle.location.city} {vehicle.location.state}
            </span>
          </div>
          <Link
            href={`/vehicles/${vehicle._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
