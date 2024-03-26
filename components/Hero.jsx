import VehicleSearchForm from "./VehicleSearchForm";

const Hero = () => {
  return (
    <section className="hero__section py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white  sm:text-5xl md:text-6xl">
            Rent Your Perfect Ride Today!
          </h1>
          <p className="my-4 text-xl text-white">
            Discover the Freedom of the Open Road with Our Vehicle Rental
            Services! From sleek sedans to rugged SUVs, find your ideal ride for
            any adventure. Convenient, reliable, and hassle-free – start your
            journey with us today!
          </p>
        </div>
        <VehicleSearchForm />
      </div>
    </section>
  );
};

export default Hero;
