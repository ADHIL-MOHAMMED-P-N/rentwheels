"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react"; //only in client compo, (for server getserversession)
import profileDefault from "@/assets/images/profile.png";
import { toast } from "react-toastify";

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
    //session?user?id > optional chaining(it gives undefined id nonexisting property is accessed-otherwise it throws error - break code)
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
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
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
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && vehicles.length === 0 && (
                <p>You have no vehicle listing</p>
              )}
              {loading ? (
                <Loader loading={loading} />
              ) : (
                vehicles.map((item) => (
                  <div key={item._id} className="mb-10">
                    <Link href={`/vehicles/${item._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={item.images[0]}
                        alt="Vehicle"
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{item.nam}</p>
                      <p className="text-gray-600">
                        Address : {item.location.street} {item.location.state}{" "}
                        {item.location.pincode}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/vehicles/${item._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
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
