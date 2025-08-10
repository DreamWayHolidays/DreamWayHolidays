import { FaWhatsapp } from "react-icons/fa";

export default function BookingCard() {
  return (
    <div className={`hidden md:block bg-gray-100 rounded-xl p-5 w-full max-w-2xl shadow-lg`}>
      <div className="flex gap-1 justify-center items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full py-3 transition-colors cursor-pointer">
       <FaWhatsapp className="font-medium text-2xl"/> 
       <button className="font-medium text-xl" onClick={() => {}} >Book Now </button>        
      </div>

    </div>
  );
}
