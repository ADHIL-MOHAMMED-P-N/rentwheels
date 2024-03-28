"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchVehicle } from "@/utils/requests";
import { useParams, useRouter } from "next/navigation";

const VehicleEditForm = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();
  //instead of creating each states for each fields , create a fields onject
  const [fields, setFields] = useState({
    name: "Tata SUV",
    type: "Car",
    description: "Nice car",
    location: {
      street: "",
      city: "Thrissur",
      state: "Kerala",
      pincode: "",
    },
    number_of_seats: 4,
    gear: "Manual",
    fuel: "fuel",
    features: ["Voice control"],
    rates: {
      hourly: 400,
      daily: 5000,
    },
    seller: {
      name: "",
      email: "johndoe@gmail.com",
      phone: "",
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      //in case of nested objects(for nested object corresponding fiels name has dot)
      const [parentKey, childKey] = name.split(".");
      setFields((preFields) => ({
        ...preFields,
        [parentKey]: {
          ...preFields[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFields((preFields) => ({ ...preFields, [name]: value }));
    }
  };
  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    //duplicate current features array
    const newFeatures = [...fields.features];

    if (checked) {
      //add value to newfearure arry
      newFeatures.push(value);
    } else {
      //remove value from newfearure array
      const index = newFeatures.indexOf(value);
      if (index !== -1) {
        /* if value is not there index will be -1 ,so validating this. ie remove item if its there */
        newFeatures.splice(index, 1);
      }
    }
    setFields((pre) => ({ ...pre, features: newFeatures }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.status === 200) {
        router.push(`/vehicles/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error("No Persmission to Edit");
      } else {
        toast.error("Failed..");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed..");
    }
  };

  useEffect(() => {
    const fetchVechicleData = async () => {
      try {
        const vehicleData = await fetchVehicle(id);
        //checking if rates are coming as null from db , if so set to ""(becuse input should be "" not null)
        if (vehicleData && vehicleData.rates) {
          const rates = { ...vehicleData.rates };
          for (const ratekey in rates) {
            if (rates[ratekey] === null) {
              rates[ratekey] = "";
            }
          }
          vehicleData.rates = rates;
        }
        setFields(vehicleData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVechicleData();
  }, []);

  return (
    /* name should match the object(state) key */
    !loading && (
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-semibold mb-6">
          Edit Vehicle
        </h2>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Vehicle Type
          </label>
          <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="Cabin Or Cottage">Cabin or Cottage</option>
            <option value="Room">Room</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Modal Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="eg.Excellent Drive"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="Add an optional description of your property"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4 bg-red-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Street"
            value={fields.location.street}
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="City"
            required
            value={fields.location.city}
            onChange={handleChange}
          />
          <input
            type="text"
            id="state"
            name="location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="State"
            required
            value={fields.location.state}
            onChange={handleChange}
          />
          <input
            type="text"
            id="zipcode"
            name="location.pincode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Pin code"
            value={fields.location.pincode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="seats"
              className="block text-gray-700 font-bold mb-2"
            >
              Number of Seats
            </label>
            <input
              type="number"
              id="seats"
              name="number_of_seats"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.number_of_seats}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="gearType"
              className="block text-gray-700 font-bold mb-2"
            >
              Gear Type
            </label>
            <select
              id="gear"
              name="gear"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.gear}
              onChange={handleChange}
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="gearType"
              className="block text-gray-700 font-bold mb-2"
            >
              Fuel Type
            </label>
            <select
              id="fuel"
              name="fuel"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.fuel}
              onChange={handleChange}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Features</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <input
                type="checkbox"
                id="amenity_wifi"
                name="features"
                value="Pet Friendly"
                className="mr-2"
                checked={fields.features.includes("Pet Friendly")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_wifi">Pet Friendly</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="features"
                value="Air purifier"
                className="mr-2"
                checked={fields.features.includes("Air purifier")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_kitchen">Air purifier</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="features"
                value="Voice control"
                className="mr-2"
                checked={fields.features.includes("Voice control")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_washer_dryer">Voice control</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_free_parking"
                name="features"
                value="Traction control"
                className="mr-2"
                checked={fields.features.includes("Traction control")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_free_parking">Traction control</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_pool"
                name="features"
                value="ABS"
                className="mr-2"
                checked={fields.features.includes("ABS")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_pool">ABS</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_hot_tub"
                name="features"
                value="Electric ORVM"
                className="mr-2"
                checked={fields.features.includes("Electric ORVM")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_hot_tub">Electric ORVM</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_24_7_security"
                name="features"
                value="Full boot space"
                className="mr-2"
                checked={fields.features.includes("Full boot space")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_24_7_security">Full boot space</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="features"
                value="USB charger"
                className="mr-2"
                checked={fields.features.includes("USB charger")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_wheelchair_accessible">USB charger</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_elevator_access"
                name="features"
                value="Bluetooth"
                className="mr-2"
                checked={fields.features.includes("Bluetooth")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_elevator_access">Bluetooth</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_dishwasher"
                name="features"
                value="Aux Input"
                className="mr-2"
                checked={fields.features.includes("Aux Input")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_dishwasher">Aux Input</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="features"
                value="Toolkit"
                className="mr-2"
                checked={fields.features.includes("Toolkit")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_gym_fitness_center">Toolkit</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_air_conditioning"
                name="features"
                value="Air Conditioning"
                className="mr-2"
                checked={fields.features.includes("Air Conditioning")}
                onChange={handleFeatureChange}
              />
              <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
              {/* add remaining checkboxes and related logics */}
            </div>
          </div>
        </div>

        <div className="mb-4 bg-red-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Rates (Leave blank if not applicable)
          </label>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="weekly_rate" className="mr-2">
                Hourly
              </label>
              <input
                type="number"
                id="weekly_rate"
                name="rates.hourly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.hourly}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="monthly_rate" className="mr-2">
                Daily
              </label>
              <input
                type="number"
                id="monthly_rate"
                name="rates.daily"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.daily}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="seller_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Name
          </label>
          <input
            type="text"
            id="seller_name"
            name="seller.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Name"
            value={fields.seller.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Email
          </label>
          <input
            type="email"
            id="seller_email"
            name="seller.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email address"
            required
            value={fields.seller.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Phone
          </label>
          <input
            type="tel"
            id="seller_phone"
            name="seller.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone"
            value={fields.seller.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            className="bg-color-red hover:opacity-80 text-white font-bold py-2 px-4  w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Vehicle
          </button>
        </div>
      </form>
    )
  );
};

export default VehicleEditForm;
