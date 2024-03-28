"use client";
import Image from "next/image";
import { TbSteeringWheel } from "react-icons/tb";
import profileDefaultImg from "@/assets/images/profile.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import NewMessageCount from "./NewMessageCount";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

const Navbar = () => {
  const { data: session } = useSession(); // rename data to session
  //session act as isLoggedin state(so initllay test ui based on isloggedin state)
  const profileImg = session?.user?.image;
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const pathname = usePathname();
  /* const [isLogged, setIsLogged] = useState(false); */
  const [providers, setProviders] = useState(null); //list of all providers(now only google)

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders(); //don't make useeffect aysnc , so create seperate function inside useeff and call it inside useeffect
  }, []);

  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/*  Mobile menu button */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setToggleMenu((pre) => !pre)}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/*   Logo  */}
            <Link
              className="hidden md:flex flex-shrink-0 items-center"
              href="/"
            >
              <TbSteeringWheel className="text-3xl text-color-red" />
              {/* <Image
                className="h-10 w-auto"
                src={logo}
                alt="Rent Wheels Logo"
              /> */}
              <span className="hidden md:block text-color-red text-2xl font-bold ml-2">
                Rent Wheels
              </span>
            </Link>
            {/*   Desktop Menu Hidden below md screens  */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "text-color-red" : "text-black"
                  }   hover:text-color-red hover:bg-transparent  rounded-md px-3 py-2 font-bold transition-colors duration-30000`}
                >
                  Home
                </Link>
                <Link
                  href="/vehicles"
                  className={`${
                    pathname === "/vehicles" ? "text-color-red" : "text-black"
                  }   hover:text-color-red hover:bg-transparent  rounded-md px-3 py-2 font-bold transition-colors duration-30000`}
                >
                  Vehicles
                </Link>
                {session && (
                  <Link
                    href="/vehicles/add"
                    className={`${
                      pathname === "/vehicles/add"
                        ? "text-color-red"
                        : "text-black"
                    }   hover:text-color-red hover:bg-transparent  rounded-md px-3 py-2 font-bold transition-colors duration-30000`}
                  >
                    Add Vehicles
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/*   Right Side Menu (Logged Out)  */}
          {!session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {/* in nextauth , we have to loop through every providers and set action(even if we have single provider(here its google)) */}
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <button
                      key={index}
                      onClick={() => signIn(provider.id)}
                      className="flex items-center text-white bg-color-red hover:bg-red-500 hover:text-white  px-3 py-2 transition-colors"
                    >
                      <FaGoogle className="text-white mr-2" />
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/*   Right Side Menu (Logged In)  */}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center  pr-2 md:static md:inset-auto md:ml-6 md:pr-0 space-x-3">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full bg-white border border-color-red  p-1 text-color-red hover:bg-color-red transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 "
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <NewMessageCount session={session} />
              </Link>
              <Link href="/profile">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileImg || profileDefaultImg}
                    alt="Profile Image"
                    width={40}
                    height={40}
                  />
                </button>
              </Link>

              {/*   Profile dropdown button  */}
              <div className="relative ">
                <div>
                  <button
                    onClick={() => setToggleProfile((pre) => !pre)}
                    type="button"
                    className="relative flex rounded-full  focus:outline-none"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <MdOutlineArrowDropDownCircle className="text-4xl text-color-red" />
                  </button>
                </div>

                {/*  Profile dropdown  */}
                {toggleProfile && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right  bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-color-red hover:text-white"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      onClick={() => setToggleProfile(false)}
                    >
                      <FaUser className="inline mr-1" /> Your Profile
                    </Link>
                    <Link
                      href="/vehicles/saved"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-color-red hover:text-white"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => setToggleProfile(false)}
                    >
                      <FaBookmark className="inline me-1" /> Saved Vehicles
                    </Link>
                    <button
                      onClick={() => {
                        setToggleProfile(false);
                        signOut();
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-color-red hover:text-white w-full text-left"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      <RiLogoutBoxFill className="inline mr-1 text-base" /> Sign
                      Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/*   Mobile menu, show/hide based on menu state.  */}
      {toggleMenu && (
        <div id="mobile-menu" className="bg-color-red">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "bg-white text-black" : "text-white"
              }  block  px-3 py-2 text-base font-medium hover:bg-white hover:text-black`}
            >
              Home
            </Link>
            <Link
              href="/vehicles"
              className={`${
                pathname === "/vehicles" ? "bg-white text-black" : "text-white"
              }  block  px-3 py-2 text-base font-medium hover:bg-white hover:text-black`}
            >
              Vehicles
            </Link>
            {session && (
              <Link
                href="/vehicles/add"
                className={`${
                  pathname === "/vehicles/add"
                    ? "bg-white text-black"
                    : "text-white"
                }  block  px-3 py-2 text-base font-medium hover:bg-white hover:text-black`}
              >
                Add Vehicles
              </Link>
            )}
            {!session &&
              providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  key={index}
                  onClick={() => signIn(provider.id)}
                  className="flex items-center text-black bg-white hover:bg-gray-900 hover:text-white  px-3 py-2 "
                >
                  <span>Login or Register</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
