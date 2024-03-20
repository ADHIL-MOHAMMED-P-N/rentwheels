import Hero from "@/components/Hero";
import HomeVehicles from "@/components/HomeVehicles";
import InfoCards from "@/components/InfoCards";

const HomePage = () => {
  console.log(process.env.MONGODB_URI);
  return (
    <>
      <Hero />
      <InfoCards />
      <HomeVehicles />
    </>
  );
};

export default HomePage;
