"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { useSession } from "next-auth/react"; //only in client compo, (for server getserversession)
import profileDefault from "@/assets/images/profile.png";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserVehicles = async (userid) => {
      if (!userid) {
        return;
      }
      try {
        const res = await fetch(`/api/vehicles/user/${userid}`);
        if (res.status === 200) {
          const data = await res.json();
          setVehicles(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    //session?user?id > optional chaining(it gives undefined id when nonexisting property is accessed-otherwise it throws error - break code)
    if (session?.user?.id) {
      fetchUserVehicles(session.user.id);
    }
  }, [session]);

  const handleDelete = async (vehicleid) => {
    const confirmed = window.confirm("Confirm Delete");
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/vehicles/${vehicleid}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        const updatedVehicles = vehicles.filter(
          (vehicle) => vehicle._id !== vehicleid
        );
        setVehicles(updatedVehicles);
        toast.success("Deleted");
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  };
  return (
    <section className="bg-blue-50">
      <div className="container xl:px-12 m-auto py-5">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col xl:flex-row space-y-10 xl:space-y-0">
            <div className="xl:w-2/5  ">
              {/* profilecard */}
              <div className="max-w-md">
                <div className="bg-white shadow-xl border border-gray-100 py-3 ">
                  <div className="photo-wrapper p-2">
                    <Image
                      width={250}
                      height={250}
                      className="w-32 h-32 rounded-full mx-auto"
                      src={profileImage || profileDefault}
                      alt="John Doe"
                    />
                  </div>
                  <div className="p-2 ">
                    <h3 className="text-center text-xl text-gray-900 font-semibold leading-8">
                      {profileName}
                    </h3>

                    <div className="flex flex-wrap items-center lg:space-x-3 text-sm text-gray-500 justify-center break-all">
                      <p className=" font-semibold ">
                        <MdEmail />
                      </p>
                      <p>{profileEmail}</p>
                    </div>

                    <div className="text-center my-3">
                      <Link
                        className="text-xs text-color-red italic  hover:text-red-700 font-medium"
                        href="/vehicles/saved"
                      >
                        View Saved Vehicles <FaHeart className="inline mb-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2> */}
            </div>

            <div className="md:w-3/5 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && vehicles.length === 0 && (
                <p>You have no vehicle listing</p>
              )}
              {loading ? (
                <Loader loading={loading} />
              ) : (
                vehicles.map((item) => (
                  <div
                    key={item._id}
                    className="mb-10 border border-gray-100 p-4 shadow"
                  >
                    <Link href={`/vehicles/${item._id}`}>
                      <Image
                        className="h-48 w-full object-contain"
                        src={item.images[0]}
                        alt="Vehicle"
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div>
                      <Link
                        href={`/vehicles/${item._id}`}
                        className="text-lg font-semibold hover:text-color-red"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/vehicles/${item._id}/edit`}
                        className="bg-white text-color-red px-3 py-3 border border-color-red mr-2 hover:bg-color-red hover:text-white transition-colors"
                      >
                        Edit <FaEdit className="inline mb-1 ml-3" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-color-red text-white px-3 py-2 border border-color-red hover:opacity-80 transition-colors"
                        type="button"
                      >
                        Delete <MdDelete className="inline mb-1 ml-2" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
