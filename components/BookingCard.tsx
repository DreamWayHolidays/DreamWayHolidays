import { useState } from "react";
import { Users, Calendar } from "lucide-react";

export default function BookingCard() {
  const [participants, setParticipants] = useState("Adult x 1");
  const [date, setDate] = useState("");

  return (
    <div className="bg-gray-100 rounded-2xl p-5 w-full max-w-2xl text-gray-900 shadow-lg">
      <h2 className="text-lg font-bold mb-4">Select participants and date</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full text-gray-800">
          <Users className="w-5 h-5 mr-2 text-gray-500" />
          <select
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="bg-transparent outline-none w-full"
          >
            <option>Adult x 1</option>
            <option>Adult x 2</option>
            <option>Adult x 3</option>
            <option>Child x 1</option>
            <option>Child x 2</option>
          </select>
        </div>

        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full text-gray-800">
          <Calendar className="w-5 h-5 mr-2 text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>

      <button
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full py-3 transition-colors cursor-pointer"
        onClick={() => alert(`Participants: ${participants}, Date: ${date}`)}
      >
        Check availability
      </button>
    </div>
  );
}
