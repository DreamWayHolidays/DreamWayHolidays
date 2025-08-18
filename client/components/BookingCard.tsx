import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface BookingCardProps {
  pkgName: string;
}

export default function BookingCard({pkgName} : BookingCardProps ) {
   const defaultMsg = `Hey, I am interested in the "${pkgName}" package and I want to book it. Can I get more details?`;
   const encodedMsg = encodeURIComponent(defaultMsg);
   const phone = "917310735619";
  return (
    <div className={`hidden md:block bg-gray-100 rounded-xl p-5 w-full max-w-2xl shadow-lg`}>
      <div className="flex gap-1 justify-center items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full py-3 transition-colors cursor-pointer">
       <FaWhatsapp className="font-medium text-2xl"/> 
       <Link href={`https://wa.me/${phone}?text=${encodedMsg}`} target="_blank" className="font-medium text-xl" onClick={() => {}} >Book Now </Link>        
      </div>
    </div>
  );
}
