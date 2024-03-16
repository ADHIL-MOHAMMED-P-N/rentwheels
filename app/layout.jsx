import "@/assets/styles/global.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Rent Wheels",
  descriptio: "Find a wheel for your next trip",
  keywords: "rental,wheels,car, bike,van",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
