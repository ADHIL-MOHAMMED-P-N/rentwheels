import { FaBookmark } from "react-icons/fa";
const SaveVehicleButton = ({ vehicle }) => {
  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        <FaBookmark className="fas fa-share mr-2" /> Bookmark Vehicle
      </button>
    </>
  );
};

export default SaveVehicleButton;
