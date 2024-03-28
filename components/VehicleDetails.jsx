import { FaTimes, FaCheck, FaMapMarker, FaGasPump } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
const VehicleDetails = ({ vehicle }) => {
  return (
    <main>
      <div className="bg-white p-6  shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{vehicle.type}</div>
        <h1 className="text-3xl font-bold mb-4">{vehicle.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="text-lg text-orange-700 mr-2" />
          <p className="text-orange-700">
            {vehicle.location.street}, {vehicle.location.city}
            {", "}
            {vehicle.location.state}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-color-red text-white p-2">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Hourly</div>
            <div className="text-2xl font-bold text-gray-700">
              {vehicle.rates.hourly ? (
                `₹ ${vehicle.rates.hourly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Daily</div>
            <div className="text-2xl font-bold text-gray-700">
              {vehicle.rates.daily ? (
                `₹ ${vehicle.rates.daily.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6  shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex  gap-4 text-gray-500 mb-4 text-xl sm:space-x-9">
          <p>
            <MdAirlineSeatReclineExtra className="inline-block mb-1 mr-2" />
            {vehicle.number_of_seats}
            Seats
          </p>
          <p>
            <FaGasPump className="inline-block mb-1 mr-2" />
            {vehicle.fuel}
          </p>
          <p>
            <FaGear className="inline-block mb-1 mr-2" />
            {vehicle.gear}
          </p>
        </div>
        <p className="text-gray-500 mb-4 ">{vehicle.description}</p>
      </div>

      <div className="bg-white p-6  shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Features</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
          {vehicle.features.map((feature, index) => (
            <li key={index}>
              <FaCheck className="text-green-600 mr-2 inline-block" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="bg-white p-6  shadow-md mt-6">
        <div id="map"></div>
      </div> */}
    </main>
  );
};

export default VehicleDetails;
