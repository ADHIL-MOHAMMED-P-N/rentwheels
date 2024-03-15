import "@/assets/styles/global.css";

export const metadata = {
  title: "Rent Wheels",
  descriptio: "Find a wheel for your next trip",
  keywords: "rental,wheels,car, bike,van",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
