"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface ItineraryItem{
  day : number
  title : string
  description : string
}

interface ItineraryProps{
  itinerary : ItineraryItem[]
  setItinerary : React.Dispatch<React.SetStateAction<ItineraryItem[]>>;
}

export default function ItineraryForm({itinerary, setItinerary} : ItineraryProps ){
  
 const handleChange = <K extends keyof ItineraryItem>( index: number, field: K, value: ItineraryItem[K]) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const addDay = () => {
    setItinerary([
      ...itinerary,
      { day: itinerary.length + 1, title: "", description: "" },
    ]);
  };

  const removeDay = (index: number) => {
    const newItinerary = itinerary.filter((_, i) => i !== index);
    setItinerary(newItinerary.map((item, i) => ({ ...item, day: i + 1 })));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Itinerary Details</h2>

      {itinerary?.map((item, index) => (
        <div key={index} className="rounded-xl p-4 mb-4 bg-gray-50 relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Day {item.day}</h3>
            {itinerary.length > 1 && (
              <button
                onClick={() => removeDay(index)}
                type="button"
                className="text-red-500 hover:text-red-700 outline-none border-none"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Title"
            value={item.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full p-2 border border-black/10 outline-none rounded-lg mb-2"
          />

          <textarea
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full p-2 border border-black/10 outline-none rounded-lg"
            rows={3}
          />
        </div>
      ))}

      <button type="button" onClick={addDay} className="flex items-center outline-none border-none gap-2 px-4 py-2 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 transition">
        <Plus size={18} /> Add Day
      </button>
    </div>
  );
}