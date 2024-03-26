import Link from "next/link";

const InfoCard = ({
  title,
  children,
  bg = "bg-gray-100",
  color = "text-gray-800",
  btn,
}) => {
  /* here bg&color props have default value */

  return (
    <div className={`${bg} p-6  shadow-md`}>
      <h2 className={`${color}text-4xl font-bold mb-2`}>{title}</h2>
      <p className={`${color}mt-2 mb-4`}>
        {children}
        {/* this method is can be used istead of passing paragarph text as a prop */}
      </p>
      <Link
        href={btn.link}
        className={`inline-block ${btn.bg} ${
          btn.bg === "bg-white" ? "text-color-red" : "text-white"
        }  px-4 py-2 hover:opacity-80 border border-color-red`}
      >
        {btn.text}
      </Link>
    </div>
  );
};

export default InfoCard;
