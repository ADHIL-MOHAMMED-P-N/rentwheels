import InfoCard from "./InfoCard";

const InfoCards = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoCard
            title="For Renters"
            bg="bg-gray-100"
            btn={{
              text: "Search Vehicles",
              link: "/vehicles",
              bg: "bg-black",
            }}
          >
            Find your rental vehicle. Bookmark vehicles and contact owners.
          </InfoCard>

          <InfoCard
            title="For Vehicle Owners"
            bg="bg-blue-100"
            btn={{
              text: "Add Vehicles",
              link: "/vehicles/add",
              bg: "bg-blue-500",
            }}
          >
            List your vehicles and reach customers.
          </InfoCard>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
