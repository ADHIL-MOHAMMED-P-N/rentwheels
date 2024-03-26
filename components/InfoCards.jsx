import InfoCard from "./InfoCard";

const InfoCards = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoCard
            title="For Renters"
            bg="bg-gray-100"
            btn={{
              text: "Search Vehicles",
              link: "/vehicles",
              bg: "bg-color-red",
            }}
          >
            Discover hassle-free renting! Browse our diverse vehicle selection,
            book with ease, and enjoy flexible rental options for any journey.
            From daily commutes to weekend getaways, we've got your ride
            covered. Rent confidently with our support team standing by to
            assist you
          </InfoCard>

          <InfoCard
            title="For Vehicle Owners"
            bg="bg-red-100"
            btn={{
              text: "Add Vehicles",
              link: "/vehicles/add",
              bg: "bg-white",
            }}
          >
            Unlock earning potential by listing your vehicle effortlessly. With
            our user-friendly platform, enjoy seamless scheduling and
            transparent communication, ensuring you maximize your income. Join
            our community today and start monetizing your vehicle with ease!
          </InfoCard>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
