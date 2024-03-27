import Link from "next/link";
import { TbSteeringWheel } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 py-4 mt-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 mb-0">
        <div className="mb-4 md:mb-0 flex items-center space-x-3">
          <TbSteeringWheel className="text-3xl text-color-red" />
          <Link href="/" className="text-gray-500 text-sm hover:text-gray-700">
            Home
          </Link>
          <Link
            href="/vehicles"
            className="text-gray-500 text-sm hover:text-gray-700"
          >
            Vehicles
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-sm text-gray-500 mt-2 md:mt-0 ">
            &copy; {year} rentwheels. All rights reserved.
          </p>
          <Link
            title="contribute"
            target="_blank"
            className="text-gray-500 hover:text-gray-700"
            href="https://github.com/ADHIL-MOHAMMED-P-N/rentwheels"
          >
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
