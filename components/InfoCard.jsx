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
    <div className={`${bg} p-6 rounded-lg shadow-md`}>
      <h2 className={`${color}text-2xl font-bold`}>{title}</h2>
      <p className={`${color}mt-2 mb-4`}>
        {children}
        {/* this method is can be used istead of passing paragarph text as a prop */}
      </p>
      <Link
        href={btn.link}
        className={`inline-block ${btn.bg} text-white rounded-lg px-4 py-2 hover:opacity-90`}
      >
        {btn.text}
      </Link>
    </div>
  );
};

export default InfoCard;
